import React, { useState } from 'react';
import { 
  Calendar, 
  Flame, 
  Sparkles, 
  Clock, 
  ChevronDown, 
  ChevronUp, 
  Dumbbell, 
  Check, 
  Award,
  ArrowRight
} from 'lucide-react';
import { BODYBUILDER_SPLITS } from '../data/splitsData';
import { BodybuilderSplit } from '../types';

export const SplitsView: React.FC = () => {
  const [trainingPhase, setTrainingPhase] = useState<'bulking' | 'cutting'>('bulking');
  const [selectedSplitId, setSelectedSplitId] = useState<string>(BODYBUILDER_SPLITS[0].id);
  const [expandedDayIndex, setExpandedDayIndex] = useState<number>(0);

  const filteredSplits = BODYBUILDER_SPLITS.filter(s => s.phase === trainingPhase);
  const currentSplit = filteredSplits.find(s => s.id === selectedSplitId) || filteredSplits[0] || BODYBUILDER_SPLITS[0];

  return (
    <div className="space-y-8 pb-16">
      
      {/* HEADER matching Screenshot 5 */}
      <section className="relative overflow-hidden rounded-3xl gym-card border border-zinc-800/80 p-6 sm:p-10">
        
        {/* Kicker */}
        <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-amber-500 font-bold mb-2">
          <Calendar className="w-4 h-4 text-amber-500" />
          MASTER PERIODIZATION & HIGH-CALIBER ROUTINES
        </div>

        <h1 className="font-heading text-4xl sm:text-6xl font-black tracking-tight text-white uppercase leading-none">
          FAMOUS <br className="sm:hidden" />
          BODYBUILDER <span className="text-amber-500">SPLITS</span>
        </h1>

        <p className="mt-4 text-sm sm:text-base text-zinc-400 max-w-3xl leading-relaxed">
          Direct training protocols from legends of the sport. Formatted separately for mass-building <strong className="text-amber-400">Bulking Protocols</strong> (progressive mechanical overload with caloric surplus) and razor-sharp <strong className="text-rose-400">Cutting Protocols</strong> (density training with low systemic fatigue).
        </p>

        {/* Phase Selector matching Screenshot 5 */}
        <div className="mt-8 pt-6 border-t border-zinc-800/80 space-y-3">
          <span className="text-[11px] font-mono text-zinc-400 uppercase tracking-wider block">
            SELECT TRAINING PHASE
          </span>

          <div className="inline-flex p-1.5 rounded-2xl bg-zinc-950 border border-zinc-800 gap-2">
            <button
              onClick={() => {
                setTrainingPhase('bulking');
                const first = BODYBUILDER_SPLITS.find(s => s.phase === 'bulking');
                if (first) setSelectedSplitId(first.id);
              }}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-heading font-black tracking-widest flex items-center gap-2 transition-all cursor-pointer ${
                trainingPhase === 'bulking'
                  ? 'bg-gradient-to-r from-amber-600 to-red-600 text-white shadow-xl shadow-amber-950/60 ring-1 ring-amber-500'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Flame className="w-4 h-4 fill-amber-400 text-amber-400" />
              BULKING SPLITS (MASS HYPERTROPHY)
            </button>

            <button
              onClick={() => {
                setTrainingPhase('cutting');
                const first = BODYBUILDER_SPLITS.find(s => s.phase === 'cutting');
                if (first) setSelectedSplitId(first.id);
              }}
              className={`px-5 py-3 rounded-xl text-xs sm:text-sm font-heading font-black tracking-widest flex items-center gap-2 transition-all cursor-pointer ${
                trainingPhase === 'cutting'
                  ? 'bg-gradient-to-r from-rose-600 to-red-600 text-white shadow-xl shadow-rose-950/60 ring-1 ring-rose-500'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              <Sparkles className="w-4 h-4 text-rose-400" />
              CUTTING SPLITS (LEAN DENSITY)
            </button>
          </div>
        </div>

      </section>

      {/* ATHLETE LEGEND CARDS SELECTOR */}
      <section className="space-y-4">
        <span className="text-xs font-mono text-zinc-400 uppercase tracking-widest block">
          CHOOSE ATHLETE ROUTINE
        </span>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredSplits.map((split) => {
            const isSelected = split.id === currentSplit.id;
            return (
              <div
                key={split.id}
                onClick={() => {
                  setSelectedSplitId(split.id);
                  setExpandedDayIndex(0);
                }}
                className={`p-6 rounded-2xl border transition-all cursor-pointer flex flex-col justify-between ${
                  isSelected
                    ? 'bg-gradient-to-b from-zinc-900 to-zinc-950 border-amber-500/80 shadow-xl shadow-amber-950/30 ring-1 ring-amber-500'
                    : 'gym-card border-zinc-800/80 hover:border-zinc-700'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className="text-[10px] font-mono text-amber-400 uppercase font-bold px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800">
                      {split.legend}
                    </span>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase">
                      {split.daysPerWeek} DAYS / WK
                    </span>
                  </div>

                  <h3 className="font-heading text-xl font-bold text-white mt-1">
                    {split.name}
                  </h3>

                  <p className="text-xs text-zinc-400 mt-2 line-clamp-2">
                    {split.philosophy}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-zinc-800/60 flex items-center justify-between text-xs font-mono">
                  <span className="text-zinc-500">{split.frequencyType}</span>
                  <span className={`font-bold ${isSelected ? 'text-amber-400' : 'text-zinc-400'}`}>
                    {isSelected ? 'ACTIVE PROTOCOL ✓' : 'Inspect Split →'}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* SELECTED SPLIT FULL SCHEDULE BREAKDOWN */}
      {currentSplit && (
        <section className="space-y-4 p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b border-zinc-800">
            <div>
              <span className="text-[10px] font-mono text-amber-500 uppercase tracking-widest font-bold">
                WEEKLY BLUEPRINT
              </span>
              <h2 className="font-heading text-2xl sm:text-3xl font-black text-white">
                {currentSplit.name}
              </h2>
            </div>
            <div className="text-xs font-mono text-zinc-400 bg-zinc-900 px-3 py-1.5 rounded-xl border border-zinc-800 self-start sm:self-auto">
              {currentSplit.frequencyType}
            </div>
          </div>

          <p className="text-xs sm:text-sm text-zinc-300 bg-zinc-900/60 p-4 rounded-2xl border border-zinc-800/80 leading-relaxed">
            <strong className="text-amber-400">Biomechanics & Philosophy:</strong> {currentSplit.philosophy}
          </p>

          {/* Daily Schedule Tabs */}
          <div className="space-y-3 pt-2">
            {currentSplit.days.map((day, idx) => {
              const isExpanded = expandedDayIndex === idx;
              return (
                <div
                  key={idx}
                  className="rounded-2xl border border-zinc-800/80 bg-zinc-900/60 overflow-hidden transition-all"
                >
                  <button
                    onClick={() => setExpandedDayIndex(isExpanded ? -1 : idx)}
                    className="w-full p-4 flex items-center justify-between text-left hover:bg-zinc-800/40 transition-colors"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-8 h-8 rounded-xl bg-zinc-900 border border-zinc-800 flex items-center justify-center font-mono text-xs font-bold text-amber-400">
                        D{idx + 1}
                      </div>
                      <div>
                        <span className="text-[10px] font-mono uppercase text-zinc-500 block">
                          {day.dayLabel}
                        </span>
                        <h4 className="font-heading text-lg font-bold text-white">
                          {day.focus}
                        </h4>
                      </div>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-mono text-zinc-400 hidden sm:inline">
                        {day.exercises.length} Movements
                      </span>
                      {isExpanded ? <ChevronUp className="w-4 h-4 text-zinc-400" /> : <ChevronDown className="w-4 h-4 text-zinc-400" />}
                    </div>
                  </button>

                  {/* Expanded Exercises */}
                  {isExpanded && (
                    <div className="p-4 pt-0 space-y-2.5 border-t border-zinc-800/60 mt-1">
                      {day.exercises.map((ex, exIdx) => (
                        <div
                          key={exIdx}
                          className="p-3.5 rounded-xl bg-zinc-950/80 border border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs"
                        >
                          <div>
                            <span className="font-bold text-white text-sm block">
                              {ex.name}
                            </span>
                            <span className="text-[11px] text-zinc-400 mt-0.5 block">
                              {ex.notes}
                            </span>
                          </div>

                          <div className="flex items-center gap-3 shrink-0 font-mono text-[11px]">
                            <span className="px-2.5 py-1 rounded bg-zinc-900 text-amber-400 font-bold border border-zinc-800">
                              {ex.sets}
                            </span>
                            <span className="px-2.5 py-1 rounded bg-zinc-900 text-zinc-300 border border-zinc-800">
                              {ex.reps}
                            </span>
                            <span className="px-2 py-1 rounded bg-zinc-900 text-zinc-500 border border-zinc-800">
                              Rest: {ex.rest}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}

                </div>
              );
            })}
          </div>

        </section>
      )}

    </div>
  );
};
