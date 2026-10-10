import React, { useState } from 'react';
import { Dumbbell, Eye, EyeOff, Lock, Mail, User, ShieldCheck, ArrowRight, X, AlertCircle } from 'lucide-react';
import { StorageService, AuthAccount } from '../services/storage';

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (user: AuthAccount) => void;
  initialMode?: 'signin' | 'register';
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen,
  onClose,
  onSuccess,
  initialMode = 'signin'
}) => {
  const [mode, setMode] = useState<'signin' | 'register' | 'forgot'>(initialMode);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [infoMessage, setInfoMessage] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfoMessage(null);

    if (mode === 'forgot') {
      if (!email.trim() || !email.includes('@')) {
        setError('Please enter a valid email address.');
        return;
      }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setInfoMessage(`Password reset link dispatched to ${email}. Check your inbox.`);
      }, 700);
      return;
    }

    if (!email.trim() || !email.includes('@')) {
      setError('Please provide a valid athlete email address.');
      return;
    }
    if (password.length < 6) {
      setError('Password must contain at least 6 characters.');
      return;
    }

    if (mode === 'register') {
      if (!name.trim()) {
        setError('Please enter your full name or athlete handle.');
        return;
      }
      if (password !== confirmPassword) {
        setError('Passwords do not match.');
        return;
      }
      setLoading(true);
      setTimeout(() => {
        const res = StorageService.registerUser(name, email, password);
        setLoading(false);
        if (res.success && res.user) {
          onSuccess(res.user);
          onClose();
        } else {
          setError(res.error || 'Registration failed.');
        }
      }, 600);
    } else {
      setLoading(true);
      setTimeout(() => {
        const res = StorageService.loginUser(email, password);
        setLoading(false);
        if (res.success && res.user) {
          onSuccess(res.user);
          onClose();
        } else {
          setError(res.error || 'Authentication failed.');
        }
      }, 600);
    }
  };

  const handleDemoSignIn = () => {
    setLoading(true);
    setTimeout(() => {
      const demoUser = StorageService.loginAsDemo();
      setLoading(false);
      onSuccess(demoUser);
      onClose();
    }, 400);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-md bg-gradient-to-b from-zinc-900 via-zinc-950 to-black border border-zinc-800 rounded-3xl p-6 sm:p-8 shadow-2xl shadow-red-950/40">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-zinc-500 hover:text-white hover:bg-zinc-800/80 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Brand Header */}
        <div className="text-center mb-6">
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-2xl bg-zinc-900 border border-red-900/60 mb-3 shadow-lg shadow-red-950/40">
            <Dumbbell className="w-6 h-6 text-red-500" />
          </div>
          <h2 className="font-brand text-2xl sm:text-3xl font-black tracking-wider text-white">
            IRON<span className="text-red-500">VAULT</span> <span className="text-xs text-red-400 border border-red-500/40 px-1.5 py-0.5 rounded-full font-mono">PRO</span>
          </h2>
          <p className="text-xs text-zinc-400 mt-1 uppercase tracking-widest font-mono">
            {mode === 'signin' && 'Access Athlete Command Portal'}
            {mode === 'register' && 'Forge Your Athlete Account'}
            {mode === 'forgot' && 'Reset Secure Access Credentials'}
          </p>
        </div>

        {/* Tab switch for signin / register */}
        {mode !== 'forgot' && (
          <div className="flex bg-zinc-900/80 p-1 rounded-xl mb-5 border border-zinc-800">
            <button
              type="button"
              onClick={() => { setMode('signin'); setError(null); }}
              className={`flex-1 py-2 text-xs font-bold tracking-wider rounded-lg transition-all ${
                mode === 'signin'
                  ? 'bg-red-600 text-white shadow-md shadow-red-950'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              SIGN IN
            </button>
            <button
              type="button"
              onClick={() => { setMode('register'); setError(null); }}
              className={`flex-1 py-2 text-xs font-bold tracking-wider rounded-lg transition-all ${
                mode === 'register'
                  ? 'bg-red-600 text-white shadow-md shadow-red-950'
                  : 'text-zinc-400 hover:text-white'
              }`}
            >
              CREATE ACCOUNT
            </button>
          </div>
        )}

        {/* Error / Info alerts */}
        {error && (
          <div className="mb-4 p-3 rounded-xl bg-red-950/60 border border-red-800/80 flex items-start gap-2.5 text-xs text-red-200">
            <AlertCircle className="w-4 h-4 text-red-400 shrink-0 mt-0.5" />
            <span>{error}</span>
          </div>
        )}

        {infoMessage && (
          <div className="mb-4 p-3 rounded-xl bg-emerald-950/60 border border-emerald-800/80 flex items-start gap-2.5 text-xs text-emerald-200">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
            <span>{infoMessage}</span>
          </div>
        )}

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {mode === 'register' && (
            <div>
              <label className="block text-[11px] font-mono tracking-wider text-zinc-400 mb-1 uppercase">
                Full Name / Athlete Handle
              </label>
              <div className="relative">
                <User className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Vinay Vaishnav"
                  className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-500"
                />
              </div>
            </div>
          )}

          <div>
            <label className="block text-[11px] font-mono tracking-wider text-zinc-400 mb-1 uppercase">
              Athlete Email
            </label>
            <div className="relative">
              <Mail className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="athlete@ironvault.pro"
                className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-500"
              />
            </div>
          </div>

          {mode !== 'forgot' && (
            <>
              <div>
                <div className="flex items-center justify-between mb-1">
                  <label className="block text-[11px] font-mono tracking-wider text-zinc-400 uppercase">
                    Password
                  </label>
                  {mode === 'signin' && (
                    <button
                      type="button"
                      onClick={() => setMode('forgot')}
                      className="text-[11px] text-zinc-400 hover:text-red-400 transition-colors"
                    >
                      Forgot password?
                    </button>
                  )}
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="••••••••"
                    className="w-full pl-10 pr-10 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-500"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3 text-zinc-500 hover:text-zinc-300"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {mode === 'register' && (
                <div>
                  <label className="block text-[11px] font-mono tracking-wider text-zinc-400 mb-1 uppercase">
                    Confirm Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-3 w-4 h-4 text-zinc-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full pl-10 pr-4 py-2.5 bg-zinc-900 border border-zinc-800 rounded-xl text-sm text-white placeholder-zinc-600 focus:outline-none focus:border-red-500"
                    />
                  </div>
                </div>
              )}
            </>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-heading font-black tracking-widest text-sm flex items-center justify-center gap-2 shadow-lg shadow-red-950 transition-all disabled:opacity-50 mt-2"
          >
            {loading ? (
              <span className="inline-block w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></span>
            ) : (
              <>
                <span>
                  {mode === 'signin' && 'ENTER VAULT'}
                  {mode === 'register' && 'JOIN IRONVAULT PRO'}
                  {mode === 'forgot' && 'SEND RECOVERY LINK'}
                </span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </form>

        {mode === 'forgot' && (
          <button
            type="button"
            onClick={() => { setMode('signin'); setError(null); }}
            className="w-full text-center text-xs text-zinc-400 hover:text-white mt-4 font-mono"
          >
            ← Back to athlete sign in
          </button>
        )}

        {/* Demo Mode Button */}
        <div className="mt-6 pt-5 border-t border-zinc-800/80">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">
              LOCAL DEMO ENVIRONMENT
            </span>
            <span className="text-[10px] text-amber-500 font-mono">SANDBOXED</span>
          </div>

          <button
            type="button"
            onClick={handleDemoSignIn}
            className="w-full py-2.5 px-3 rounded-xl bg-zinc-900/90 border border-zinc-700/80 hover:border-red-500 text-xs font-bold text-zinc-200 hover:text-white flex items-center justify-center gap-2 transition-all group"
          >
            <ShieldCheck className="w-4 h-4 text-red-500 group-hover:scale-110 transition-transform" />
            <span>Launch Instant Athlete Demo (Vinay Vaishnav)</span>
          </button>
          <p className="text-[10px] text-zinc-500 text-center mt-2">
            Local browser authentication. No external passwords transmitted.
          </p>
        </div>

      </div>
    </div>
  );
};
