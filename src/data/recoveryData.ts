import { MuscleRecoveryStatus } from '../types';

export const MUSCLE_RECOVERY_MATRIX: MuscleRecoveryStatus[] = [
  {
    muscleGroup: 'legs',
    displayName: 'Quadriceps, Hamstrings & Glutes (Legs)',
    baseRecoveryHours: 84, // 72 - 96 hrs
    regenerationSpeed: 'Slow (72-96h)',
    recommendedRepairFoods: [
      'Wellcore Whey Isolate + Steamed White Rice (Glycogen Reload)',
      'Grilled Chicken Breast or Soya Chunks (Myofibrillar Repair)',
      'Cavendish Bananas & Coconut Water (Potassium & Electrolytes)',
      'Tart Cherry Extract / Greek Curd (DOMS Reduction)'
    ]
  },
  {
    muscleGroup: 'back',
    displayName: 'Latissimus Dorsi, Rhomboids & Erectors (Back)',
    baseRecoveryHours: 60, // 48 - 72 hrs
    regenerationSpeed: 'Moderate (48-72h)',
    recommendedRepairFoods: [
      'Whole Moong Dal Tadka with Ghee (Anti-inflammatory Amino Pool)',
      'Paneer Bhurji / Tofu (Sustained Casein & Calcium for Bone Anchors)',
      'Omega-3 Rich Chia Seeds or Salmon Fillet'
    ]
  },
  {
    muscleGroup: 'chest',
    displayName: 'Pectoralis Major & Minor (Chest)',
    baseRecoveryHours: 60, // 48 - 72 hrs
    regenerationSpeed: 'Moderate (48-72h)',
    recommendedRepairFoods: [
      'Boiled Eggs / Egg White Omelette with Whole Wheat Toast',
      'Wellcore Pure Micronized Creatine (Cellular Hydration)',
      'Almonds & Walnuts (Magnesium for Muscle Relaxation)'
    ]
  },
  {
    muscleGroup: 'shoulders',
    displayName: 'Deltoids & Rotator Cuffs (Shoulders)',
    baseRecoveryHours: 48, // 36 - 48 hrs
    regenerationSpeed: 'Moderate (48-72h)',
    recommendedRepairFoods: [
      'Turmeric Golden Milk (Curcumin for Tendon & Bursa Care)',
      'Grilled Paneer or Chicken Breast with Steamed Veggies',
      'Citrus Fruits (Vitamin C for Collagen Synthesis)'
    ]
  },
  {
    muscleGroup: 'biceps',
    displayName: 'Biceps Brachii & Brachialis (Arms)',
    baseRecoveryHours: 36, // 24 - 48 hrs
    regenerationSpeed: 'Fast (24-36h)',
    recommendedRepairFoods: [
      'Greek Curd / Hung Dahi with Honey & Blueberries',
      'Roasted Peanuts / Natural Peanut Butter on Multigrain Roti',
      'Whey Protein Shake with Glutamine'
    ]
  },
  {
    muscleGroup: 'triceps',
    displayName: 'Triceps Brachii (Lateral, Long & Medial Heads)',
    baseRecoveryHours: 36, // 24 - 48 hrs
    regenerationSpeed: 'Fast (24-36h)',
    recommendedRepairFoods: [
      'Boiled Soya Chunks with Roasted Jeera',
      'Wellcore Whey Isolate Shake',
      'Hydration: 3L Water + Himalayan Pink Salt'
    ]
  },
  {
    muscleGroup: 'abs',
    displayName: 'Rectus Abdominis, Obliques & Deep Core',
    baseRecoveryHours: 24, // 24 - 36 hrs
    regenerationSpeed: 'Fast (24-36h)',
    recommendedRepairFoods: [
      'Steamed Idli with High-Fiber Vegetable Sambar',
      'Cucumber, Spinach & Tomato Salad with Olive Oil',
      'Green Tea with Lemon'
    ]
  }
];
