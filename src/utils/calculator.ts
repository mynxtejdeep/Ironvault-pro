import { ActivityLevel, FitnessGoal, GeneratedPlan, UserProfile } from '../types';

export const ACTIVITY_MULTIPLIERS: Record<ActivityLevel, number> = {
  sedentary: 1.2,
  light: 1.375,
  moderate: 1.55,
  very_active: 1.725,
  extra_active: 1.9
};

export function calculateBMR(weightKg: number, heightCm: number, age: number, sex: 'male' | 'female' | 'unspecified'): number {
  const genderOffset = sex === 'female' ? -161 : sex === 'male' ? 5 : -78;
  return Math.round(10 * weightKg + 6.25 * heightCm - 5 * age + genderOffset);
}

export function calculateTDEE(bmr: number, activityLevel: ActivityLevel): number {
  const multiplier = ACTIVITY_MULTIPLIERS[activityLevel] || 1.55;
  return Math.round(bmr * multiplier);
}

export function generateFitnessPlan(profile: Partial<UserProfile>): GeneratedPlan {
  const weight = profile.weight || 75;
  const height = profile.height || 175;
  const age = profile.age || 25;
  const sex = profile.sex || 'male';
  const activity = profile.activityLevel || 'moderate';
  const goal = profile.primaryGoal || 'build_muscle';
  const dietary = profile.dietaryPreference || 'vegetarian';

  const bmr = calculateBMR(weight, height, age, sex);
  const tdee = calculateTDEE(bmr, activity);

  let targetCalories = tdee;
  let proteinRatio = 2.0; // g/kg

  switch (goal) {
    case 'build_muscle':
    case 'gain_weight':
      targetCalories = tdee + (profile.pace === 'aggressive' ? 450 : 300);
      proteinRatio = 2.0;
      break;
    case 'lose_fat':
      targetCalories = Math.max(1400, tdee - (profile.pace === 'aggressive' ? 500 : 350));
      proteinRatio = 2.2; // higher protein to preserve lean muscle in deficit
      break;
    case 'lean_athletic':
      targetCalories = tdee - 200;
      proteinRatio = 2.1;
      break;
    case 'strength':
      targetCalories = tdee + 200;
      proteinRatio = 2.2;
      break;
    case 'endurance':
    case 'maintain':
    case 'healthy_lifestyle':
    default:
      targetCalories = tdee;
      proteinRatio = 1.8;
      break;
  }

  // Protein calculation
  const proteinGrams = Math.round(weight * proteinRatio);
  const proteinCalories = proteinGrams * 4;

  // Fat calculation (approx 25% of total calories)
  const fatCalories = Math.round(targetCalories * 0.25);
  const fatsGrams = Math.round(fatCalories / 9);

  // Remaining calories to Carbohydrates
  const remainingCalories = Math.max(200, targetCalories - (proteinCalories + fatCalories));
  const carbsGrams = Math.round(remainingCalories / 4);

  // Recalculate true daily calories for perfect internal consistency
  const finalCalories = proteinGrams * 4 + carbsGrams * 4 + fatsGrams * 9;

  // Custom meal suggestions based on diet preference
  const mealSuggestions: string[] = [];
  if (dietary === 'vegetarian' || dietary === 'vegan') {
    mealSuggestions.push('Breakfast: High-protein rolled oats with chia seeds, soaked almonds & plant/whey protein');
    mealSuggestions.push('Lunch: 180g Moong Dal Tadka with 2 Whole Wheat Phulkas & 150g Sautéed Paneer / Tofu');
    mealSuggestions.push('Pre-Workout: Cavendish banana + Robusta black coffee (30-45 min prior)');
    mealSuggestions.push('Dinner: 60g Soya Chunks curry with brown basmati rice & fresh green salad');
  } else if (dietary === 'eggetarian') {
    mealSuggestions.push('Breakfast: 4 Boiled Eggs (2 whole + 2 whites) on toasted multigrain bread with black pepper');
    mealSuggestions.push('Lunch: Yellow Dal with Brown Rice, Greek Curd & steamed vegetables');
    mealSuggestions.push('Pre-Workout: Sweet potato discs with rock salt + black coffee');
    mealSuggestions.push('Dinner: 150g Pan-seared Cow Milk Paneer with 2 Whole Wheat Chapatis');
  } else {
    mealSuggestions.push('Breakfast: 3-Egg Vegetable Omelette with rolled oats porridge');
    mealSuggestions.push('Lunch: 150g Herb-Grilled Chicken Breast with Steamed Basmati Rice & steamed broccoli');
    mealSuggestions.push('Pre-Workout: 1 Ripe Banana with Robusta Black Coffee (45 min prior)');
    mealSuggestions.push('Dinner: Grilled Fish fillet or Chicken Curry with 2 Whole Wheat Phulkas & mixed salad');
  }

  const recoveryGuidance: string[] = [
    'Ensure 7.5 to 8.5 hours of dark, quiet sleep to optimize testosterone and growth hormone.',
    `Target daily hydration: ${(weight * 0.04).toFixed(1)} Liters of water throughout the day.`,
    'Respect the 48-72h recovery window before training identical major muscle groups to full intensity.',
    'Take 3g Wellcore Micronized Creatine daily with water to accelerate phosphocreatine replenishment.'
  ];

  return {
    dailyCalories: finalCalories,
    proteinGrams,
    carbsGrams,
    fatsGrams,
    recommendedSchedule: `${profile.workoutFrequency || 5}-Day Push / Pull / Legs Hypertrophy Split`,
    mealSuggestions,
    recoveryGuidance,
    calculatedAt: new Date().toISOString()
  };
}

export function kgToLb(kg: number): number {
  return Math.round(kg * 2.20462 * 10) / 10;
}

export function lbToKg(lb: number): number {
  return Math.round((lb / 2.20462) * 10) / 10;
}

export function cmToFtIn(cm: number): { feet: number; inches: number } {
  const totalInches = cm / 2.54;
  const feet = Math.floor(totalInches / 12);
  const inches = Math.round(totalInches % 12);
  return { feet, inches };
}

export function ftInToCm(feet: number, inches: number): number {
  return Math.round((feet * 12 + inches) * 2.54);
}
