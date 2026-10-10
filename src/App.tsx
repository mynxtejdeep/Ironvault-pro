/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from 'react';
import { 
  Flame, 
  Dumbbell, 
  Activity, 
  Calendar, 
  Heart, 
  Camera, 
  Calculator, 
  BarChart3, 
  User, 
  ShieldCheck, 
  ArrowRight 
} from 'lucide-react';
import { AuthScreen } from './components/AuthScreen';
import { Navbar } from './components/Navbar';
import { AuthModal } from './components/AuthModal';
import { OnboardingModal } from './components/OnboardingModal';
import { DashboardView } from './components/DashboardView';
import { WorkoutsArsenalView } from './components/WorkoutsArsenalView';
import { AiCameraTrainerView } from './components/AiCameraTrainerView';
import { NutritionFuelView } from './components/NutritionFuelView';
import { SplitsView } from './components/SplitsView';
import { RecoveryMatrixView } from './components/RecoveryMatrixView';
import { CalculatorView } from './components/CalculatorView';
import { ReportsView } from './components/ReportsView';
import { ProfileSettingsView } from './components/ProfileSettingsView';
import { HelpStoreModal } from './components/HelpStoreModal';

import { 
  StorageService, 
  AuthAccount, 
  DEFAULT_DEMO_PROFILE, 
  DEFAULT_GENERATED_PLAN 
} from './services/storage';
import { 
  UserProfile, 
  GeneratedPlan, 
  FoodLog, 
  CameraWorkoutSession, 
  DailyTracking 
} from './types';

