import React, { useState } from 'react';
import { 
  Calculator, 
  Flame, 
  Scale, 
  Sparkles, 
  CheckCircle, 
  AlertCircle, 
  Activity, 
  ArrowRight,
  RefreshCw
} from 'lucide-react';
import { calculateBMR, calculateTDEE, generateFitnessPlan } from '../utils/calculator';
import { ActivityLevel, FitnessGoal, GeneratedPlan, UserProfile } from '../types';
import { StorageService } from '../services/storage';

interface CalculatorViewProps {
  currentProfile: UserProfile | null;
  onApplyPlan: (plan: GeneratedPlan) => void;
}

export const CalculatorView: React.FC<CalculatorViewProps> = ({
  currentProfile,
  onApplyPlan
}) => {
  const [age, setAge] = useState<number>(currentProfile?.age || 24);
  const [weight, setWeight] = useState<number>(currentProfile?.weight || 76.5);
  const [height, setHeight] = useState<number>(currentProfile?.height || 178);
  const [sex, setSex] = useState<'male' | 'female' | 'unspecified'>(currentProfile?.sex || 'male');
  const [activity, setActivity] = useState<ActivityLevel>(currentProfile?.activityLevel || 'very_active');
  const [goal, setGoal] = useState<FitnessGoal>(currentProfile?.primaryGoal || 'build_muscle');
  const [pace, setPace] = useState<'steady' | 'moderate' | 'aggressive'>('moderate');
  const [appliedNotice, setAppliedNotice] = useState<boolean>(false);

  // Compute live calculations
  const bmr = calculateBMR(weight, height, age, sex);
  const tdee = calculateTDEE(bmr, activity);
  const calculatedPlan = generateFitnessPlan({
    age,
    weight,
    height,
    sex,
    activityLevel: activity,
    primaryGoal: goal,
    pace,
    dietaryPreference: currentProfile?.dietaryPreference || 'vegetarian'
  });

  const handleApplyToActivePlan = () => {
    StorageService.saveGeneratedPlan(calculatedPlan);
    onApplyPlan(calculatedPlan);
    setAppliedNotice(true);
    setTimeout(() => setAppliedNotice(false), 3000);
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* HEADER */}
      <section className="relative overflow-hidden rounded-3xl gym-card border border-zinc-800/80 p-6 sm:p-10">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-500 font-bold mb-2">
          <Calculator className="w-4 h-4 text-red-500" />
          THERMODYNAMIC METABOLIC ENGINE
        </div>

        <h1 className="font-heading text-4xl sm:text-6xl font-black tracking-tight text-white uppercase leading-none">
          BULKING & CUTTING <span className="text-red-500">CALCULATOR</span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-3xl leading-relaxed">
          Scientifically derived caloric expenditure and macronutrient budgeting. Uses Mifflin-St Jeor equation with dynamic physical activity quotients and protein conservation limits.
        </p>
      </section>

      {/* INPUT FORM & REAL-TIME OUTPUT GRID */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        
        {/* INPUTS (LEFT 6 COLS) */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
          <h3 className="font-heading text-xl font-bold text-white mb-2">
            ATHLETE BIOMETRIC PARAMETERS
          </h3>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">Weight (kg)</label>
              <input
                type="number"
                step="0.5"
                value={weight}
                onChange={(e) => setWeight(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">Height (cm)</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">Age (Years)</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500 font-mono"
              />
            </div>

            <div>
              <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">Biological Sex</label>
              <select
                value={sex}
                onChange={(e) => setSex(e.target.value as any)}
                className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500 font-mono"
              >
                <option value="male">Male (+5 offset)</option>
                <option value="female">Female (-161 offset)</option>
                <option value="unspecified">Neutral</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">Daily Activity Level</label>
            <select
              value={activity}
              onChange={(e) => setActivity(e.target.value as any)}
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500 font-mono"
            >
              <option value="sedentary">Sedentary (Desk Job, Minimal Physical Work - ×1.2)</option>
              <option value="light">Lightly Active (1-2 Light Lifting Sessions/Wk - ×1.375)</option>
              <option value="moderate">Moderately Active (3-4 Intense Workouts/Wk - ×1.55)</option>
              <option value="very_active">Very Active (5-6 Heavy Lifting Days - ×1.725)</option>
              <option value="extra_active">Extra Active (2x Daily Workouts / Construction - ×1.9)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">Target Transformation Goal</label>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {[
                { id: 'build_muscle', label: 'Hypertrophy (+Surplus)' },
                { id: 'lose_fat', label: 'Cutting (-Deficit)' },
                { id: 'gain_weight', label: 'Bulking (Heavy)' },
                { id: 'lean_athletic', label: 'Recomp (Slight Deficit)' },
                { id: 'strength', label: 'Strength Peak' },
                { id: 'maintain', label: 'Equilibrium (TDEE)' }
              ].map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setGoal(g.id as any)}
                  className={`p-2.5 text-xs font-bold rounded-xl border text-center transition-all ${
                    goal === g.id
                      ? 'border-red-500 bg-red-950/40 text-white shadow-md'
                      : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:text-white'
                  }`}
                >
                  {g.label}
                </button>
              ))}
            </div>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">Pace & Surplus / Deficit Magnitude</label>
            <div className="grid grid-cols-3 gap-2">
              {[
                { id: 'steady', label: 'Steady (10%)' },
                { id: 'moderate', label: 'Moderate (15%)' },
                { id: 'aggressive', label: 'Aggressive (20%)' }
              ].map((p) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setPace(p.id as any)}
                  className={`py-2 text-xs font-bold rounded-xl border ${
                    pace === p.id ? 'border-red-500 bg-red-950/40 text-white' : 'border-zinc-800 text-zinc-400'
                  }`}
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

        </div>

        {/* CALCULATED OUTPUT (RIGHT 6 COLS) */}
        <div className="lg:col-span-6 p-6 sm:p-8 rounded-3xl gym-card border border-red-900/40 shadow-xl shadow-red-950/20 space-y-5">
          <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
            <div>
              <span className="text-[10px] font-mono uppercase text-red-500 font-bold tracking-widest block">
                METABOLIC EXPENDITURE RESULTS
              </span>
              <h3 className="font-heading text-2xl font-black text-white">
                RECOMMENDED DAILY TARGET
              </h3>
            </div>
            <div className="text-right">
              <span className="text-[10px] font-mono text-zinc-500 block">MAINTENANCE (TDEE)</span>
              <span className="font-mono text-sm font-bold text-zinc-300">{tdee} kcal</span>
            </div>
          </div>

          {/* Big Calorie Target Card */}
          <div className="p-5 rounded-2xl bg-gradient-to-r from-red-950/80 to-zinc-900 border border-red-600/50 flex items-center justify-between">
            <div>
              <span className="text-xs font-mono uppercase text-zinc-400 block">TARGET DAILY ENERGY</span>
              <div className="font-heading text-4xl sm:text-5xl font-black text-white">
                {calculatedPlan.dailyCalories} <span className="text-sm font-normal text-zinc-400 font-mono">kcal / day</span>
              </div>
              <span className="text-[11px] font-mono text-zinc-400">
                {calculatedPlan.dailyCalories > tdee
                  ? `+${calculatedPlan.dailyCalories - tdee} kcal Anabolic Surplus`
                  : `${calculatedPlan.dailyCalories - tdee} kcal Fat-Loss Deficit`}
              </span>
            </div>
            <Flame className="w-10 h-10 text-red-500/80" />
          </div>

          {/* 3 Macro Cards */}
          <div className="grid grid-cols-3 gap-3 text-center">
            <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800">
              <span className="text-[10px] font-mono uppercase text-red-400 block font-bold">PROTEIN</span>
              <div className="font-heading text-2xl font-black text-white mt-1">
                {calculatedPlan.proteinGrams}g
              </div>
              <span className="text-[10px] text-zinc-500 font-mono">{(calculatedPlan.proteinGrams / weight).toFixed(1)} g/kg</span>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800">
              <span className="text-[10px] font-mono uppercase text-amber-400 block font-bold">CARBOHYDRATES</span>
              <div className="font-heading text-2xl font-black text-white mt-1">
                {calculatedPlan.carbsGrams}g
              </div>
              <span className="text-[10px] text-zinc-500 font-mono">Glycogen fuel</span>
            </div>

            <div className="p-3.5 rounded-xl bg-zinc-900/90 border border-zinc-800">
              <span className="text-[10px] font-mono uppercase text-emerald-400 block font-bold">LIPIDS (FATS)</span>
              <div className="font-heading text-2xl font-black text-white mt-1">
                {calculatedPlan.fatsGrams}g
              </div>
              <span className="text-[10px] text-zinc-500 font-mono">Hormone balance</span>
            </div>
          </div>

          {/* Safe bounds and assumptions note */}
          <div className="p-3.5 rounded-xl bg-zinc-900/60 border border-zinc-800/80 text-xs text-zinc-400 leading-relaxed">
            <strong className="text-white">Internal Consistency:</strong> (Protein × 4) + (Carbs × 4) + (Fats × 9) equals exactly {calculatedPlan.dailyCalories} kcal. Weigh in once per week under identical fasted morning conditions to verify tissue rate of change.
          </div>

          <div className="pt-2 flex items-center justify-between">
            {appliedNotice ? (
              <span className="text-xs font-mono text-emerald-400 flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle className="w-4 h-4" /> Applied to Active Dashboard!
              </span>
            ) : <span />}

            <button
              onClick={handleApplyToActivePlan}
              className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-heading font-black tracking-widest text-xs uppercase flex items-center gap-2 shadow-lg shadow-red-950 cursor-pointer"
            >
              <span>APPLY TARGETS TO MY DASHBOARD</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

        </div>

      </div>

    </div>
  );
};
