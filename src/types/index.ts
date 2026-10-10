export type UnitSystem = 'metric' | 'imperial';
export type ExperienceLevel = 'beginner' | 'intermediate' | 'advanced';
export type DietaryPreference = 'vegetarian' | 'vegan' | 'eggetarian' | 'non-vegetarian';
export type BodyStartingCondition = 'slim' | 'average' | 'athletic' | 'muscular' | 'higher_fat' | 'unspecified';
export type ActivityLevel = 'sedentary' | 'light' | 'moderate' | 'very_active' | 'extra_active';
export type FitnessGoal = 
  | 'build_muscle' 
  | 'gain_weight' 
  | 'lose_fat' 
  | 'lean_athletic' 
  | 'strength' 
  | 'endurance' 
  | 'maintain' 
  | 'healthy_lifestyle';

export interface UserProfile {
  id: string;
  email: string;
  name: string;
  age: number;
  height: number; // in cm
  weight: number; // in kg
  unitSystem: UnitSystem;
  sex: 'male' | 'female' | 'unspecified';
  country: string;
  language: string;
  experience: ExperienceLevel;
  startingCondition: BodyStartingCondition;
  activityLevel: ActivityLevel;
  workoutFrequency: number; // days per week
  workoutLocation: 'gym' | 'home';
  availableEquipment: string[];
  preferredDuration: number; // in minutes
  dietaryPreference: DietaryPreference;
  allergies: string[];
  injuriesOrLimitations: string[];
  primaryGoal: FitnessGoal;
  secondaryGoals: FitnessGoal[];
  targetWeight?: number; // in kg
  pace: 'steady' | 'moderate' | 'aggressive';
  onboarded: boolean;
  createdAt: string;
}

export interface GeneratedPlan {
  dailyCalories: number;
  proteinGrams: number;
  carbsGrams: number;
  fatsGrams: number;
  recommendedSchedule: string;
  mealSuggestions: string[];
  recoveryGuidance: string[];
  calculatedAt: string;
}

export type MuscleGroup = 
  | 'chest'
  | 'back'
  | 'shoulders'
  | 'biceps'
  | 'triceps'
  | 'legs'
  | 'abs'
  | 'full_body'
  | 'cardio'
  | 'mobility';

export interface Exercise {
  id: string;
  name: string;
  muscleGroup: MuscleGroup;
  targetMuscle: string;
  secondaryMuscles: string[];
  equipment: string;
  difficulty: ExperienceLevel;
  instructions: string[];
  suggestedSets: number;
  suggestedReps: string;
  restSeconds: number;
  breathingGuide: string;
  commonMistakes: string[];
  easierVariation: string;
  harderVariation: string;
  safetyNotes: string;
  recoveryHours: number;
  cameraSupported?: boolean;
  supportedAiType?: 'squat' | 'pushup' | 'lunge' | 'bicep_curl';
}

export interface CameraWorkoutSession {
  id: string;
  exerciseId: string;
  exerciseName: string;
  reps: number;
  targetReps: number;
  sets: number;
  targetSets: number;
  durationSeconds: number;
  formScore: number; // percentage
  feedbackNotes: string[];
  timestamp: string;
}

export interface FoodItem {
  id: string;
  name: string;
  category: 'protein' | 'carbs' | 'fats' | 'fruits_veg' | 'pre_workout' | 'post_workout' | 'snacks' | 'hydration' | 'supplements';
  dietaryTypes: DietaryPreference[];
  serving: string;
  servingGrams?: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  preparation: string;
  timing: string;
  substitutes: string[];
  allergens: string[];
  isIndian?: boolean;
  goalSuitability?: 'bulking' | 'cutting' | 'both';
  isPartner?: boolean;
}

export interface FoodLog {
  id: string;
  foodId: string;
  foodName: string;
  servings: number;
  calories: number;
  protein: number;
  carbs: number;
  fats: number;
  timestamp: string;
  mealType: 'breakfast' | 'lunch' | 'dinner' | 'snack' | 'pre_workout' | 'post_workout';
}

export interface DailyTracking {
  date: string; // YYYY-MM-DD
  waterGlasses: number; // 250ml per glass
  sleepHours: number;
  sorenessScore: number; // 1 - 10
  completedWorkoutIds: string[];
  weightLogged?: number;
}

export interface BodybuilderSplit {
  id: string;
  name: string;
  legend: string;
  phase: 'bulking' | 'cutting';
  daysPerWeek: number;
  frequencyType: string;
  philosophy: string;
  days: {
    dayLabel: string;
    focus: string;
    exercises: {
      name: string;
      sets: string;
      reps: string;
      rest: string;
      notes: string;
    }[];
  }[];
}

export interface MuscleRecoveryStatus {
  muscleGroup: MuscleGroup;
  displayName: string;
  lastTrainedTimestamp?: string;
  baseRecoveryHours: number;
  regenerationSpeed: 'Fast (24-36h)' | 'Moderate (48-72h)' | 'Slow (72-96h)';
  recommendedRepairFoods: string[];
}
