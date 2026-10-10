import React, { useState, useEffect, useRef } from 'react';
import { 
  Dumbbell, 
  Play, 
  Pause, 
  RotateCcw, 
  Camera, 
  Info, 
  ChevronRight, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  ShieldAlert,
  ArrowUpRight,
  X
} from 'lucide-react';
import { EXERCISES } from '../data/exercisesData';
import { Exercise, MuscleGroup } from '../types';

interface WorkoutsArsenalViewProps {
  onStartAiTrainer: (exerciseId: string) => void;
}

export const WorkoutsArsenalView: React.FC<WorkoutsArsenalViewProps> = ({
  onStartAiTrainer
}) => {
  const [selectedMuscle, setSelectedMuscle] = useState<string>('all');
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(null);

  // STOPWATCH / REST TIMER STATE (matching Screenshot 4)
  const [stopwatchSeconds, setStopwatchSeconds] = useState(60);
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  const timerIntervalRef = useRef<any>(null);

  useEffect(() => {
    if (isTimerRunning) {
      timerIntervalRef.current = setInterval(() => {
        setStopwatchSeconds((prev) => {
          if (prev <= 1) {
            clearInterval(timerIntervalRef.current);
            setIsTimerRunning(false);
            playTimerChime();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      clearInterval(timerIntervalRef.current);
    }
    return () => clearInterval(timerIntervalRef.current);
  }, [isTimerRunning]);

  const playTimerChime = () => {
    try {
      const AudioContext = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContext) {
        const ctx = new AudioContext();
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(880, ctx.currentTime); // A5 note
        gain.gain.setValueAtTime(0.3, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.8);
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start();
        osc.stop(ctx.currentTime + 0.8);
      }
    } catch {
      // audio context silent fallback
    }
  };

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleSetTimer = (secs: number) => {
    setIsTimerRunning(false);
    setStopwatchSeconds(secs);
  };

  const muscleFilters = [
    { id: 'all', label: 'ALL MUSCLES', count: EXERCISES.length },
    { id: 'chest', label: 'CHEST (PECS)', count: EXERCISES.filter(e => e.muscleGroup === 'chest').length },
    { id: 'back', label: 'BACK (LATS)', count: EXERCISES.filter(e => e.muscleGroup === 'back').length },
    { id: 'triceps', label: 'TRICEPS', count: EXERCISES.filter(e => e.muscleGroup === 'triceps').length },
    { id: 'biceps', label: 'BICEPS', count: EXERCISES.filter(e => e.muscleGroup === 'biceps').length },
    { id: 'legs', label: 'LEGS (QUADS & HAMS)', count: EXERCISES.filter(e => e.muscleGroup === 'legs').length },
    { id: 'abs', label: 'ABS (CORE)', count: EXERCISES.filter(e => e.muscleGroup === 'abs').length },
    { id: 'shoulders', label: 'SHOULDERS (DELTS)', count: EXERCISES.filter(e => e.muscleGroup === 'shoulders').length }
  ];

  const filteredExercises = selectedMuscle === 'all'
    ? EXERCISES
    : EXERCISES.filter(e => e.muscleGroup === selectedMuscle);

  return (
    <div className="space-y-8 pb-16">
      
      {/* HEADER SECTION matching Screenshot 4 */}
      <section className="relative overflow-hidden rounded-3xl gym-card border border-zinc-800/80 p-6 sm:p-10">
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-500 font-bold mb-2">
          <Dumbbell className="w-4 h-4 text-red-500" />
          HEAVY IRON EXERCISE LIBRARY
        </div>

        <h1 className="font-heading text-4xl sm:text-6xl font-black tracking-tight text-white uppercase leading-none">
          TARGETED <br className="sm:hidden" />
          <span className="text-red-500">WORKOUTS</span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-2xl leading-relaxed">
          Biomechanical perfection across 7 core muscular pillars: <strong className="text-white">Chest, Back, Triceps, Biceps, Legs, Abs,</strong> and <strong className="text-white">Shoulders</strong>.
        </p>

        {/* 7 Muscle Group Buttons matching Screenshot 4 */}
        <div className="mt-8 flex flex-wrap gap-2.5">
          {muscleFilters.map((mf) => {
            const isActive = selectedMuscle === mf.id;
            return (
              <button
                key={mf.id}
                onClick={() => setSelectedMuscle(mf.id)}
                className={`px-4 py-2 rounded-xl text-xs font-bold tracking-wider transition-all flex items-center gap-2 cursor-pointer ${
                  isActive
                    ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-lg shadow-red-950 ring-1 ring-red-500'
                    : 'bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white hover:border-zinc-700'
                }`}
              >
                <span>{mf.label}</span>
                <span className={`text-[10px] font-mono px-1.5 py-0.2 rounded-full ${
                  isActive ? 'bg-black/40 text-white' : 'bg-zinc-800 text-zinc-400'
                }`}>
                  {mf.count}
                </span>
              </button>
            );
          })}
        </div>

        {/* GYM REST STOPWATCH matching Screenshot 4 */}
        <div className="mt-8 p-4 rounded-2xl bg-zinc-950/90 border border-zinc-800/80 max-w-md flex items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center text-red-500">
              <Clock className="w-5 h-5" />
            </div>
            <div>
              <span className="text-[10px] font-mono uppercase text-zinc-500 tracking-wider block">
                GYM REST STOPWATCH
              </span>
              <span className="font-heading text-3xl font-black text-white font-mono tracking-tight">
                {formatTimer(stopwatchSeconds)}
              </span>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => handleSetTimer(60)}
              className="px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white"
            >
              60s
            </button>
            <button
              onClick={() => handleSetTimer(90)}
              className="px-2.5 py-1.5 rounded-lg bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-xs font-mono text-zinc-300 hover:text-white"
            >
              90s
            </button>
            <button
              onClick={() => setIsTimerRunning(!isTimerRunning)}
              className="w-9 h-9 rounded-xl bg-red-600 hover:bg-red-500 text-white flex items-center justify-center shadow-md shadow-red-950 transition-colors"
            >
              {isTimerRunning ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-white" />}
            </button>
            <button
              onClick={() => handleSetTimer(60)}
              className="p-2 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 text-zinc-400 hover:text-white"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>
        </div>
      </section>

      {/* EXERCISES GRID */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest">
            SHOWING {filteredExercises.length} EXERCISES
          </span>
          <span className="text-xs font-mono text-zinc-500">
            CLICK CARD FOR ANATOMY & BIOMECHANICS
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {filteredExercises.map((ex) => (
            <div
              key={ex.id}
              onClick={() => setSelectedExercise(ex)}
              className="gym-card p-5 rounded-2xl border border-zinc-800/80 hover:border-red-600/50 transition-all cursor-pointer flex flex-col justify-between group"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-red-400 font-bold">
                      {ex.muscleGroup.toUpperCase()}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">
                      {ex.difficulty}
                    </span>
                  </div>

                  {ex.cameraSupported && (
                    <span className="inline-flex items-center gap-1 text-[9px] font-mono px-2 py-0.5 rounded-full bg-red-600/20 text-red-400 border border-red-500/40">
                      <Camera className="w-3 h-3" /> AI CAMERA
                    </span>
                  )}
                </div>

                <h3 className="font-heading text-xl font-bold text-white group-hover:text-red-400 transition-colors">
                  {ex.name}
                </h3>

                <p className="text-xs text-zinc-400 mt-1 line-clamp-2">
                  <strong className="text-zinc-300">Target:</strong> {ex.targetMuscle}
                </p>

                <div className="mt-3 flex flex-wrap gap-1.5 text-[11px] font-mono text-zinc-500">
                  <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800/80">
                    {ex.suggestedSets} Sets × {ex.suggestedReps}
                  </span>
                  <span className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800/80">
                    Rest: {ex.restSeconds}s
                  </span>
                </div>
              </div>

              <div className="mt-5 pt-4 border-t border-zinc-800/60 flex items-center justify-between">
                <span className="text-xs font-semibold text-zinc-400 group-hover:text-white flex items-center gap-1">
                  Full Guide <ChevronRight className="w-3.5 h-3.5" />
                </span>

                {ex.cameraSupported && (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onStartAiTrainer(ex.id);
                    }}
                    className="px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-500 text-white text-xs font-bold font-heading tracking-wider flex items-center gap-1.5 shadow-md shadow-red-950 transition-colors"
                  >
                    <Camera className="w-3.5 h-3.5" /> Launch AI Track
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* EXERCISE DETAIL MODAL */}
      {selectedExercise && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-black/90 backdrop-blur-md overflow-y-auto animate-in fade-in duration-150">
          <div className="relative w-full max-w-2xl bg-zinc-950 border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-red-950/40 my-6">
            
            <button
              onClick={() => setSelectedExercise(null)}
              className="absolute top-5 right-5 p-2 rounded-xl text-zinc-500 hover:text-white hover:bg-zinc-800/80"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-2 mb-2">
              <span className="text-[10px] font-mono uppercase px-2 py-0.5 rounded bg-red-950/60 border border-red-800/60 text-red-400 font-bold">
                {selectedExercise.muscleGroup.toUpperCase()} • {selectedExercise.difficulty.toUpperCase()}
              </span>
              {selectedExercise.cameraSupported && (
                <span className="text-[10px] font-mono text-emerald-400">
                  ✓ Compatible with IronVault AI Camera
                </span>
              )}
            </div>

            <h2 className="font-heading text-2xl sm:text-3xl font-black text-white">
              {selectedExercise.name}
            </h2>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 mt-4 text-center">
              <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">SUGGESTED SETS</span>
                <div className="text-sm font-bold text-white font-mono mt-0.5">{selectedExercise.suggestedSets} Sets</div>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">TARGET REPS</span>
                <div className="text-sm font-bold text-white font-mono mt-0.5">{selectedExercise.suggestedReps}</div>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">REST INTERVAL</span>
                <div className="text-sm font-bold text-white font-mono mt-0.5">{selectedExercise.restSeconds}s</div>
              </div>
              <div className="p-2.5 rounded-xl bg-zinc-900 border border-zinc-800">
                <span className="text-[10px] font-mono text-zinc-500 uppercase">RECOVERY WINDOW</span>
                <div className="text-sm font-bold text-white font-mono mt-0.5">{selectedExercise.recoveryHours} Hours</div>
              </div>
            </div>

            {/* Step-by-Step Instructions */}
            <div className="mt-5 space-y-2">
              <h4 className="text-xs font-mono uppercase text-zinc-400 tracking-wider">
                EXECUTION PROTOCOL (STEP-BY-STEP)
              </h4>
              <ol className="space-y-1.5 text-xs text-zinc-300">
                {selectedExercise.instructions.map((step, idx) => (
                  <li key={idx} className="flex items-start gap-2">
                    <span className="font-mono text-red-500 font-bold shrink-0">{idx + 1}.</span>
                    <span>{step}</span>
                  </li>
                ))}
              </ol>
            </div>

            {/* Breathing & Common Mistakes */}
            <div className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                <span className="font-bold text-white flex items-center gap-1.5 text-[11px] font-mono uppercase text-amber-400">
                  BREATHING GUIDE
                </span>
                <p className="text-zinc-300">{selectedExercise.breathingGuide}</p>
              </div>

              <div className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800 space-y-1">
                <span className="font-bold text-white flex items-center gap-1.5 text-[11px] font-mono uppercase text-rose-400">
                  COMMON MISTAKES
                </span>
                <ul className="space-y-0.5 text-zinc-300">
                  {selectedExercise.commonMistakes.map((m, i) => (
                    <li key={i}>• {m}</li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Variations & Safety */}
            <div className="mt-4 p-3 rounded-xl bg-zinc-900/40 border border-zinc-800 space-y-1 text-xs">
              <div className="flex flex-wrap gap-4 text-zinc-400">
                <span><strong>Easier:</strong> {selectedExercise.easierVariation}</span>
                <span><strong>Harder:</strong> {selectedExercise.harderVariation}</span>
              </div>
              <p className="text-[11px] text-zinc-500 pt-1">
                <strong>Safety:</strong> {selectedExercise.safetyNotes}
              </p>
            </div>

            <div className="mt-6 flex items-center justify-between">
              <button
                onClick={() => setSelectedExercise(null)}
                className="px-4 py-2 rounded-xl border border-zinc-800 text-xs font-mono text-zinc-400 hover:text-white"
              >
                Close
              </button>

              {selectedExercise.cameraSupported && (
                <button
                  onClick={() => {
                    const exId = selectedExercise.id;
                    setSelectedExercise(null);
                    onStartAiTrainer(exId);
                  }}
                  className="px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-heading font-black tracking-widest text-sm flex items-center gap-2 shadow-lg shadow-red-950"
                >
                  <Camera className="w-4 h-4" /> START AI CAMERA SESSION
                </button>
              )}
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
