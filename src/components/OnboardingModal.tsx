import React, { useState } from 'react';
import { 
  Dumbbell, 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  Activity, 
  Target, 
  Zap, 
  Scale, 
  Sparkles,
  AlertCircle
} from 'lucide-react';
import { UserProfile, FitnessGoal, DietaryPreference, BodyStartingCondition, ActivityLevel, ExperienceLevel, GeneratedPlan } from '../types';
import { generateFitnessPlan } from '../utils/calculator';
import { StorageService } from '../services/storage';

interface OnboardingModalProps {
  isOpen: boolean;
  onComplete: (profile: UserProfile, plan: GeneratedPlan) => void;
  initialProfile?: Partial<UserProfile>;
}

export const OnboardingModal: React.FC<OnboardingModalProps> = ({
  isOpen,
  onComplete,
  initialProfile
}) => {
  const [step, setStep] = useState<'A' | 'B' | 'C' | 'D'>('A');

  // STEP A STATE
  const [name, setName] = useState(initialProfile?.name || 'Vinay Vaishnav');
  const [age, setAge] = useState(initialProfile?.age || 24);
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>('metric');
  const [heightCm, setHeightCm] = useState(initialProfile?.height || 178);
  const [weightKg, setWeightKg] = useState(initialProfile?.weight || 76.5);
  const [sex, setSex] = useState<'male' | 'female' | 'unspecified'>('male');
  const [country, setCountry] = useState(initialProfile?.country || 'India');
  const [language, setLanguage] = useState(initialProfile?.language || 'English');
  const [experience, setExperience] = useState<ExperienceLevel>(initialProfile?.experience || 'intermediate');

  // STEP B STATE
  const [startingCondition, setStartingCondition] = useState<BodyStartingCondition>(initialProfile?.startingCondition || 'athletic');
  const [activityLevel, setActivityLevel] = useState<ActivityLevel>(initialProfile?.activityLevel || 'very_active');
  const [workoutFrequency, setWorkoutFrequency] = useState(initialProfile?.workoutFrequency || 5);
  const [workoutLocation, setWorkoutLocation] = useState<'gym' | 'home'>('gym');
  const [preferredDuration, setPreferredDuration] = useState(60);
  const [dietaryPreference, setDietaryPreference] = useState<DietaryPreference>(initialProfile?.dietaryPreference || 'vegetarian');
  const [allergiesInput, setAllergiesInput] = useState('');
  const [limitationsInput, setLimitationsInput] = useState('');

  // STEP C STATE
  const [primaryGoal, setPrimaryGoal] = useState<FitnessGoal>(initialProfile?.primaryGoal || 'build_muscle');
  const [secondaryGoals, setSecondaryGoals] = useState<FitnessGoal[]>(['strength']);
  const [targetWeight, setTargetWeight] = useState(80);
  const [pace, setPace] = useState<'steady' | 'moderate' | 'aggressive'>('moderate');

  // STEP D STATE (Generated Plan)
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan | null>(null);

  if (!isOpen) return null;

  const handleGeneratePlan = () => {
    const profileDraft: Partial<UserProfile> = {
      name,
      age,
      height: heightCm,
      weight: weightKg,
      unitSystem,
      sex,
      country,
      language,
      experience,
      startingCondition,
      activityLevel,
      workoutFrequency,
      workoutLocation,
      preferredDuration,
      dietaryPreference,
      allergies: allergiesInput.split(',').map(s => s.trim()).filter(Boolean),
      injuriesOrLimitations: limitationsInput.split(',').map(s => s.trim()).filter(Boolean),
      primaryGoal,
      secondaryGoals,
      targetWeight,
      pace
    };

    const plan = generateFitnessPlan(profileDraft);
    setGeneratedPlan(plan);
    setStep('D');
  };

  const handleFinishOnboarding = () => {
    if (!generatedPlan) return;
    const finalProfile: UserProfile = {
      id: initialProfile?.id || 'athlete_' + Date.now(),
      email: initialProfile?.email || 'athlete@ironvault.pro',
      name,
      age,
      height: heightCm,
      weight: weightKg,
      unitSystem,
      sex,
      country,
      language,
      experience,
      startingCondition,
      activityLevel,
      workoutFrequency,
      workoutLocation,
      availableEquipment: workoutLocation === 'gym' ? ['Barbell', 'Dumbbells', 'Cables', 'Machines', 'Racks'] : ['Dumbbells', 'Pull-Up Bar', 'Resistance Bands'],
      preferredDuration,
      dietaryPreference,
      allergies: allergiesInput.split(',').map(s => s.trim()).filter(Boolean),
      injuriesOrLimitations: limitationsInput.split(',').map(s => s.trim()).filter(Boolean),
      primaryGoal,
      secondaryGoals,
      targetWeight,
      pace,
      onboarded: true,
      createdAt: new Date().toISOString()
    };

    StorageService.saveUserProfile(finalProfile);
    StorageService.saveGeneratedPlan(generatedPlan);
    onComplete(finalProfile, generatedPlan);
  };

  const toggleSecondaryGoal = (g: FitnessGoal) => {
    if (secondaryGoals.includes(g)) {
      setSecondaryGoals(secondaryGoals.filter(x => x !== g));
    } else {
      if (secondaryGoals.length < 2) {
        setSecondaryGoals([...secondaryGoals, g]);
      }
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-3xl bg-zinc-950 border border-zinc-800 rounded-3xl p-5 sm:p-8 shadow-2xl shadow-red-950/40 my-6">
        
        {/* Progress Header */}
        <div className="mb-6 pb-4 border-b border-zinc-800">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-red-500" />
              <span className="font-brand text-lg font-black tracking-wider text-white">
                IRON<span className="text-red-500">VAULT</span> ATHLETE ASSESSMENT
              </span>
            </div>
            <span className="text-xs font-mono text-zinc-400">
              STEP {step} OF D
            </span>
          </div>

          {/* Stepper Bar */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { id: 'A', label: 'BASIC PROFILE' },
              { id: 'B', label: 'BODY & LIFESTYLE' },
              { id: 'C', label: 'TARGET GOALS' },
              { id: 'D', label: 'AI CUSTOM PLAN' }
            ].map((st) => (
              <div key={st.id} className="flex flex-col gap-1">
                <div className={`h-1.5 rounded-full transition-all ${
                  step === st.id ? 'bg-red-500 shadow-sm shadow-red-600' : 
                  (step > st.id ? 'bg-red-900' : 'bg-zinc-800')
                }`} />
                <span className={`text-[10px] font-mono tracking-wider hidden sm:inline ${
                  step === st.id ? 'text-red-400 font-bold' : 'text-zinc-500'
                }`}>
                  {st.label}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* STEP A: BASIC PROFILE */}
        {step === 'A' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <h3 className="font-heading text-2xl font-black text-white">ATHLETE BIOMETRIC BASELINE</h3>
              <p className="text-xs text-zinc-400">Configure your personal physical parameters for precise caloric and macro modeling.</p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">Athlete Name / Handle</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">Age (Years)</label>
                <input
                  type="number"
                  min="14"
                  max="90"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Units Switch */}
              <div className="sm:col-span-2 flex items-center justify-between p-3 rounded-xl bg-zinc-900/60 border border-zinc-800">
                <span className="text-xs text-zinc-300 font-medium">Measurement Standard</span>
                <div className="flex bg-black p-1 rounded-lg border border-zinc-800">
                  <button
                    type="button"
                    onClick={() => setUnitSystem('metric')}
                    className={`px-3 py-1 text-xs font-bold rounded ${unitSystem === 'metric' ? 'bg-red-600 text-white' : 'text-zinc-400'}`}
                  >
                    Metric (kg / cm)
                  </button>
                  <button
                    type="button"
                    onClick={() => setUnitSystem('imperial')}
                    className={`px-3 py-1 text-xs font-bold rounded ${unitSystem === 'imperial' ? 'bg-red-600 text-white' : 'text-zinc-400'}`}
                  >
                    Imperial (lb / ft)
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                  Height {unitSystem === 'metric' ? '(cm)' : '(approx cm)'}
                </label>
                <input
                  type="number"
                  value={heightCm}
                  onChange={(e) => setHeightCm(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                  Current Weight {unitSystem === 'metric' ? '(kg)' : '(approx kg)'}
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={weightKg}
                  onChange={(e) => setWeightKg(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              {/* Sex with scientific disclaimer */}
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-mono text-zinc-400 uppercase">Biological Sex</label>
                  <span className="text-[10px] text-zinc-500 font-mono">BMR Calculation Factor</span>
                </div>
                <select
                  value={sex}
                  onChange={(e) => setSex(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                >
                  <option value="male">Male (Mifflin Offset +5)</option>
                  <option value="female">Female (Mifflin Offset -161)</option>
                  <option value="unspecified">Prefer Not to Specify (Neutral)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">Fitness Experience</label>
                <select
                  value={experience}
                  onChange={(e) => setExperience(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                >
                  <option value="beginner">Beginner (&lt; 1 Year of Training)</option>
                  <option value="intermediate">Intermediate (1 - 3 Years Consistent)</option>
                  <option value="advanced">Advanced (&gt; 3 Years Heavy Lifting)</option>
                </select>
              </div>
            </div>

            <div className="flex justify-end pt-4">
              <button
                type="button"
                onClick={() => setStep('B')}
                className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-heading font-black tracking-widest text-sm flex items-center gap-2 shadow-lg shadow-red-950"
              >
                PROCEED TO BODY CONDITION <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP B: BODY & LIFESTYLE */}
        {step === 'B' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <h3 className="font-heading text-2xl font-black text-white">CURRENT PHYSIQUE & NUTRITIONAL HABITS</h3>
              <p className="text-xs text-zinc-400">Self-reported starting point and lifestyle profile (strictly non-diagnostic).</p>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-2">Self-Described Starting Build</label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5">
                {[
                  { id: 'slim', label: 'Slim / Underweight' },
                  { id: 'average', label: 'Average Build' },
                  { id: 'athletic', label: 'Athletic' },
                  { id: 'muscular', label: 'Muscular' },
                  { id: 'higher_fat', label: 'Higher Body Fat' },
                  { id: 'unspecified', label: 'Prefer Not to Say' }
                ].map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    onClick={() => setStartingCondition(item.id as any)}
                    className={`p-3 rounded-xl border text-left text-xs font-semibold transition-all ${
                      startingCondition === item.id
                        ? 'border-red-500 bg-red-950/30 text-white'
                        : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-white'
                    }`}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">Weekly Activity Level</label>
                <select
                  value={activityLevel}
                  onChange={(e) => setActivityLevel(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                >
                  <option value="sedentary">Sedentary (Desk Job, Minimal Movement)</option>
                  <option value="light">Lightly Active (1-2 Light Workouts/Wk)</option>
                  <option value="moderate">Moderately Active (3-4 Gym Sessions/Wk)</option>
                  <option value="very_active">Very Active (5-6 Heavy Lifting Sessions/Wk)</option>
                  <option value="extra_active">Extra Active (2x Daily Athlete / Manual Labor)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">Dietary Preference</label>
                <select
                  value={dietaryPreference}
                  onChange={(e) => setDietaryPreference(e.target.value as any)}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                >
                  <option value="vegetarian">Vegetarian (Dairy, Paneer, Dal, Soya)</option>
                  <option value="eggetarian">Eggetarian (Dairy, Eggs, Plant Protein)</option>
                  <option value="non-vegetarian">Non-Vegetarian (Chicken, Fish, Eggs, Dairy)</option>
                  <option value="vegan">Vegan (100% Plant-Based, Tofu, Legumes)</option>
                </select>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">Training Environment</label>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setWorkoutLocation('gym')}
                    className={`py-2 text-xs font-bold rounded-xl border ${
                      workoutLocation === 'gym' ? 'border-red-500 bg-red-950/40 text-white' : 'border-zinc-800 text-zinc-400'
                    }`}
                  >
                    Gym (Heavy Iron)
                  </button>
                  <button
                    type="button"
                    onClick={() => setWorkoutLocation('home')}
                    className={`py-2 text-xs font-bold rounded-xl border ${
                      workoutLocation === 'home' ? 'border-red-500 bg-red-950/40 text-white' : 'border-zinc-800 text-zinc-400'
                    }`}
                  >
                    Home / Calisthenics
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">Workout Frequency ({workoutFrequency} Days/Wk)</label>
                <input
                  type="range"
                  min="2"
                  max="6"
                  value={workoutFrequency}
                  onChange={(e) => setWorkoutFrequency(Number(e.target.value))}
                  className="w-full accent-red-600 cursor-pointer"
                />
                <div className="flex justify-between text-[10px] font-mono text-zinc-500">
                  <span>2 Days (Full Body)</span>
                  <span>4 Days (Upper/Lower)</span>
                  <span>6 Days (PPL Split)</span>
                </div>
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                Known Food Allergies or Restrictions (Optional)
              </label>
              <input
                type="text"
                value={allergiesInput}
                onChange={(e) => setAllergiesInput(e.target.value)}
                placeholder="e.g. Dairy lactose sensitivity, peanuts, gluten"
                className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
              />
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep('A')}
                className="px-4 py-2.5 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white font-mono text-xs flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> BACK
              </button>
              <button
                type="button"
                onClick={() => setStep('C')}
                className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-heading font-black tracking-widest text-sm flex items-center gap-2 shadow-lg shadow-red-950"
              >
                SELECT GOALS <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        )}

        {/* STEP C: GOALS */}
        {step === 'C' && (
          <div className="space-y-4 animate-in fade-in duration-150">
            <div>
              <h3 className="font-heading text-2xl font-black text-white">SELECT PRIMARY GOAL</h3>
              <p className="text-xs text-zinc-400">Choose your main physical objective. We prioritize progressive overload and macro balance.</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {[
                { id: 'build_muscle', label: 'Build Muscle (Hypertrophy)', desc: 'Lean tissue accretion with moderate surplus' },
                { id: 'gain_weight', label: 'Mass Gain (Bulking)', desc: 'Accelerated surplus for hardgainers' },
                { id: 'lose_fat', label: 'Lose Body Fat (Cutting)', desc: 'Caloric deficit preserving lean mass' },
                { id: 'lean_athletic', label: 'Lean & Athletic', desc: 'Recomposition with functional density' },
                { id: 'strength', label: 'Power & Strength', desc: 'Central nervous system & 1RM output' },
                { id: 'endurance', label: 'Endurance & Stamina', desc: 'Mitochondrial and aerobic capacity' },
                { id: 'maintain', label: 'Maintain Physique', desc: 'Equilibrium TDEE with joint sparing' },
                { id: 'healthy_lifestyle', label: 'Health & Vitality', desc: 'Metabolic markers and consistency' }
              ].map((g) => (
                <button
                  key={g.id}
                  type="button"
                  onClick={() => setPrimaryGoal(g.id as any)}
                  className={`p-3 rounded-2xl border text-left flex flex-col justify-between transition-all min-h-[90px] ${
                    primaryGoal === g.id
                      ? 'border-red-500 bg-red-950/40 text-white shadow-lg shadow-red-950/40 ring-1 ring-red-500'
                      : 'border-zinc-800 bg-zinc-900/60 text-zinc-400 hover:border-zinc-700 hover:text-white'
                  }`}
                >
                  <span className="text-xs font-bold">{g.label}</span>
                  <span className="text-[10px] text-zinc-500 leading-tight mt-1">{g.desc}</span>
                </button>
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">
                  Target Weight Goal (kg)
                </label>
                <input
                  type="number"
                  step="0.5"
                  value={targetWeight}
                  onChange={(e) => setTargetWeight(Number(e.target.value))}
                  className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500"
                />
              </div>

              <div>
                <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">Transformation Pace</label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'steady', label: 'Steady' },
                    { id: 'moderate', label: 'Moderate' },
                    { id: 'aggressive', label: 'Aggressive' }
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

            <div className="p-3 rounded-xl bg-zinc-900/80 border border-zinc-800 flex items-start gap-2 text-xs text-zinc-400">
              <AlertCircle className="w-4 h-4 text-amber-500 shrink-0 mt-0.5" />
              <span>
                Realistic physiological expectations: Sustainable natural muscle gain averages 0.25 - 0.5 kg per month. We enforce safe metabolic boundaries.
              </span>
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep('B')}
                className="px-4 py-2.5 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white font-mono text-xs flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> BACK
              </button>
              <button
                type="button"
                onClick={handleGeneratePlan}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-heading font-black tracking-widest text-sm flex items-center gap-2 shadow-xl shadow-red-950"
              >
                <Sparkles className="w-4 h-4" /> GENERATE PERSONAL PLAN
              </button>
            </div>
          </div>
        )}

        {/* STEP D: PLAN GENERATION */}
        {step === 'D' && generatedPlan && (
          <div className="space-y-5 animate-in fade-in duration-200">
            <div className="flex items-center justify-between">
              <div>
                <span className="text-[10px] font-mono tracking-widest text-red-500 uppercase">
                  BIOMECHANICAL ARCHITECTURE
                </span>
                <h3 className="font-heading text-2xl sm:text-3xl font-black text-white">
                  YOUR PERSONALIZED IRONVAULT PROTOCOL
                </h3>
              </div>
              <button
                type="button"
                onClick={handleGeneratePlan}
                className="text-xs font-mono text-zinc-400 hover:text-red-400 underline"
              >
                Recalculate
              </button>
            </div>

            {/* Macro Cards Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-4 rounded-2xl bg-zinc-900 border border-red-500/30 text-center">
                <span className="text-[10px] font-mono text-zinc-400 uppercase">Daily Calorie Target</span>
                <div className="text-2xl font-black font-heading text-white mt-1">
                  {generatedPlan.dailyCalories} <span className="text-xs font-normal text-zinc-400 font-mono">kcal</span>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
                <span className="text-[10px] font-mono text-red-400 uppercase">Target Protein</span>
                <div className="text-2xl font-black font-heading text-white mt-1">
                  {generatedPlan.proteinGrams}g
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">4 kcal/g</span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
                <span className="text-[10px] font-mono text-amber-400 uppercase">Carbohydrates</span>
                <div className="text-2xl font-black font-heading text-white mt-1">
                  {generatedPlan.carbsGrams}g
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">4 kcal/g</span>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 text-center">
                <span className="text-[10px] font-mono text-emerald-400 uppercase">Healthy Fats</span>
                <div className="text-2xl font-black font-heading text-white mt-1">
                  {generatedPlan.fatsGrams}g
                </div>
                <span className="text-[10px] text-zinc-500 font-mono">9 kcal/g</span>
              </div>
            </div>

            {/* Recommended Schedule & Meal Suggestions */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                <span className="text-xs font-bold text-red-400 flex items-center gap-1.5 font-heading tracking-wider">
                  <Activity className="w-4 h-4" /> TRAINING SPLIT RECOMMENDATION
                </span>
                <p className="text-sm font-semibold text-white">{generatedPlan.recommendedSchedule}</p>
                <p className="text-xs text-zinc-400">
                  Formulated with compound mechanical overload, targeted isolation, and optimal supercompensation.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800 space-y-2">
                <span className="text-xs font-bold text-amber-400 flex items-center gap-1.5 font-heading tracking-wider">
                  <Target className="w-4 h-4" /> TAILORED MEAL ARCHITECTURE
                </span>
                <ul className="text-xs text-zinc-300 space-y-1">
                  {generatedPlan.mealSuggestions.slice(0, 3).map((m, idx) => (
                    <li key={idx} className="truncate">• {m}</li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-zinc-900 border border-zinc-800 text-[11px] text-zinc-400">
              Disclaimer: Caloric and macronutrient numbers are estimated mathematical guidelines, not medical advice. Consult a licensed dietitian for specialized clinical requirements.
            </div>

            <div className="flex justify-between pt-4">
              <button
                type="button"
                onClick={() => setStep('C')}
                className="px-4 py-2.5 rounded-xl border border-zinc-800 text-zinc-400 hover:text-white font-mono text-xs flex items-center gap-1.5"
              >
                <ArrowLeft className="w-4 h-4" /> EDIT DATA
              </button>
              <button
                type="button"
                onClick={handleFinishOnboarding}
                className="px-8 py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-heading font-black tracking-widest text-sm flex items-center gap-2 shadow-2xl shadow-red-950"
              >
                <CheckCircle2 className="w-5 h-5 text-white" />
                CONFIRM & ENTER DASHBOARD
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};
