import { UserProfile, FoodLog, CameraWorkoutSession, DailyTracking, GeneratedPlan } from '../types';

const STORAGE_KEYS = {
  CURRENT_USER: 'ironvault_current_user',
  ALL_USERS: 'ironvault_registered_users',
  FOOD_LOGS: 'ironvault_food_logs',
  CAMERA_SESSIONS: 'ironvault_camera_sessions',
  DAILY_TRACKING: 'ironvault_daily_tracking',
  WORKOUT_COMPLETIONS: 'ironvault_workout_completions',
  GENERATED_PLAN: 'ironvault_generated_plan'
};

export interface AuthAccount {
  id: string;
  email: string;
  name: string;
  passwordHash: string;
  isDemo?: boolean;
}

// Default Demo User Profile matching the screenshots & prompt
export const DEFAULT_DEMO_PROFILE: UserProfile = {
  id: 'demo_athlete_01',
  email: 'athlete@ironvault.pro',
  name: 'Vinay Vaishnav',
  age: 24,
  height: 178,
  weight: 76.5,
  unitSystem: 'metric',
  sex: 'male',
  country: 'India',
  language: 'English',
  experience: 'intermediate',
  startingCondition: 'athletic',
  activityLevel: 'very_active',
  workoutFrequency: 5,
  workoutLocation: 'gym',
  availableEquipment: ['Barbell', 'Dumbbells', 'Cables', 'Benches', 'Pull-Up Bar'],
  preferredDuration: 60,
  dietaryPreference: 'vegetarian',
  allergies: [],
  injuriesOrLimitations: [],
  primaryGoal: 'build_muscle',
  secondaryGoals: ['strength', 'lean_athletic'],
  targetWeight: 80,
  pace: 'moderate',
  onboarded: true,
  createdAt: new Date().toISOString()
};

export const DEFAULT_GENERATED_PLAN: GeneratedPlan = {
  dailyCalories: 2750,
  proteinGrams: 165,
  carbsGrams: 340,
  fatsGrams: 65,
  recommendedSchedule: 'Push / Pull / Legs Hypertrophy Split (5 Days/Week)',
  mealSuggestions: [
    'Breakfast: Rolled Oats with Almonds, Chia Seeds, and Soya Chunks Bhurji',
    'Pre-Workout: 1 Banana + Robusta Black Coffee (45 min prior)',
    'Post-Workout: Wellcore Pure Whey Isolate + Steamed White Basmati Rice & Dal',
    'Dinner: 150g Pan-seared Cow Milk Paneer with 2 Whole Wheat Phulkas & Green Salad'
  ],
  recoveryGuidance: [
    'Aim for 7.5 - 8 hours of uninterrupted sleep for anabolic GH release.',
    'Consume at least 3.5 liters of clean water daily to support creatine uptake.',
    'Allow 48 to 72 hours before re-training heavy compound muscle groups.'
  ],
  calculatedAt: new Date().toISOString()
};

