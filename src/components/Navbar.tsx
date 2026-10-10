import React, { useState } from 'react';
import { 
  Dumbbell, 
  Menu, 
  X, 
  Flame, 
  Activity, 
  Calendar, 
  Heart, 
  HelpCircle, 
  User, 
  Camera, 
  Calculator, 
  BarChart3, 
  LogOut 
} from 'lucide-react';
import { AuthAccount } from '../services/storage';

interface NavbarProps {
  currentTab: string;
  setCurrentTab: (tab: string) => void;
  currentUser: AuthAccount | null;
  onOpenAuth: () => void;
  onLogout: () => void;
  onOpenHelp: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentTab,
  setCurrentTab,
  currentUser,
  onOpenAuth,
  onLogout,
  onOpenHelp
}) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'HOME', icon: Flame },
    { id: 'workouts', label: 'WORKOUTS', icon: Dumbbell },
    { id: 'ai_camera', label: 'AI TRAINER', icon: Camera, badge: 'LIVE AI' },
    { id: 'splits', label: 'SPLIT', icon: Calendar },
    { id: 'nutrition', label: 'NUTRITION', icon: Activity },
    { id: 'recovery', label: 'RECOVERY', icon: Heart },
    { id: 'calculator', label: 'CALCULATOR', icon: Calculator },
    { id: 'reports', label: 'REPORTS', icon: BarChart3 }
  ];

  const handleNavClick = (id: string) => {
    setCurrentTab(id);
    setMobileMenuOpen(false);
  };

  return (
    <>
      <header className="sticky top-0 z-40 w-full bg-black/90 backdrop-blur-md border-b border-zinc-800/80 px-4 md:px-8 py-3.5">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          
          {/* Brand Mark with Dumbbell Icon & Glow */}
          <div 
            onClick={() => setCurrentTab('dashboard')} 
            className="flex items-center gap-3 cursor-pointer group select-none shrink-0"
          >
            <div className="relative">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-zinc-900 to-black border border-red-950/60 flex items-center justify-center shadow-lg shadow-red-950/30 group-hover:border-red-600/50 transition-colors">
                <Dumbbell className="w-5 h-5 text-red-500 group-hover:scale-110 transition-transform" />
              </div>
              {/* Soft red illumination bloom */}
              <div className="absolute -inset-1 bg-red-600/20 blur-md -z-10 rounded-xl"></div>
            </div>

            <div className="flex flex-col">
              <div className="flex items-center gap-1.5">
                <span className="font-brand text-xl md:text-2xl font-black tracking-wider text-white">
                  IRON<span className="text-red-500">VAULT</span>
                </span>
                <span className="text-[10px] font-bold tracking-widest px-1.5 py-0.5 rounded-full border border-red-500/40 text-red-400 bg-red-950/30">
                  PRO
                </span>
              </div>
              <div className="flex items-center gap-1.5 -mt-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span className="text-[9px] font-mono tracking-widest text-zinc-500 uppercase">
                  ONLINE ENGINE
                </span>
              </div>
            </div>
          </div>

          {/* Desktop Nav Links */}
          <nav className="hidden xl:flex items-center gap-1">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`relative px-3.5 py-2 text-xs font-bold tracking-wider rounded-lg transition-all flex items-center gap-1.5 whitespace-nowrap ${
                    isActive
                      ? 'text-white bg-zinc-900 border border-red-500/40 shadow-sm shadow-red-950'
                      : 'text-zinc-400 hover:text-white hover:bg-zinc-900/50'
                  }`}
                >
                  <Icon className={`w-3.5 h-3.5 ${isActive ? 'text-red-500' : 'text-zinc-500'}`} />
                  <span>{item.label}</span>
                  {item.badge && (
                    <span className="text-[8px] bg-red-600 text-white font-mono px-1 rounded uppercase">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>

          {/* Action Area: User / Auth & Mobile Trigger */}
          <div className="flex items-center gap-2.5 shrink-0">
            {currentUser ? (
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setCurrentTab('profile')}
                  className={`hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-semibold transition-colors ${
                    currentTab === 'profile'
                      ? 'border-red-500/50 bg-red-950/20 text-white'
                      : 'border-zinc-800 bg-zinc-900/80 text-zinc-300 hover:text-white hover:border-zinc-700'
                  }`}
                >
                  <div className="w-6 h-6 rounded-full bg-red-600/30 border border-red-500/40 flex items-center justify-center text-[11px] font-bold text-red-400">
                    {currentUser.name ? currentUser.name[0].toUpperCase() : 'A'}
                  </div>
                  <span className="max-w-[100px] truncate">{currentUser.name || 'Athlete'}</span>
                </button>

                <button
                  onClick={onLogout}
                  title="Sign Out / Switch Athlete"
                  className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg bg-zinc-900 border border-zinc-800 text-xs font-mono text-zinc-400 hover:text-red-400 hover:border-red-900 transition-colors cursor-pointer"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  <span className="hidden sm:inline">Sign Out</span>
                </button>
              </div>
            ) : (
              <button
                onClick={onOpenAuth}
                className="px-4 py-2 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white text-xs font-bold tracking-wider shadow-lg shadow-red-900/40 transition-all uppercase"
              >
                Sign In
              </button>
            )}

            {/* Mobile Menu Hamburger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-2 rounded-xl bg-zinc-900 border border-zinc-800 text-zinc-300 hover:text-white hover:border-zinc-700 transition-colors"
              aria-label="Toggle Navigation Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Drawer Overlay matching Screenshot 6 */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex flex-col justify-between p-4 animate-in fade-in duration-200">
          <div className="flex items-center justify-between pb-4 border-b border-zinc-800">
            <div className="flex items-center gap-2">
              <div className="w-9 h-9 rounded-xl bg-zinc-900 border border-red-950 flex items-center justify-center shadow-lg shadow-red-950/40">
                <Dumbbell className="w-4 h-4 text-red-500" />
              </div>
              <span className="font-heading text-xl font-black text-white">
                IRON<span className="text-red-500">VAULT</span> <span className="text-[10px] text-red-400 border border-red-500/40 px-1 rounded-full">PRO</span>
              </span>
            </div>
            <button
              onClick={() => setMobileMenuOpen(false)}
              className="p-2 rounded-lg bg-zinc-900 border border-zinc-800 text-zinc-400 hover:text-white"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="py-4 space-y-1 overflow-y-auto max-h-[70vh]">
            <p className="text-[11px] font-mono tracking-widest text-zinc-500 uppercase px-3 py-1">
              ATHLETE COMMAND MODULES
            </p>

            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = currentTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleNavClick(item.id)}
                  className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-heading text-base font-bold tracking-wider transition-all ${
                    isActive
                      ? 'bg-zinc-900/90 border border-red-600/70 text-red-400 shadow-lg shadow-red-950/40'
                      : 'text-zinc-300 hover:bg-zinc-900/40 hover:text-white'
                  }`}
                >
                  <div className="flex items-center gap-3">
                    <Icon className={`w-5 h-5 ${isActive ? 'text-red-500' : 'text-zinc-500'}`} />
                    <span>{item.label}</span>
                  </div>
                  {item.badge && (
                    <span className="text-[9px] bg-red-600 text-white font-mono px-1.5 py-0.5 rounded">
                      {item.badge}
                    </span>
                  )}
                </button>
              );
            })}

            <div className="pt-2 border-t border-zinc-800/80 my-2"></div>

            <button
              onClick={() => {
                onOpenHelp();
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-heading text-base font-bold tracking-wider text-zinc-400 hover:text-white hover:bg-zinc-900/40"
            >
              <HelpCircle className="w-5 h-5 text-zinc-500" />
              <span>HELP & STORE</span>
            </button>

            <button
              onClick={() => handleNavClick('profile')}
              className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-heading text-base font-bold tracking-wider text-zinc-400 hover:text-white hover:bg-zinc-900/40"
            >
              <User className="w-5 h-5 text-zinc-500" />
              <span>ABOUT ATHLETE / PROFILE</span>
            </button>

            {currentUser && (
              <button
                onClick={() => {
                  onLogout();
                  setMobileMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-heading text-base font-bold tracking-wider text-red-400 hover:bg-red-950/30 border border-red-950/60 mt-1"
              >
                <LogOut className="w-5 h-5 text-red-500" />
                <span>SIGN OUT / SWITCH ATHLETE</span>
              </button>
            )}
          </div>

          <div className="pt-3 border-t border-zinc-800">
            <button
              onClick={() => handleNavClick('workouts')}
              className="w-full py-3.5 rounded-xl bg-gradient-to-r from-red-600 to-red-700 hover:from-red-500 hover:to-red-600 text-white font-heading font-black tracking-widest text-sm flex items-center justify-center gap-2 shadow-xl shadow-red-950"
            >
              <Dumbbell className="w-4 h-4" />
              EXPLORE WORKOUTS LIBRARY
            </button>
          </div>
        </div>
      )}
    </>
  );
};
