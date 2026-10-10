import React, { useState } from 'react';
import { 
  Heart, 
  Activity, 
  Moon, 
  Clock, 
  Sparkles, 
  CheckCircle2, 
  AlertCircle, 
  Apple, 
  Droplet,
  Flame
} from 'lucide-react';
import { MUSCLE_RECOVERY_MATRIX } from '../data/recoveryData';
import { DailyTracking } from '../types';

interface RecoveryMatrixViewProps {
  dailyTracking: DailyTracking;
  onUpdateTracking: (tracking: DailyTracking) => void;
}

export const RecoveryMatrixView: React.FC<RecoveryMatrixViewProps> = ({
  dailyTracking,
  onUpdateTracking
}) => {
  const [sleepHours, setSleepHours] = useState<number>(dailyTracking.sleepHours || 7.5);
  const [sorenessScore, setSorenessScore] = useState<number>(dailyTracking.sorenessScore || 4);
  const [savedNotice, setSavedNotice] = useState<boolean>(false);

  const handleSaveRecoveryStats = () => {
    onUpdateTracking({
      ...dailyTracking,
      sleepHours,
      sorenessScore
    });
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const getReadinessRecommendation = () => {
    if (sorenessScore >= 8 || sleepHours < 6) {
      return {
        status: 'HIGH SYSTEMIC FATIGUE — MANDATORY ACTIVE REST',
        color: 'text-rose-400',
        bg: 'bg-rose-950/40 border-rose-800',
        desc: 'Your central nervous system and myofibrillar repair need down-time. Prioritize hydration, contrast therapy, 8+ hours sleep, and clean protein.'
      };
    }
    if (sorenessScore >= 5) {
      return {
        status: 'MODERATE FATIGUE — ROTATE MUSCLE GROUPS',
        color: 'text-amber-400',
        bg: 'bg-amber-950/40 border-amber-800',
        desc: 'Train opposing muscle groups or lower systemic loading. Avoid repeating the same kinetic chain.'
      };
    }
    return {
      status: 'PRIME ANABOLIC RECOVERY — READY TO SMASH HEAVY IRON',
      color: 'text-emerald-400',
      bg: 'bg-emerald-950/40 border-emerald-800',
      desc: 'Optimal glycogen synthesis and tissue recovery. You are clear for progressive overload today.'
    };
  };

  const readiness = getReadinessRecommendation();

  return (
    <div className="space-y-8 pb-16">
      
      {/* HEADER SECTION matching Screenshot 2 */}
      <section className="relative overflow-hidden rounded-3xl gym-card border border-zinc-800/80 p-6 sm:p-10">
        
        {/* Kicker */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-cyan-400 font-bold mb-2">
          <Heart className="w-4 h-4 text-cyan-400" />
          CELLULAR REMODELING & ANABOLIC SUPERCOMPENSATION
        </div>

        <h1 className="font-heading text-4xl sm:text-6xl font-black tracking-tight text-white uppercase leading-none">
          MUSCLE RECOVERY & <br className="sm:hidden" />
          <span className="text-cyan-400">REPAIR FOODS</span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-3xl leading-relaxed">
          Training tears muscle fibers (actin and myosin micro-lesions); rest and precise nutrition rebuild them thicker and denser. Review exact recovery timelines (24 to 96 hours) for every major muscle group paired with optimal repair foods.
        </p>

        {/* Readiness Banner */}
        <div className={`mt-6 p-4 rounded-2xl border ${readiness.bg} flex flex-col sm:flex-row sm:items-center justify-between gap-3`}>
          <div>
            <span className={`text-xs font-mono font-black uppercase tracking-wider ${readiness.color} block`}>
              {readiness.status}
            </span>
            <p className="text-xs text-zinc-300 mt-1 max-w-xl">
              {readiness.desc}
            </p>
          </div>
        </div>

      </section>

      {/* SLEEP & SORENESS LOGGER SECTION */}
      <section className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
              PHYSIOLOGICAL RECOVERY AUDIT
            </span>
            <h2 className="font-heading text-2xl font-black text-white">
              DAILY RECOVERY METRICS
            </h2>
          </div>

          {savedNotice && (
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4" /> Logged!
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {/* Sleep hours slider */}
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Moon className="w-4 h-4 text-cyan-400" /> SLEEP DURATION LAST NIGHT
              </span>
              <span className="font-mono text-sm font-black text-cyan-400">
                {sleepHours} Hours
              </span>
            </div>
            <input
              type="range"
              min="4"
              max="11"
              step="0.5"
              value={sleepHours}
              onChange={(e) => setSleepHours(Number(e.target.value))}
              className="w-full accent-cyan-400 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-zinc-500">
              <span>4h (Deficit)</span>
              <span>7.5h - 8.5h (Optimal GH Window)</span>
              <span>11h</span>
            </div>
          </div>

          {/* Soreness slider */}
          <div className="p-4 rounded-2xl bg-zinc-900 border border-zinc-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-white flex items-center gap-2">
                <Activity className="w-4 h-4 text-rose-400" /> SORENESS & CNS FATIGUE
              </span>
              <span className="font-mono text-sm font-black text-rose-400">
                Level {sorenessScore} / 10
              </span>
            </div>
            <input
              type="range"
              min="1"
              max="10"
              value={sorenessScore}
              onChange={(e) => setSorenessScore(Number(e.target.value))}
              className="w-full accent-rose-500 cursor-pointer"
            />
            <div className="flex justify-between text-[10px] font-mono text-zinc-500">
              <span>1 (Fresh)</span>
              <span>5 (Moderate DOMS)</span>
              <span>10 (Severe Exhaustion)</span>
            </div>
          </div>
        </div>

        <div className="flex justify-end pt-2">
          <button
            onClick={handleSaveRecoveryStats}
            className="px-6 py-2.5 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-black font-heading font-black tracking-widest text-xs uppercase shadow-lg cursor-pointer"
          >
            UPDATE RECOVERY LOG
          </button>
        </div>
      </section>

      {/* MUSCLE GROUP RECOVERY MATRIX CARDS matching Screenshot 2 */}
      <section className="space-y-4">
        <div>
          <span className="text-xs font-mono text-zinc-500 uppercase tracking-widest block">
            TISSUE REGENERATION TIMELINES
          </span>
          <h2 className="font-heading text-2xl sm:text-3xl font-black text-white">
            MUSCLE GROUP RECOVERY MATRIX (HOURS & FOOD)
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {MUSCLE_RECOVERY_MATRIX.map((item, idx) => (
            <div
              key={idx}
              className="gym-card p-6 rounded-2xl border border-zinc-800/80 hover:border-cyan-500/40 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center justify-between mb-3">
                  <span className="text-[10px] font-mono uppercase px-2.5 py-0.5 rounded-full bg-cyan-950/60 border border-cyan-800/60 text-cyan-300 font-bold">
                    {item.regenerationSpeed}
                  </span>
                  <span className="text-xs font-mono text-zinc-400">
                    {item.baseRecoveryHours >= 72 ? '3 - 4 Days' : item.baseRecoveryHours >= 48 ? '2 - 3 Days' : '1 - 2 Days'}
                  </span>
                </div>

                <h3 className="font-heading text-xl font-bold text-white uppercase">
                  {item.displayName}
                </h3>

                <div className="mt-3 flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500">Recovery Time:</span>
                  <span className="text-cyan-400 font-bold">{item.baseRecoveryHours} - {item.baseRecoveryHours + 12} Hours</span>
                </div>

                {/* Progress bar matching Screenshot 2 */}
                <div className="w-full h-2 rounded-full bg-zinc-900 mt-2 overflow-hidden border border-zinc-800">
                  <div
                    className="h-full bg-gradient-to-r from-cyan-500 to-blue-600 rounded-full"
                    style={{ width: `${Math.min(100, (item.baseRecoveryHours / 96) * 100)}%` }}
                  />
                </div>
              </div>

              {/* Recommended repair foods */}
              <div className="mt-5 pt-4 border-t border-zinc-800/60 space-y-2">
                <span className="text-[11px] font-mono uppercase text-emerald-400 font-bold flex items-center gap-1.5">
                  <Apple className="w-3.5 h-3.5" /> RECOMMENDED REPAIR FOODS:
                </span>
                <ul className="text-xs text-zinc-300 space-y-1">
                  {item.recommendedRepairFoods.map((food, fIdx) => (
                    <li key={fIdx} className="flex items-start gap-1.5">
                      <span className="text-emerald-500">•</span>
                      <span>{food}</span>
                    </li>
                  ))}
                </ul>
              </div>

            </div>
          ))}
        </div>
      </section>

    </div>
  );
};