export default function App() {
  const [currentUser, setCurrentUser] = useState<AuthAccount | null>(() => StorageService.getCurrentUser());
  const [userProfile, setUserProfile] = useState<UserProfile | null>(() => StorageService.getUserProfile());
  const [generatedPlan, setGeneratedPlan] = useState<GeneratedPlan | null>(() => StorageService.getGeneratedPlan());
  const [foodLogs, setFoodLogs] = useState<FoodLog[]>(() => StorageService.getFoodLogs());
  const [cameraSessions, setCameraSessions] = useState<CameraWorkoutSession[]>(() => StorageService.getCameraSessions());
  const [dailyTracking, setDailyTracking] = useState<DailyTracking>(() => StorageService.getTodayTracking());

  // Navigation
  const [currentTab, setCurrentTab] = useState<string>('dashboard');
  const [selectedAiExerciseId, setSelectedAiExerciseId] = useState<string | undefined>(undefined);

  // Modals
  const [isAuthModalOpen, setIsAuthModalOpen] = useState<boolean>(false);
  const [isOnboardingOpen, setIsOnboardingOpen] = useState<boolean>(false);
  const [isHelpModalOpen, setIsHelpModalOpen] = useState<boolean>(false);

  // If user registered but hasn't completed onboarding, trigger onboarding modal
  useEffect(() => {
    if (currentUser && userProfile && !userProfile.onboarded) {
      setIsOnboardingOpen(true);
    }
  }, [currentUser, userProfile]);

  const handleAuthSuccess = (user: AuthAccount, isNewRegistration = false) => {
    setCurrentUser(user);
    const profile = StorageService.getUserProfile();
    setUserProfile(profile);
    if (isNewRegistration || !profile || !profile.onboarded) {
      setIsOnboardingOpen(true);
    } else {
      setCurrentTab('dashboard');
    }
  };

  const handleLogout = () => {
    StorageService.logout();
    setCurrentUser(null);
    setUserProfile(null);
  };

  const handleOnboardingComplete = (profile: UserProfile, plan: GeneratedPlan) => {
    setUserProfile(profile);
    setGeneratedPlan(plan);
    setIsOnboardingOpen(false);
    setCurrentTab('dashboard');
  };

  const handleStartAiTrainer = (exerciseId: string) => {
    setSelectedAiExerciseId(exerciseId);
    setCurrentTab('ai_camera');
  };

  const handleFinishCameraSession = (session: CameraWorkoutSession) => {
    setCameraSessions(StorageService.getCameraSessions());
    setCurrentTab('reports');
  };

  const handleLogFood = (log: Omit<FoodLog, 'id' | 'timestamp'>) => {
    StorageService.addFoodLog(log);
    setFoodLogs(StorageService.getFoodLogs());
  };

  const handleUpdateDailyTracking = (updated: DailyTracking) => {
    StorageService.saveTodayTracking(updated);
    setDailyTracking(updated);
  };

  const refreshAllData = () => {
    setCameraSessions(StorageService.getCameraSessions());
    setFoodLogs(StorageService.getFoodLogs());
    setDailyTracking(StorageService.getTodayTracking());
  };

  if (!currentUser) {
    return <AuthScreen onAuthSuccess={handleAuthSuccess} />;
  }

  return (
    <div className="min-h-screen bg-black text-slate-100 flex flex-col font-sans gym-carbon-bg selection:bg-red-600 selection:text-white">
      
      {/* Top Bar Navigation */}
      <Navbar
        currentTab={currentTab}
        setCurrentTab={setCurrentTab}
        currentUser={currentUser}
        onOpenAuth={() => setIsAuthModalOpen(true)}
        onLogout={handleLogout}
        onOpenHelp={() => setIsHelpModalOpen(true)}
      />

      {/* Main Content Area */}
      <main className={`flex-1 w-full max-w-7xl mx-auto ${currentTab === 'ai_camera' ? 'px-2 sm:px-4 md:px-8 pt-2 sm:pt-6' : 'px-4 md:px-8 pt-6'} pb-24 xl:pb-20`}>
        {currentTab === 'dashboard' && (
          <DashboardView
            userProfile={userProfile}
            generatedPlan={generatedPlan}
            foodLogs={foodLogs}
            dailyTracking={dailyTracking}
            onUpdateTracking={handleUpdateDailyTracking}
            onNavigate={setCurrentTab}
            onOpenOnboarding={() => setIsOnboardingOpen(true)}
          />
        )}

        {currentTab === 'workouts' && (
          <WorkoutsArsenalView
            onStartAiTrainer={handleStartAiTrainer}
          />
        )}

        {currentTab === 'ai_camera' && (
          <AiCameraTrainerView
            initialExerciseId={selectedAiExerciseId}
            onFinishSession={handleFinishCameraSession}
            onBackToWorkouts={() => setCurrentTab('workouts')}
          />
        )}

        {currentTab === 'splits' && (
          <SplitsView />
        )}

        {currentTab === 'nutrition' && (
          <NutritionFuelView
            onLogFood={handleLogFood}
            todayLogs={foodLogs}
          />
        )}

        {currentTab === 'recovery' && (
          <RecoveryMatrixView
            dailyTracking={dailyTracking}
            onUpdateTracking={handleUpdateDailyTracking}
          />
        )}

        {currentTab === 'calculator' && (
          <CalculatorView
            currentProfile={userProfile}
            onApplyPlan={(newPlan) => setGeneratedPlan(newPlan)}
          />
        )}

        {currentTab === 'reports' && (
          <ReportsView
            userProfile={userProfile}
            cameraSessions={cameraSessions}
            foodLogs={foodLogs}
            dailyTracking={dailyTracking}
            onRefreshData={refreshAllData}
          />
        )}

        {currentTab === 'profile' && (
          <ProfileSettingsView
            userProfile={userProfile}
            onUpdateProfile={(up) => setUserProfile(up)}
            onLogout={handleLogout}
            onReopenOnboarding={() => setIsOnboardingOpen(true)}
          />
        )}
      </main>

      {/* Mobile Bottom Thumb Navigation Bar (Ergonomic for 1-handed phone use) */}
      <nav className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-zinc-950/95 backdrop-blur-md border-t border-zinc-800/80 px-2 py-2 flex items-center justify-around">
        {[
          { id: 'dashboard', label: 'Home', icon: Flame },
          { id: 'workouts', label: 'Workouts', icon: Dumbbell },
          { id: 'ai_camera', label: 'AI Cam', icon: Camera, highlight: true },
          { id: 'splits', label: 'Splits', icon: Calendar },
          { id: 'nutrition', label: 'Fuel', icon: Activity },
          { id: 'reports', label: 'Reports', icon: BarChart3 }
        ].map((tab) => {
          const Icon = tab.icon;
          const isActive = currentTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => setCurrentTab(tab.id)}
              className={`flex flex-col items-center justify-center p-1 min-w-[50px] transition-all cursor-pointer ${
                isActive ? 'text-red-500 scale-105' : 'text-zinc-500 hover:text-zinc-300'
              }`}
            >
              <div className={`p-1 rounded-xl ${tab.highlight && !isActive ? 'bg-red-950/50 text-red-400' : ''}`}>
                <Icon className={`w-5 h-5 ${isActive ? 'text-red-500' : ''}`} />
              </div>
              <span className={`text-[10px] font-bold font-mono tracking-tight mt-0.5 ${isActive ? 'text-white' : ''}`}>
                {tab.label}
              </span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <footer className="border-t border-zinc-900 bg-black py-8 px-4 text-center text-xs text-zinc-500 font-mono">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Dumbbell className="w-4 h-4 text-red-500" />
            <span className="font-brand text-sm font-bold text-white tracking-wider">
              IRONVAULT PRO
            </span>
            <span>— TRAIN HARD. EAT SMART. RECOVER STRONG.</span>
          </div>

          <div className="flex items-center gap-4 text-[11px]">
            <button onClick={() => setIsHelpModalOpen(true)} className="hover:text-zinc-300">
              Coaching Desk & Store
            </button>
            <span>•</span>
            <button onClick={() => setCurrentTab('calculator')} className="hover:text-zinc-300">
              Calorie Engine
            </button>
            <span>•</span>
            <button onClick={() => setCurrentTab('profile')} className="hover:text-zinc-300">
              Privacy & Local Vault
            </button>
          </div>
        </div>
      </footer>

      {/* Modals */}
      <AuthModal
        isOpen={isAuthModalOpen}
        onClose={() => setIsAuthModalOpen(false)}
        onSuccess={handleAuthSuccess}
      />

      <OnboardingModal
        isOpen={isOnboardingOpen}
        onComplete={handleOnboardingComplete}
        initialProfile={userProfile || undefined}
      />

      <HelpStoreModal
        isOpen={isHelpModalOpen}
        onClose={() => setIsHelpModalOpen(false)}
      />

    </div>
  );
}
