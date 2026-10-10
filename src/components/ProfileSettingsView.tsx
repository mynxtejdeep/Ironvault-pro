import React, { useState } from 'react';
import { 
  User, 
  Settings, 
  Save, 
  Trash2, 
  Download, 
  ShieldCheck, 
  LogOut, 
  CheckCircle2, 
  AlertTriangle,
  RotateCcw
} from 'lucide-react';
import { UserProfile } from '../types';
import { StorageService } from '../services/storage';

interface ProfileSettingsViewProps {
  userProfile: UserProfile | null;
  onUpdateProfile: (profile: UserProfile) => void;
  onLogout: () => void;
  onReopenOnboarding: () => void;
}

export const ProfileSettingsView: React.FC<ProfileSettingsViewProps> = ({
  userProfile,
  onUpdateProfile,
  onLogout,
  onReopenOnboarding
}) => {
  const [name, setName] = useState(userProfile?.name || 'Vinay Vaishnav');
  const [age, setAge] = useState(userProfile?.age || 24);
  const [weight, setWeight] = useState(userProfile?.weight || 76.5);
  const [height, setHeight] = useState(userProfile?.height || 178);
  const [unitSystem, setUnitSystem] = useState<'metric' | 'imperial'>(userProfile?.unitSystem || 'metric');
  const [dietary, setDietary] = useState(userProfile?.dietaryPreference || 'vegetarian');
  const [goal, setGoal] = useState(userProfile?.primaryGoal || 'build_muscle');
  const [savedNotice, setSavedNotice] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userProfile) return;
    const updated: UserProfile = {
      ...userProfile,
      name,
      age,
      weight,
      height,
      unitSystem,
      dietaryPreference: dietary,
      primaryGoal: goal
    };
    StorageService.saveUserProfile(updated);
    onUpdateProfile(updated);
    setSavedNotice(true);
    setTimeout(() => setSavedNotice(false), 2500);
  };

  const handleResetData = () => {
    if (window.confirm('Reset all saved food logs, camera workouts, and tracking history? This action cannot be undone.')) {
      StorageService.resetAllData();
      window.location.reload();
    }
  };

  return (
    <div className="space-y-8 pb-16 max-w-4xl mx-auto">
      
      {/* HEADER */}
      <section className="p-6 sm:p-10 rounded-3xl gym-card border border-zinc-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-red-900 border border-red-500/50 flex items-center justify-center text-white font-heading text-3xl font-black shadow-xl shadow-red-950">
            {name ? name[0].toUpperCase() : 'V'}
          </div>
          <div>
            <span className="text-[10px] font-mono uppercase text-red-500 font-bold tracking-widest block">
              ATHLETE PROFILE & SETTINGS
            </span>
            <h1 className="font-heading text-3xl sm:text-4xl font-black text-white">
              {name}
            </h1>
            <span className="text-xs font-mono text-zinc-400">
              {userProfile?.email || 'athlete@ironvault.pro'} • {goal.replace('_', ' ').toUpperCase()}
            </span>
          </div>
        </div>

        <button
          onClick={onLogout}
          className="px-4 py-2 rounded-xl bg-zinc-900 hover:bg-red-950/60 border border-zinc-800 hover:border-red-800 text-xs font-mono text-zinc-300 hover:text-red-400 flex items-center gap-2 transition-colors cursor-pointer"
        >
          <LogOut className="w-4 h-4" /> Sign Out
        </button>
      </section>

      {/* FORM SECTION */}
      <form onSubmit={handleSave} className="p-6 sm:p-8 rounded-3xl bg-zinc-950 border border-zinc-800 space-y-6">
        <div className="flex items-center justify-between pb-3 border-b border-zinc-800">
          <h3 className="font-heading text-xl font-bold text-white">
            BIOMETRIC & PREFERENCE CUSTOMIZATION
          </h3>
          {savedNotice && (
            <span className="text-xs font-mono text-emerald-400 flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4" /> Profile Updated!
            </span>
          )}
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">Athlete Name</label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
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
            <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">Current Bodyweight (kg)</label>
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
            <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">Dietary Paradigm</label>
            <select
              value={dietary}
              onChange={(e) => setDietary(e.target.value as any)}
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500 font-mono"
            >
              <option value="vegetarian">Vegetarian (Indian Paneer, Dal, Soya)</option>
              <option value="eggetarian">Eggetarian (Dairy + Eggs)</option>
              <option value="non-vegetarian">Non-Vegetarian (Chicken, Fish, Eggs)</option>
              <option value="vegan">Vegan (100% Plant-Based)</option>
            </select>
          </div>

          <div>
            <label className="block text-[11px] font-mono text-zinc-400 uppercase mb-1">Primary Goal Focus</label>
            <select
              value={goal}
              onChange={(e) => setGoal(e.target.value as any)}
              className="w-full px-3.5 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white focus:outline-none focus:border-red-500 font-mono"
            >
              <option value="build_muscle">Build Muscle (Hypertrophy)</option>
              <option value="lose_fat">Lose Body Fat (Cutting)</option>
              <option value="gain_weight">Mass Gain (Bulking)</option>
              <option value="lean_athletic">Lean & Athletic</option>
              <option value="strength">Peak Strength</option>
              <option value="maintain">Maintain Current Mass</option>
            </select>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-zinc-800">
          <button
            type="button"
            onClick={onReopenOnboarding}
            className="text-xs font-mono text-zinc-400 hover:text-white flex items-center gap-1.5"
          >
            <RotateCcw className="w-3.5 h-3.5" /> Re-run Complete Assessment Flow
          </button>

          <button
            type="submit"
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-red-600 hover:bg-red-500 text-white font-heading font-black tracking-widest text-xs uppercase flex items-center justify-center gap-2 shadow-lg shadow-red-950 cursor-pointer"
          >
            <Save className="w-4 h-4" /> SAVE CHANGES
          </button>
        </div>
      </form>

      {/* DANGER ZONE & PRIVACY */}
      <section className="p-6 rounded-3xl bg-zinc-950 border border-red-950/60 space-y-4">
        <h4 className="font-heading text-lg font-bold text-red-400">
          DATA MANAGEMENT & PRIVACY
        </h4>
        <p className="text-xs text-zinc-400 leading-relaxed">
          IronVault Pro stores your biometric parameters and camera training history locally in your browser. Raw camera feeds are never stored or uploaded. You may purge cached workout sessions and food logs at any time.
        </p>

        <div className="pt-2">
          <button
            type="button"
            onClick={handleResetData}
            className="px-4 py-2 rounded-xl bg-red-950/40 hover:bg-red-950 border border-red-800/80 text-xs font-mono text-red-300 hover:text-red-200 flex items-center gap-2 transition-colors cursor-pointer"
          >
            <Trash2 className="w-4 h-4" /> Reset All Local History & Telemetry
          </button>
        </div>
      </section>

    </div>
  );
};