export class StorageService {
  static getCurrentUser(): AuthAccount | null {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.CURRENT_USER);
      return data ? JSON.parse(data) : null;
    } catch {
      return null;
    }
  }

  static setCurrentUser(user: AuthAccount | null): void {
    if (!user) {
      localStorage.removeItem(STORAGE_KEYS.CURRENT_USER);
    } else {
      localStorage.setItem(STORAGE_KEYS.CURRENT_USER, JSON.stringify(user));
    }
  }

  static registerUser(name: string, email: string, password: string): { success: boolean; user?: AuthAccount; error?: string } {
    try {
      const users: AuthAccount[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.ALL_USERS) || '[]');
      if (users.some(u => u.email.toLowerCase() === email.toLowerCase())) {
        return { success: false, error: 'An athlete account with this email already exists. Please sign in.' };
      }
      const newUser: AuthAccount = {
        id: 'user_' + Date.now(),
        email: email.trim().toLowerCase(),
        name: name.trim(),
        passwordHash: btoa(password), // simple client hashing for local demo auth
        isDemo: false
      };
      users.push(newUser);
      localStorage.setItem(STORAGE_KEYS.ALL_USERS, JSON.stringify(users));
      this.setCurrentUser(newUser);

      // Create new initial empty profile
      const newProfile: UserProfile = {
        ...DEFAULT_DEMO_PROFILE,
        id: newUser.id,
        email: newUser.email,
        name: newUser.name,
        onboarded: false
      };
      this.saveUserProfile(newProfile);

      return { success: true, user: newUser };
    } catch (e) {
      return { success: false, error: 'Failed to save account: ' + (e as Error).message };
    }
  }

  static loginUser(email: string, password: string): { success: boolean; user?: AuthAccount; error?: string } {
    try {
      const users: AuthAccount[] = JSON.parse(localStorage.getItem(STORAGE_KEYS.ALL_USERS) || '[]');
      const user = users.find(u => u.email.toLowerCase() === email.trim().toLowerCase());
      if (!user) {
        return { success: false, error: 'Account not found. Please register or use Demo Mode.' };
      }
      if (user.passwordHash !== btoa(password)) {
        return { success: false, error: 'Incorrect password entered.' };
      }
      this.setCurrentUser(user);
      return { success: true, user };
    } catch (e) {
      return { success: false, error: 'Login error: ' + (e as Error).message };
    }
  }

  static loginAsDemo(): AuthAccount {
    const demoUser: AuthAccount = {
      id: DEFAULT_DEMO_PROFILE.id,
      email: DEFAULT_DEMO_PROFILE.email,
      name: DEFAULT_DEMO_PROFILE.name,
      passwordHash: 'demo',
      isDemo: true
    };
    this.setCurrentUser(demoUser);
    if (!this.getUserProfile()) {
      this.saveUserProfile(DEFAULT_DEMO_PROFILE);
    }
    return demoUser;
  }

  static logout(): void {
    this.setCurrentUser(null);
  }

  static getUserProfile(): UserProfile | null {
    try {
      const user = this.getCurrentUser();
      const profileKey = user ? `ironvault_profile_${user.id}` : 'ironvault_profile_default';
      const data = localStorage.getItem(profileKey);
      if (data) return JSON.parse(data);
      return user?.isDemo ? DEFAULT_DEMO_PROFILE : null;
    } catch {
      return null;
    }
  }

  private static getUserKey(baseKey: string): string {
    const user = this.getCurrentUser();
    return user ? `${baseKey}_${user.id}` : `${baseKey}_demo`;
  }

  static saveUserProfile(profile: UserProfile): void {
    const user = this.getCurrentUser();
    const profileKey = user ? `ironvault_profile_${user.id}` : 'ironvault_profile_default';
    localStorage.setItem(profileKey, JSON.stringify(profile));
  }

  static getGeneratedPlan(): GeneratedPlan {
    try {
      const userKey = this.getUserKey(STORAGE_KEYS.GENERATED_PLAN);
      const data = localStorage.getItem(userKey) || localStorage.getItem(STORAGE_KEYS.GENERATED_PLAN);
      return data ? JSON.parse(data) : DEFAULT_GENERATED_PLAN;
    } catch {
      return DEFAULT_GENERATED_PLAN;
    }
  }

  static saveGeneratedPlan(plan: GeneratedPlan): void {
    const userKey = this.getUserKey(STORAGE_KEYS.GENERATED_PLAN);
    localStorage.setItem(userKey, JSON.stringify(plan));
  }

  // FOOD LOGS (User-scoped)
  static getTodayDateString(): string {
    return new Date().toISOString().split('T')[0];
  }

  static getFoodLogs(date?: string): FoodLog[] {
    try {
      const all = this.getAllFoodLogs();
      const targetDate = date || this.getTodayDateString();
      return all.filter(l => l.timestamp.startsWith(targetDate));
    } catch {
      return [];
    }
  }

  static getAllFoodLogs(): FoodLog[] {
    try {
      const userKey = this.getUserKey(STORAGE_KEYS.FOOD_LOGS);
      const data = localStorage.getItem(userKey);
      if (data) return JSON.parse(data);

      // Graceful fallback for demo account migration
      const legacyData = localStorage.getItem(STORAGE_KEYS.FOOD_LOGS);
      if (legacyData && this.getCurrentUser()?.isDemo) {
        return JSON.parse(legacyData);
      }
      return [];
    } catch {
      return [];
    }
  }

  static addFoodLog(log: Omit<FoodLog, 'id' | 'timestamp'>): FoodLog {
    const all = this.getAllFoodLogs();
    const newEntry: FoodLog = {
      ...log,
      id: 'food_log_' + Date.now(),
      timestamp: new Date().toISOString()
    };
    all.push(newEntry);
    const userKey = this.getUserKey(STORAGE_KEYS.FOOD_LOGS);
    localStorage.setItem(userKey, JSON.stringify(all));
    return newEntry;
  }

  static deleteFoodLog(id: string): void {
    const all = this.getAllFoodLogs().filter(l => l.id !== id);
    const userKey = this.getUserKey(STORAGE_KEYS.FOOD_LOGS);
    localStorage.setItem(userKey, JSON.stringify(all));
  }

  // CAMERA SESSIONS (User-scoped & private)
  static getCameraSessions(): CameraWorkoutSession[] {
    try {
      const userKey = this.getUserKey(STORAGE_KEYS.CAMERA_SESSIONS);
      const data = localStorage.getItem(userKey);
      if (data) return JSON.parse(data);

      // Graceful fallback for demo account
      const legacyData = localStorage.getItem(STORAGE_KEYS.CAMERA_SESSIONS);
      if (legacyData && this.getCurrentUser()?.isDemo) {
        return JSON.parse(legacyData);
      }
      return [];
    } catch {
      return [];
    }
  }

  static saveCameraSession(session: Omit<CameraWorkoutSession, 'id' | 'timestamp'>): CameraWorkoutSession {
    const all = this.getCameraSessions();
    const newEntry: CameraWorkoutSession = {
      ...session,
      id: 'cam_' + Date.now(),
      timestamp: new Date().toISOString()
    };
    all.unshift(newEntry);
    const userKey = this.getUserKey(STORAGE_KEYS.CAMERA_SESSIONS);
    localStorage.setItem(userKey, JSON.stringify(all));
    return newEntry;
  }

  // DAILY TRACKING (User-scoped)
  static getTodayTracking(): DailyTracking {
    const today = this.getTodayDateString();
    try {
      const userKey = this.getUserKey(STORAGE_KEYS.DAILY_TRACKING);
      const raw = localStorage.getItem(userKey) || (this.getCurrentUser()?.isDemo ? localStorage.getItem(STORAGE_KEYS.DAILY_TRACKING) : null);
      const map: Record<string, DailyTracking> = raw ? JSON.parse(raw) : {};
      if (map[today]) return map[today];
      return {
        date: today,
        waterGlasses: 4, // default 1000ml to start
        sleepHours: 7.5,
        sorenessScore: 3,
        completedWorkoutIds: []
      };
    } catch {
      return {
        date: today,
        waterGlasses: 4,
        sleepHours: 7.5,
        sorenessScore: 3,
        completedWorkoutIds: []
      };
    }
  }

  static saveTodayTracking(tracking: DailyTracking): void {
    try {
      const userKey = this.getUserKey(STORAGE_KEYS.DAILY_TRACKING);
      const raw = localStorage.getItem(userKey) || '{}';
      const map: Record<string, DailyTracking> = JSON.parse(raw);
      map[tracking.date] = tracking;
      localStorage.setItem(userKey, JSON.stringify(map));
    } catch (e) {
      console.error('Failed to save daily tracking', e);
    }
  }

  // EXPORT ALL DATA FOR CURRENT ATHLETE
  static exportAllData(): string {
    const exportData = {
      profile: this.getUserProfile(),
      generatedPlan: this.getGeneratedPlan(),
      foodLogs: this.getAllFoodLogs(),
      cameraSessions: this.getCameraSessions(),
      dailyTracking: this.getTodayTracking(),
      exportedAt: new Date().toISOString()
    };
    return JSON.stringify(exportData, null, 2);
  }

  static resetAllData(): void {
    const user = this.getCurrentUser();
    if (user) {
      localStorage.removeItem(`ironvault_profile_${user.id}`);
      localStorage.removeItem(this.getUserKey(STORAGE_KEYS.FOOD_LOGS));
      localStorage.removeItem(this.getUserKey(STORAGE_KEYS.CAMERA_SESSIONS));
      localStorage.removeItem(this.getUserKey(STORAGE_KEYS.DAILY_TRACKING));
      localStorage.removeItem(this.getUserKey(STORAGE_KEYS.GENERATED_PLAN));
    }
    localStorage.removeItem(STORAGE_KEYS.FOOD_LOGS);
    localStorage.removeItem(STORAGE_KEYS.CAMERA_SESSIONS);
    localStorage.removeItem(STORAGE_KEYS.DAILY_TRACKING);
    localStorage.removeItem(STORAGE_KEYS.WORKOUT_COMPLETIONS);
    localStorage.removeItem(STORAGE_KEYS.GENERATED_PLAN);
  }
}
