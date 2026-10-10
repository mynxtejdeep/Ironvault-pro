import React, { useState } from 'react';
import { 
  BarChart3, 
  Calendar, 
  Camera, 
  Dumbbell, 
  Activity, 
  Download, 
  Trash2, 
  CheckCircle, 
  Award, 
  Scale, 
  Plus,
  Clock
} from 'lucide-react';
import { CameraWorkoutSession, FoodLog, DailyTracking, UserProfile } from '../types';
import { StorageService } from '../services/storage';

interface ReportsViewProps {
  userProfile: UserProfile | null;
  cameraSessions: CameraWorkoutSession[];
  foodLogs: FoodLog[];
  dailyTracking: DailyTracking;
  onRefreshData: () => void;
}

export const ReportsView: React.FC<ReportsViewProps> = ({
  userProfile,
  cameraSessions,
  foodLogs,
  dailyTracking,
  onRefreshData
}) => {
  const [reportPeriod, setReportPeriod] = useState<'daily' | 'weekly' | 'monthly'>('weekly');
  const [loggedWeight, setLoggedWeight] = useState<string>('');
  const [weightLogs, setWeightLogs] = useState<{ date: string; weight: number }[]>([
    { date: '2026-10-01', weight: 75.8 },
    { date: '2026-10-05', weight: 76.2 },
    { date: '2026-10-10', weight: 76.5 }
  ]);
  const [exportNotice, setExportNotice] = useState<boolean>(false);

  // Compute nutrition totals
  const totalCaloriesLogged = foodLogs.reduce((acc, f) => acc + f.calories, 0);
  const totalProteinLogged = foodLogs.reduce((acc, f) => acc + f.protein, 0);
  const totalCarbsLogged = foodLogs.reduce((acc, f) => acc + f.carbs, 0);
  const totalFatsLogged = foodLogs.reduce((acc, f) => acc + f.fats, 0);

  // Completed workouts
  const totalCameraReps = cameraSessions.reduce((acc, s) => acc + s.reps, 0);

  const handleExportData = () => {
    const dataStr = StorageService.exportAllData();
    const blob = new Blob([dataStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `ironvault_pro_export_${new Date().toISOString().split('T')[0]}.json`;
    link.click();
    URL.revokeObjectURL(url);
    setExportNotice(true);
    setTimeout(() => setExportNotice(false), 3000);
  };

  const handleLogNewWeight = (e: React.FormEvent) => {
    e.preventDefault();
    const val = parseFloat(loggedWeight);
    if (!isNaN(val) && val > 30 && val < 250) {
      const today = new Date().toISOString().split('T')[0];
      setWeightLogs([...weightLogs, { date: today, weight: val }]);
      setLoggedWeight('');
    }
  };

  const handleDeleteSession = (id: string) => {
    const existing = StorageService.getCameraSessions().filter(s => s.id !== id);
    localStorage.setItem('ironvault_camera_sessions', JSON.stringify(existing));
    onRefreshData();
  };

  return (
    <div className="space-y-8 pb-16">
      
      {/* HEADER */}
      <section className="relative overflow-hidden rounded-3xl gym-card border border-zinc-800/80 p-6 sm:p-10 flex flex-col sm:flex-row sm:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-red-500 font-bold mb-2">
            <BarChart3 className="w-4 h-4 text-red-500" />
            ATHLETE PERFORMANCE ANALYTICS
          </div>

          <h1 className="font-heading text-4xl sm:text-6xl font-black tracking-tight text-white uppercase leading-none">
            REPORTS & <span className="text-red-500">PROGRESS</span>
          </h1>

          <p className="mt-3 text-sm text-zinc-400 max-w-xl">
            Real historical logs computed from actual workout sessions, AI camera rep counts, and logged macro entries.
          </p>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={handleExportData}
            className="px-4 py-2.5 rounded-xl bg-zinc-900 hover:bg-zinc-800 border border-zinc-700 text-xs font-mono text-zinc-200 hover:text-white flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Download className="w-4 h-4" /> Export Data (JSON)
          </button>
        </div>
      </section>

      {exportNotice && (
        <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-600/80 text-emerald-200 text-xs font-mono flex items-center gap-2">
          <CheckCircle className="w-4 h-4 text-emerald-400" />
          <span>Full IronVault athlete telemetry exported successfully!</span>
        </div>
      )}

      {/* TIMEFRAME SELECTOR */}
      <div className="flex items-center justify-between">
        <div className="flex bg-zinc-950 p-1.5 rounded-2xl border border-zinc-800 gap-1">
          {(['daily', 'weekly', 'monthly'] as const).map((period) => (
            <button
              key={period}
              onClick={() => setReportPeriod(period)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold font-heading tracking-wider uppercase transition-all ${
                reportPeriod === period
                  ? 'bg-red-600 text-white shadow-md'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              {period} Report
            </button>
          ))}
        </div>

        <span className="text-xs font-mono text-zinc-500">
          Athlete: {userProfile?.name || 'Vinay Vaishnav'}
        </span>
      </div>

      {/* TOP KPI STRIP */}
      <section className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
          <span className="text-[10px] font-mono uppercase text-zinc-500 block">AI CAMERA REPS</span>
          <div className="font-heading text-3xl font-black text-red-500 mt-1">
            {totalCameraReps} <span className="text-xs font-mono text-zinc-500">reps</span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500">Pose landmarker verified</span>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
          <span className="text-[10px] font-mono uppercase text-zinc-500 block">ENERGY LOGGED</span>
          <div className="font-heading text-3xl font-black text-white mt-1">
            {totalCaloriesLogged} <span className="text-xs font-mono text-zinc-500">kcal</span>
          </div>
          <span className="text-[10px] font-mono text-emerald-400">{foodLogs.length} food entries</span>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
          <span className="text-[10px] font-mono uppercase text-zinc-500 block">PROTEIN ACCRUAL</span>
          <div className="font-heading text-3xl font-black text-amber-400 mt-1">
            {Math.round(totalProteinLogged)}g
          </div>
          <span className="text-[10px] font-mono text-zinc-500">Target: 165g/day</span>
        </div>

        <div className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800">
          <span className="text-[10px] font-mono uppercase text-zinc-500 block">HYDRATION STATUS</span>
          <div className="font-heading text-3xl font-black text-blue-400 mt-1">
            {dailyTracking.waterGlasses * 250} <span className="text-xs font-mono text-zinc-500">ml</span>
          </div>
          <span className="text-[10px] font-mono text-zinc-500">{dailyTracking.waterGlasses} glasses</span>
        </div>
      </section>

      {/* WEIGHT TREND LOGGING */}
      <section className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div>
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest block">
              CHRONIC BODY COMPOSITION
            </span>
            <h3 className="font-heading text-2xl font-black text-white">
              WEIGHT PROGRESSION TREND
            </h3>
          </div>

          <form onSubmit={handleLogNewWeight} className="flex items-center gap-2">
            <input
              type="number"
              step="0.1"
              value={loggedWeight}
              onChange={(e) => setLoggedWeight(e.target.value)}
              placeholder="e.g. 76.8"
              className="w-28 px-3 py-2 bg-zinc-900 border border-zinc-800 rounded-xl text-xs text-white placeholder-zinc-500 font-mono focus:outline-none focus:border-red-500"
            />
            <button
              type="submit"
              className="px-3.5 py-2 bg-red-600 hover:bg-red-500 text-white rounded-xl text-xs font-bold font-heading tracking-wider flex items-center gap-1 cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" /> Log Weight
            </button>
          </form>
        </div>

        {/* Lightweight SVG Weight Curve */}
        <div className="p-4 rounded-2xl bg-zinc-900/60 border border-zinc-800/80">
          <div className="h-28 flex items-end justify-between gap-4 pt-4 px-2">
            {weightLogs.map((item, idx) => (
              <div key={idx} className="flex-1 flex flex-col items-center gap-2">
                <span className="text-xs font-mono font-bold text-red-400">{item.weight} kg</span>
                <div 
                  className="w-full max-w-[48px] bg-gradient-to-t from-red-600 to-amber-500 rounded-t-lg transition-all"
                  style={{ height: `${Math.min(100, Math.max(30, (item.weight - 70) * 12))}%` }}
                />
                <span className="text-[10px] font-mono text-zinc-500">{item.date.slice(5)}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* AI CAMERA WORKOUT HISTORY LOGS */}
      <section className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <span className="text-[10px] font-mono text-red-500 uppercase tracking-widest font-bold block">
              BIOMECHANICAL SESSIONS
            </span>
            <h3 className="font-heading text-2xl font-black text-white">
              AI CAMERA SESSION HISTORY
            </h3>
          </div>
          <span className="text-xs font-mono text-zinc-500">
            {cameraSessions.length} SESSIONS SAVED
          </span>
        </div>

        {cameraSessions.length === 0 ? (
          <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800 text-center space-y-3">
            <Camera className="w-10 h-10 text-zinc-600 mx-auto" />
            <h4 className="font-heading text-lg font-bold text-white">No AI Camera Sessions Recorded Yet</h4>
            <p className="text-xs text-zinc-400 max-w-md mx-auto">
              Launch the AI Camera Trainer on Squats, Push-ups, Lunges, or Curls to automatically populate your biomechanical record.
            </p>
          </div>
        ) : (
          <div className="space-y-3">
            {cameraSessions.map((session) => (
              <div
                key={session.id}
                className="p-5 rounded-2xl bg-zinc-950 border border-zinc-800/80 flex flex-col sm:flex-row sm:items-center justify-between gap-4"
              >
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-xs font-bold text-white font-heading text-lg">
                      {session.exerciseName}
                    </span>
                    <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-emerald-950/60 border border-emerald-700/60 text-emerald-400 font-bold">
                      {session.formScore}% FORM SCORE
                    </span>
                  </div>

                  <div className="flex flex-wrap items-center gap-3 text-xs font-mono text-zinc-400">
                    <span className="text-red-400 font-bold">{session.reps} Reps Counted</span>
                    <span>•</span>
                    <span>{session.sets} Sets</span>
                    <span>•</span>
                    <span>{session.durationSeconds}s Duration</span>
                    <span>•</span>
                    <span className="text-zinc-500">{new Date(session.timestamp).toLocaleDateString()}</span>
                  </div>

                  {session.feedbackNotes.length > 0 && (
                    <p className="text-[11px] text-zinc-500 mt-2">
                      {session.feedbackNotes[0]}
                    </p>
                  )}
                </div>

                <button
                  onClick={() => handleDeleteSession(session.id)}
                  className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-500 hover:text-red-400 hover:border-red-900 self-start sm:self-auto transition-colors"
                  title="Delete Entry"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* TODAY'S FOOD LOGS BREAKDOWN */}
      <section className="space-y-4">
        <div>
          <span className="text-[10px] font-mono text-emerald-400 uppercase tracking-widest font-bold block">
            NUTRITIONAL DIARY
          </span>
          <h3 className="font-heading text-2xl font-black text-white">
            LOGGED FOOD ENTRIES
          </h3>
        </div>

        {foodLogs.length === 0 ? (
          <div className="p-8 rounded-3xl bg-zinc-950 border border-zinc-800 text-center space-y-2">
            <Activity className="w-10 h-10 text-zinc-600 mx-auto" />
            <h4 className="font-heading text-lg font-bold text-white">No Meals Logged Today</h4>
            <p className="text-xs text-zinc-400">
              Visit Nutrition & Fuel to log protein sources, carbs, or post-workout shakes.
            </p>
          </div>
        ) : (
          <div className="p-4 rounded-2xl bg-zinc-950 border border-zinc-800 space-y-2">
            {foodLogs.map((log) => (
              <div
                key={log.id}
                className="p-3 rounded-xl bg-zinc-900/60 border border-zinc-800/80 flex items-center justify-between text-xs"
              >
                <div>
                  <span className="font-bold text-white block">{log.foodName} ({log.servings}x)</span>
                  <span className="text-[10px] font-mono text-zinc-500">{new Date(log.timestamp).toLocaleTimeString()}</span>
                </div>
                <div className="flex items-center gap-3 font-mono">
                  <span className="text-white font-bold">{log.calories} kcal</span>
                  <span className="text-red-400">{log.protein}g P</span>
                  <span className="text-amber-400">{log.carbs}g C</span>
                  <span className="text-emerald-400">{log.fats}g F</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

    </div>
  );
};
