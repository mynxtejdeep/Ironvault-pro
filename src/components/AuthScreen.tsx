import React, { useState } from 'react';
import { 
  Dumbbell, 
  Lock, 
  Mail, 
  User, 
  Eye, 
  EyeOff, 
  ArrowRight, 
  ShieldCheck, 
  Flame, 
  Sparkles, 
  AlertCircle, 
  CheckCircle2, 
  Calendar,
  Activity,
  Award
} from 'lucide-react';
import { StorageService, AuthAccount } from '../services/storage';

interface AuthScreenProps {
  onAuthSuccess: (user: AuthAccount, isNewRegistration: boolean) => void;
}

export const AuthScreen: React.FC<AuthScreenProps> = ({ onAuthSuccess }) => {
  const [tab, setTab] = useState<'signin' | 'register' | 'forgot'>('signin');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);
    setInfoMessage(null);

    if (tab === 'forgot') {
      if (!email.trim() || !email.includes('@')) {
        setErrorMessage('Please provide a valid athlete email address.');
        return;
      }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setInfoMessage(`Password reset link dispatched to ${email}. Check your inbox.`);
      }, 600);
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setErrorMessage('Please provide a valid athlete email address.');
      return;
    }

    if (password.length < 6) {
      setErrorMessage('Password must be at least 6 characters long.');
      return;
    }

    if (tab === 'register') {
      if (!name.trim()) {
        setErrorMessage('Please enter your full name or athlete handle.');
        return;
      }
      if (password !== confirmPassword) {
        setErrorMessage('Passwords do not match. Please verify.');
        return;
      }

      setLoading(true);
      setTimeout(() => {
        const res = StorageService.registerUser(name, email, password);
        setLoading(false);
        if (res.success && res.user) {
          onAuthSuccess(res.user, true); // new registration -> goes to onboarding
        } else {
          setErrorMessage(res.error || 'Failed to register account.');
        }
      }, 500);
    } else {
      setLoading(true);
      setTimeout(() => {
        const res = StorageService.loginUser(email, password);
        setLoading(false);
        if (res.success && res.user) {
          onAuthSuccess(res.user, false); // existing user -> goes to dashboard
        } else {
          setErrorMessage(res.error || 'Invalid credentials.');
        }
      }, 500);
    }
  };

  const handleDemoSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      const demoUser = StorageService.loginAsDemo();
      setLoading(false);
      onAuthSuccess(demoUser, false);
    }, 400);
  };

  return (
    <div className="min-h-screen w-full bg-black flex flex-col justify-between gym-carbon-bg text-slate-100 px-4 py-8 sm:py-12 relative overflow-hidden">
      
      {/* Background ambient lighting */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-red-600/15 blur-[120px] pointer-events-none rounded-full"></div>
      <div className="absolute -bottom-20 right-0 w-[400px] h-[300px] bg-amber-600/10 blur-[100px] pointer-events-none rounded-full"></div>

      {/* Top Brand Bar */}
      <div className="max-w-6xl mx-auto w-full flex items-center justify-between mb-8 z-10">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-zinc-900 border border-red-900/60 flex items-center justify-center shadow-xl shadow-red-950/60">
            <Dumbbell className="w-6 h-6 text-red-500" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-brand text-2xl font-black tracking-wider text-white">
                IRON<span className="text-red-500">VAULT</span>
              </span>
              <span className="text-[10px] font-bold font-mono tracking-widest px-1.5 py-0.5 rounded-full border border-red-500/50 text-red-400 bg-red-950/40">
                PRO
              </span>
            </div>
            <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase block -mt-1">
              TRAIN HARD. EAT SMART. RECOVER STRONG.
            </span>
          </div>
        </div>

        <div className="hidden sm:flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
          <span className="text-xs font-mono text-zinc-400">ENGINE OPERATIONAL</span>
        </div>
      </div>

      {/* Main Centered Authentication Stage */}
      <div className="max-w-md mx-auto w-full z-10">
        <div className="bg-gradient-to-b from-zinc-900 via-zinc-950 to-black border border-zinc-800/90 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-red-950/50 relative">
          
          {/* Header Title */}
          <div className="text-center mb-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-red-950/80 mb-3 text-red-400 text-xs font-mono">
              <Flame className="w-3.5 h-3.5" />
              <span>ATHLETE COMMAND PORTAL</span>
            </div>
            <h1 className="font-heading text-3xl sm:text-4xl font-black text-white uppercase tracking-tight">
              {tab === 'signin' && 'WELCOME BACK, ATHLETE'}
              {tab === 'register' && 'JOIN IRONVAULT PRO'}
              {tab === 'forgot' && 'ACCOUNT RECOVERY'}
            </h1>
            <p className="text-xs text-zinc-400 mt-1">
              {tab === 'signin' && 'Sign in to access your workouts, nutrition fuel, and AI camera stats.'}
              {tab === 'register' && 'Create your athlete account to generate a custom bulking/cutting plan.'}
              {tab === 'forgot' && 'Enter your registered email to receive access credentials instructions.'}
            </p>
          </div>

          {/* Tab Selector */}
          {tab !== 'forgot' && (
            <div className="flex bg-zinc-900/90 p-1.5 rounded-2xl mb-6 border border-zinc-800">
              <button
                type="button"
                onClick={() => { setTab('signin'); setErrorMessage(null); }}
                className={`flex-1 py-2.5 text-xs font-bold font-heading tracking-wider rounded-xl transition-all cursor-pointer ${
                  tab === 'signin'
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-950'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                SIGN IN
              </button>
              <button
                type="button"
                onClick={() => { setTab('register'); setErrorMessage(null); }}
                className={`flex-1 py-2.5 text-xs font-bold font-heading tracking-wider rounded-xl transition-all cursor-pointer ${
                  tab === 'register'
                    ? 'bg-gradient-to-r from-red-600 to-red-700 text-white shadow-lg shadow-red-950'
                    : 'text-zinc-400 hover:text-white'
                }`}
              >
                CREATE ACCOUNT
              </button>
            </div>
          )}

          {/* Feedback Alerts */}
          {errorMessage && (
            <div className="mb-4 p-3.5 rounded-xl bg-red-950/70 border border-red-800/80 flex items-start gap-2.5 text-xs text-red-200 animate-in fade-in">
              <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
              <span>{errorMessage}</span>
            </div>
          )}

          {infoMessage && (
            <div className="mb-4 p-3.5 rounded-xl bg-emerald-950/70 border border-emerald-800/80 flex items-start gap-2.5 text-xs text-emerald-200 animate-in fade-in">
              <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
              <span>{infoMessage}</span>
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            
            {tab === 'register' && (
              <div>
                <label className="block text-[11px] font-mono tracking-wider text-zinc-400 mb-1 uppercase">
                  Full Name / Athlete Handle
                </label>
                <div className="relative">
                  <User className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Vinay Vaishnav"
                    className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-500"
                  />
                </div>
              </div>
            )}

            <div>
              <label className="block text-[11px] font-mono tracking-wider text-zinc-400 mb-1 uppercase">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="athlete@ironvault.pro"
                  className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>

            {tab !== 'forgot' && (
              <>
                <div>
                  <div className="flex items-center justify-between mb-1">
                    <label className="block text-[11px] font-mono tracking-wider text-zinc-400 uppercase">
                      Password
                    </label>
                    {tab === 'signin' && (
                      <button
                        type="button"
                        onClick={() => { setTab('forgot'); setErrorMessage(null); }}
                        className="text-[11px] text-zinc-400 hover:text-red-400 transition-colors cursor-pointer"
                      >
                        Forgot password?
                      </button>
                    )}
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-10 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-500"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-3.5 text-zinc-500 hover:text-zinc-300 cursor-pointer"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {tab === 'register' && (
                  <div>
                    <label className="block text-[11px] font-mono tracking-wider text-zinc-400 mb-1 uppercase">
                      Confirm Password
                    </label>
                    <div className="relative">
                      <Lock className="absolute left-3.5 top-3.5 w-4 h-4 text-zinc-500" />
                      <input
                        type={showPassword ? 'text' : 'password'}
                        required
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="••••••••"
                        className="w-full pl-10 pr-4 py-3 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-500"
                      />
                    </div>
                  </div>
                )}
              </>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-heading font-black tracking-widest text-sm uppercase flex items-center justify-center gap-2 shadow-xl shadow-red-950 transition-all cursor-pointer disabled:opacity-50 mt-2"
            >
              {loading ? (
                <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
              ) : (
                <>
                  <span>
                    {tab === 'signin' && 'ENTER THE VAULT'}
                    {tab === 'register' && 'CREATE ATHLETE ACCOUNT'}
                    {tab === 'forgot' && 'DISPATCH RESET LINK'}
                  </span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>
          </form>

          {tab === 'forgot' && (
            <button
              type="button"
              onClick={() => { setTab('signin'); setErrorMessage(null); }}
              className="w-full text-center text-xs text-zinc-400 hover:text-white mt-4 font-mono cursor-pointer"
            >
              ← Back to Athlete Sign In
            </button>
          )}

          {/* Quick Demo Athlete Button matching prompt requirement */}
          <div className="mt-8 pt-6 border-t border-zinc-800/80">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
                DEVELOPMENT & EVALUATION MODE
              </span>
              <span className="text-[10px] text-amber-500 font-mono font-bold">1-CLICK DEMO</span>
            </div>

            <button
              type="button"
              onClick={handleDemoSignIn}
              className="w-full py-3 px-4 rounded-xl bg-zinc-900/90 border border-zinc-700/80 hover:border-red-500 text-xs font-bold font-heading tracking-wider text-zinc-200 hover:text-white flex items-center justify-center gap-2 transition-all cursor-pointer group shadow-lg"
            >
              <ShieldCheck className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
              <span>LAUNCH INSTANT ATHLETE DEMO (VINAY VAISHNAV)</span>
            </button>
            <p className="text-[10px] text-zinc-500 text-center mt-2 leading-tight">
              Pre-populated intermediate profile with Indian nutrition data, splits, and workout logs.
            </p>
          </div>

        </div>
      </div>

      {/* Bottom Footer Details */}
      <div className="max-w-6xl mx-auto w-full text-center text-xs text-zinc-600 font-mono mt-8 z-10">
        <span>IRONVAULT PRO HYPERTROPHY ECOSYSTEM • 100% SECURE CLIENT-SIDE DATA VAULT</span>
      </div>

    </div>
  );
};
