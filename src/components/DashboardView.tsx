import React, { useState } from 'react';
import { 
  Flame, 
  Dumbbell, 
  Activity, 
  Calendar, 
  Droplet, 
  Sparkles, 
  ArrowRight, 
  Camera, 
  Heart, 
  CheckCircle, 
  Circle, 
  Plus, 
  TrendingUp, 
  ShieldCheck, 
  Moon,
  Clock
} from 'lucide-react';
import { UserProfile, GeneratedPlan, FoodLog, DailyTracking } from '../types';
import { StorageService } from '../services/storage';

interface DashboardViewProps {
  userProfile: UserProfile | null;
  generatedPlan: GeneratedPlan | null;
  foodLogs: FoodLog[];
  dailyTracking: DailyTracking;
  onUpdateTracking: (tracking: DailyTracking) => void;
  onNavigate: (tab: string) => void;
  onOpenOnboarding: () => void;
}

export const DashboardView: React.FC<DashboardViewProps> = ({
  userProfile,
  generatedPlan,
  foodLogs,
  dailyTracking,
  onUpdateTracking,
  onNavigate,
  onOpenOnboarding
}) => {
  const [completedExercises, setCompletedExercises] = useState<string[]>(dailyTracking.completedWorkoutIds || []);

  // Compute actual logged nutrition for today
  const consumedCalories = foodLogs.reduce((acc, item) => acc + item.calories, 0);
  const consumedProtein = foodLogs.reduce((acc, item) => acc + item.protein, 0);
  const consumedCarbs = foodLogs.reduce((acc, item) => acc + item.carbs, 0);
  const consumedFats = foodLogs.reduce((acc, item) => acc + item.fats, 0);

  const targetCalories = generatedPlan?.dailyCalories || 2750;
  const targetProtein = generatedPlan?.proteinGrams || 165;
  const targetCarbs = generatedPlan?.carbsGrams || 340;
  const targetFats = generatedPlan?.fatsGrams || 65;

  const caloriePct = Math.min(100, Math.round((consumedCalories / targetCalories) * 100));
  const proteinPct = Math.min(100, Math.round((consumedProtein / targetProtein) * 100));

  const athleteName = userProfile?.name || 'Athlete';
  const goalLabel = (userProfile?.primaryGoal || 'build_muscle').replace('_', ' ').toUpperCase();
  const experienceLabel = (userProfile?.experience || 'intermediate').toUpperCase();

  // Water intake handlers
  const handleAddWater = () => {
    const nextGlasses = dailyTracking.waterGlasses + 1;
    const updated = { ...dailyTracking, waterGlasses: nextGlasses };
    onUpdateTracking(updated);
  };

  const handleToggleExercise = (name: string) => {
    let nextList: string[];
    if (completedExercises.includes(name)) {
      nextList = completedExercises.filter(e => e !== name);
    } else {
      nextList = [...completedExercises, name];
    }
    setCompletedExercises(nextList);
    onUpdateTracking({ ...dailyTracking, completedWorkoutIds: nextList });
  };

  const todaysSchedule = [
    { id: 'ex_1', name: 'Barbell Flat Bench Press', sets: '4 sets × 6-8 reps', muscle: 'Chest' },
    { id: 'ex_2', name: 'Incline Dumbbell Press', sets: '4 sets × 8-10 reps', muscle: 'Upper Chest' },
    { id: 'ex_3', name: 'Standard Push-Up (AI Tracked)', sets: '3 sets × 15 reps', muscle: 'Chest / Triceps', isAi: true },
    { id: 'ex_4', name: 'Cable Triceps Rope Pushdown', sets: '4 sets × 12 reps', muscle: 'Triceps' }
  ];

  return (
    <div className="space-y-8 pb-16">
      
      {/* HERO SECTION matching Screenshot 7 */}
      <section className="relative overflow-hidden rounded-3xl gym-card border border-zinc-800/80 p-6 sm:p-10 text-center flex flex-col items-center">
        {/* Ambient red light bleed */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-96 h-48 bg-red-600/15 blur-3xl pointer-events-none -z-10 rounded-full"></div>

        {/* Pill Tag */}
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-zinc-900 border border-red-950/80 mb-5">
          <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
          <span className="text-[11px] font-mono tracking-widest text-zinc-300 uppercase">
            ELITE DARK GYM HYPERTROPHY PLATFORM
          </span>
        </div>

        {/* Main Athletic Title matching Screenshot 7 */}
        <h1 className="font-heading text-4xl sm:text-6xl md:text-7xl font-black tracking-tight text-white max-w-4xl uppercase leading-none">
          FORGE UNBREAKABLE <br className="hidden sm:inline" />
          <span className="bg-gradient-to-r from-red-500 via-rose-500 to-amber-500 bg-clip-text text-transparent">
            MUSCLE & DISCIPLINE
          </span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
          Execute professional bodybuilding splits for bulking and cutting, master anatomical workout biomechanics, lock in tissue recovery timelines, and fuel your physique with clean macros.
        </p>

        {/* Athlete Status Ribbon */}
        <div className="mt-5 flex flex-wrap items-center justify-center gap-3 text-xs font-mono text-zinc-400">
          <span className="text-zinc-300">ATHLETE: <strong className="text-white">{athleteName}</strong></span>
          <span>•</span>
          <span className="text-zinc-300">GOAL: <strong className="text-red-400">{goalLabel}</strong></span>
          <span>•</span>
          <span className="text-zinc-300">LEVEL: <strong className="text-amber-400">{experienceLabel}</strong></span>
        </div>

        {/* Primary CTA Buttons matching Screenshot 7 */}
        <div className="mt-8 flex flex-col sm:flex-row items-center gap-3 w-full sm:w-auto">
          <button
            onClick={() => onNavigate('splits')}
            className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-heading font-black tracking-widest text-sm flex items-center justify-center gap-2 shadow-xl shadow-red-950/60 transition-all cursor-pointer"
          >
            <Calendar className="w-4 h-4" />
            <span>BULK & CUT SPLITS</span>
            <ArrowRight className="w-4 h-4 ml-1" />
          </button>

          <button
            onClick={() => onNavigate('workouts')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-red-600/50 hover:bg-zinc-800 text-white font-heading font-bold tracking-wider text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Dumbbell className="w-4 h-4 text-red-500" />
            <span>WORKOUTS LIBRARY</span>
          </button>

          <button
            onClick={() => onNavigate('nutrition')}
            className="w-full sm:w-auto px-6 py-3.5 rounded-xl bg-zinc-900 border border-zinc-800 hover:border-red-600/50 hover:bg-zinc-800 text-white font-heading font-bold tracking-wider text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
          >
            <Activity className="w-4 h-4 text-emerald-500" />
            <span>NUTRITION & MACROS</span>
          </button>
        </div>
      </section>

      {/* 4 STAT CARDS in 2x2 or 4x1 grid matching Screenshot 8 */}
      <section className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-5 rounded-2xl bg-gradient-to-b from-zinc-900 to-black border border-zinc-800/80 flex flex-col justify-between">
          <span className="font-heading text-2xl sm:text-3xl font-black text-white">4 LEGENDS</span>
          <p className="text-[10px] sm:text-xs font-mono uppercase text-zinc-400 tracking-wider mt-2">
            ARNOLD • RONNIE • CBUM • YATES
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-b from-zinc-900 to-black border border-zinc-800/80 flex flex-col justify-between">
          <span className="font-heading text-2xl sm:text-3xl font-black text-red-500">7 GROUPS</span>
          <p className="text-[10px] sm:text-xs font-mono uppercase text-zinc-400 tracking-wider mt-2">
            CHEST, BACK, ARMS, LEGS & CORE
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-b from-zinc-900 to-black border border-zinc-800/80 flex flex-col justify-between">
          <span className="font-heading text-2xl sm:text-3xl font-black text-amber-500">24-96 HRS</span>
          <p className="text-[10px] sm:text-xs font-mono uppercase text-zinc-400 tracking-wider mt-2">
            SCIENTIFIC RECOVERY WINDOWS
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-gradient-to-b from-zinc-900 to-black border border-zinc-800/80 flex flex-col justify-between">
          <span className="font-heading text-2xl sm:text-3xl font-black text-emerald-400">100% CLEAN</span>
          <p className="text-[10px] sm:text-xs font-mono uppercase text-zinc-400 tracking-wider mt-2">
            ANABOLIC NUTRIENT TARGETS
          </p>
        </div>
      </section>

      {/* FLAGSHIP AI CAMERA TRAINER SPOTLIGHT BANNER */}
      <section className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-red-950/60 via-zinc-900 to-black border border-red-600/40 shadow-xl shadow-red-950/30 flex flex-col lg:flex-row items-center justify-between gap-6">
        <div className="space-y-2 text-center lg:text-left">
          <div className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-400 font-bold">
            <Camera className="w-4 h-4 text-red-500" />
            FLAGSHIP BIOMECHANICAL VISION
          </div>
          <h2 className="font-heading text-2xl sm:text-4xl font-black text-white">
            IRONVAULT AI CAMERA TRAINER
          </h2>
          <p className="text-xs sm:text-sm text-zinc-400 max-w-xl">
            Live on-device pose estimation with real-time skeleton overlay. Automatically track your Squats, Push-ups, Lunges, and Curls with angle hysteresis and form feedback.
          </p>
        </div>

        <button
          onClick={() => onNavigate('ai_camera')}
          className="px-6 py-3.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-heading font-black tracking-widest text-sm flex items-center gap-2 shadow-lg shadow-red-900 transition-all shrink-0 cursor-pointer"
        >
          <Camera className="w-4 h-4" />
          START AI CAMERA SESSION
          <ArrowRight className="w-4 h-4" />
        </button>
      </section>

      {/* TODAY'S TWO PILLARS: WORKOUT COMPLETION & NUTRITION TRACKER */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* TODAY'S WORKOUT TARGET */}
        <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Dumbbell className="w-5 h-5 text-red-500" />
              <div>
                <h3 className="font-heading text-xl font-bold text-white">TODAY'S TRAINING PROTOCOL</h3>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">
                  Push Hypertrophy Focus (Chest & Triceps)
                </span>
              </div>
            </div>
            <span className="text-xs font-mono font-bold text-red-400">
              {completedExercises.length} / {todaysSchedule.length} DONE
            </span>
          </div>

          <div className="space-y-2.5">
            {todaysSchedule.map((ex) => {
              const isDone = completedExercises.includes(ex.name);
              return (
                <div
                  key={ex.id}
                  onClick={() => handleToggleExercise(ex.name)}
                  className={`p-3.5 rounded-xl border flex items-center justify-between cursor-pointer transition-all ${
                    isDone
                      ? 'bg-red-950/20 border-red-800/60 text-zinc-300'
                      : 'bg-zinc-900/60 border-zinc-800 text-white hover:border-zinc-700'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    {isDone ? (
                      <CheckCircle className="w-5 h-5 text-red-500 shrink-0" />
                    ) : (
                      <Circle className="w-5 h-5 text-zinc-600 shrink-0" />
                    )}
                    <div>
                      <div className="text-sm font-semibold flex items-center gap-2">
                        <span className={isDone ? 'line-through text-zinc-500' : 'text-white'}>
                          {ex.name}
                        </span>
                        {ex.isAi && (
                          <span className="text-[9px] font-mono px-1.5 py-0.2 rounded bg-red-600 text-white font-bold uppercase">
                            AI
                          </span>
                        )}
                      </div>
                      <span className="text-[11px] font-mono text-zinc-500">{ex.sets} • {ex.muscle}</span>
                    </div>
                  </div>

                  {ex.isAi && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onNavigate('ai_camera');
                      }}
                      className="px-2.5 py-1 rounded bg-zinc-800 hover:bg-red-600 text-[10px] font-mono text-zinc-300 hover:text-white uppercase transition-colors"
                    >
                      Track
                    </button>
                  )}
                </div>
              );
            })}
          </div>

          <div className="pt-2 flex items-center justify-between">
            <button
              onClick={() => onNavigate('workouts')}
              className="text-xs font-mono text-red-400 hover:text-red-300 flex items-center gap-1"
            >
              View Full 24+ Exercises Library <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* TODAY'S MACRO FUELING & WATER TRACKER */}
        <div className="p-6 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-5">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <Activity className="w-5 h-5 text-emerald-500" />
              <div>
                <h3 className="font-heading text-xl font-bold text-white">TODAY'S ANABOLIC FUEL</h3>
                <span className="text-[10px] font-mono text-zinc-500 uppercase">
                  Logged Consumption vs Target
                </span>
              </div>
            </div>
            <button
              onClick={() => onNavigate('nutrition')}
              className="text-xs font-mono text-emerald-400 hover:underline flex items-center gap-1"
            >
              + Log Food
            </button>
          </div>

          {/* Calorie Bar */}
          <div className="space-y-1.5">
            <div className="flex items-center justify-between text-xs">
              <span className="text-zinc-400 font-mono">ENERGY INTAKE</span>
              <span className="font-mono text-white font-bold">
                {consumedCalories} / {targetCalories} <span className="text-zinc-500">kcal</span> ({caloriePct}%)
              </span>
            </div>
            <div className="w-full h-2.5 rounded-full bg-zinc-900 overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-red-600 to-amber-500 rounded-full transition-all duration-300"
                style={{ width: `${Math.min(100, caloriePct)}%` }}
              />
            </div>
          </div>

          {/* 3 Macro Metrics */}
          <div className="grid grid-cols-3 gap-2 text-center">
            <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800/80">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">PROTEIN</span>
              <div className="text-base font-bold text-white font-mono mt-0.5">
                {consumedProtein}g <span className="text-[10px] text-zinc-500">/ {targetProtein}g</span>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800/80">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">CARBS</span>
              <div className="text-base font-bold text-white font-mono mt-0.5">
                {consumedCarbs}g <span className="text-[10px] text-zinc-500">/ {targetCarbs}g</span>
              </div>
            </div>
            <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800/80">
              <span className="text-[10px] font-mono text-zinc-500 uppercase">FATS</span>
              <div className="text-base font-bold text-white font-mono mt-0.5">
                {consumedFats}g <span className="text-[10px] text-zinc-500">/ {targetFats}g</span>
              </div>
            </div>
          </div>

          {/* Water Intake Tracker */}
          <div className="pt-3 border-t border-zinc-800/80 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-950/40 border border-blue-900/60 flex items-center justify-center text-blue-400">
                <Droplet className="w-4 h-4 fill-blue-500" />
              </div>
              <div>
                <span className="text-xs font-bold text-white block">HYDRATION TRACKER</span>
                <span className="text-[11px] font-mono text-zinc-400">
                  {dailyTracking.waterGlasses} Glasses ({dailyTracking.waterGlasses * 250} ml / 3500 ml target)
                </span>
              </div>
            </div>

            <button
              onClick={handleAddWater}
              className="px-3 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-blue-300 hover:text-white flex items-center gap-1.5 transition-colors"
            >
              <Plus className="w-3.5 h-3.5" /> +250 ml
            </button>
          </div>
        </div>
      </section>

      {/* CORE FITNESS GUIDES matching Screenshot 8 */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-red-500 font-bold uppercase">
              <Flame className="w-3.5 h-3.5" /> CORE FITNESS GUIDES
            </div>
            <h2 className="font-heading text-2xl sm:text-3xl font-black text-white">
              SELECT YOUR TRAINING DIMENSION
            </h2>
          </div>
          <button
            onClick={() => onNavigate('workouts')}
            className="text-xs font-mono text-red-400 hover:text-red-300 hidden sm:flex items-center gap-1"
          >
            EXPLORE ALL ROUTINES <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          
          {/* Card 1: Nutrition & Fuel matching Screenshot 8 */}
          <div 
            onClick={() => onNavigate('nutrition')}
            className="gym-card p-6 rounded-2xl border border-zinc-800/80 hover:border-red-600/40 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-emerald-400 group-hover:border-emerald-500/40">
                  <Activity className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400">
                  <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                    NUTRIENT DENSE
                  </span>
                  <span>12+ CORE FOODS</span>
                </div>
              </div>

              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                MACRO & FOOD ITEMS
              </span>
              <h3 className="font-heading text-xl font-bold text-white mt-1">
                NUTRITION & FUEL
              </h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Explore optimal high-protein food sources, complex carbs, healthy fats, Indian meal staples, and exact post-workout nutrient timing.
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs font-heading font-bold tracking-wider text-zinc-300 group-hover:text-white">
              <span>ACCESS GUIDE</span>
              <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-colors">
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
              </div>
            </div>
          </div>

          {/* Card 2: Bodybuilder Splits matching Screenshot 8 */}
          <div 
            onClick={() => onNavigate('splits')}
            className="gym-card p-6 rounded-2xl border border-zinc-800/80 hover:border-red-600/40 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-amber-400 group-hover:border-amber-500/40">
                  <Calendar className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400">
                  <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                    PRO ATHLETES
                  </span>
                  <span>BULK & CUT</span>
                </div>
              </div>

              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                BULK & CUT ROUTINES
              </span>
              <h3 className="font-heading text-xl font-bold text-white mt-1">
                BODYBUILDER SPLITS
              </h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Legendary splits from Arnold Schwarzenegger, Ronnie Coleman, Chris Bumstead, and Dorian Yates categorized for hypertrophy periodization.
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs font-heading font-bold tracking-wider text-zinc-300 group-hover:text-white">
              <span>ACCESS GUIDE</span>
              <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-colors">
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
              </div>
            </div>
          </div>

          {/* Card 3: Workouts Arsenal matching Screenshot 8 */}
          <div 
            onClick={() => onNavigate('workouts')}
            className="gym-card p-6 rounded-2xl border border-zinc-800/80 hover:border-red-600/40 transition-all cursor-pointer flex flex-col justify-between group"
          >
            <div>
              <div className="flex items-center justify-between mb-4">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-red-500 group-hover:border-red-500/40">
                  <Dumbbell className="w-5 h-5" />
                </div>
                <div className="flex items-center gap-1.5 text-[10px] font-mono text-zinc-400">
                  <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-300">
                    HYPERTROPHY
                  </span>
                  <span>24+ EXERCISES</span>
                </div>
              </div>

              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
                7 MUSCLE TARGET GROUPS
              </span>
              <h3 className="font-heading text-xl font-bold text-white mt-1">
                WORKOUTS ARSENAL
              </h3>
              <p className="text-xs text-zinc-400 mt-2 leading-relaxed">
                Comprehensive biomechanical exercise atlas covering Chest, Back, Shoulders, Biceps, Triceps, Legs, Abs, rest timers, and AI tracking.
              </p>
            </div>

            <div className="pt-6 mt-4 border-t border-zinc-800/60 flex items-center justify-between text-xs font-heading font-bold tracking-wider text-zinc-300 group-hover:text-white">
              <span>ACCESS GUIDE</span>
              <div className="w-7 h-7 rounded-lg bg-zinc-900 border border-zinc-800 flex items-center justify-center group-hover:bg-red-600 group-hover:border-red-600 transition-colors">
                <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:text-white" />
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
