import React, { useState, useEffect } from 'react';
import { WORKOUT_DAYS, WorkoutDay } from './data/workouts';
import { Navbar } from './components/Navbar';
import { WorkoutHub } from './components/WorkoutHub';
import { WorkoutDetailView } from './components/WorkoutDetailView';
import { MobileBottomNav } from './components/MobileBottomNav';
import { BiomechanicalGuidelinesModal } from './components/BiomechanicalGuidelinesModal';
import { ChecklistModal } from './components/ChecklistModal';
import { Mail, Dumbbell, ShieldAlert, ClipboardCheck } from 'lucide-react';

export const App: React.FC = () => {
  const [activeDayId, setActiveDayId] = useState<'treino-a' | 'treino-b' | 'treino-c' | 'treino-d'>('treino-a');
  const [viewMode, setViewMode] = useState<'hub' | 'workout'>('hub');
  const [isGuidelinesOpen, setIsGuidelinesOpen] = useState<boolean>(false);
  const [isChecklistOpen, setIsChecklistOpen] = useState<boolean>(false);
  const [gymMode, setGymMode] = useState<boolean>(false);
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true);

  // Sync state with URL hash for single page navigation
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (['treino-a', 'treino-b', 'treino-c', 'treino-d'].includes(hash)) {
        setActiveDayId(hash as 'treino-a' | 'treino-b' | 'treino-c' | 'treino-d');
        setViewMode('workout');
      } else {
        setViewMode('hub');
      }
    };

    // Initial check on mount
    handleHashChange();

    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const handleSelectWorkout = (workoutId: 'treino-a' | 'treino-b' | 'treino-c' | 'treino-d') => {
    setActiveDayId(workoutId);
    setViewMode('workout');
    window.location.hash = `#${workoutId}`;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHub = () => {
    setViewMode('hub');
    window.location.hash = '#hub';
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const currentDay: WorkoutDay = WORKOUT_DAYS.find((d) => d.id === activeDayId) || WORKOUT_DAYS[0];

  return (
    <div className={`min-h-screen flex flex-col bg-mamba-dark text-slate-100 ${gymMode ? 'bg-[#050608]' : ''}`}>
      {/* Top Navigation */}
      <Navbar
        currentView={viewMode}
        activeDayId={activeDayId}
        onSelectDay={handleSelectWorkout}
        onNavigateHub={handleNavigateHub}
        onOpenGuidelines={() => setIsGuidelinesOpen(true)}
        onOpenChecklist={() => setIsChecklistOpen(true)}
        gymMode={gymMode}
        onToggleGymMode={() => setGymMode(!gymMode)}
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />

      {/* Main Content Area */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {viewMode === 'hub' ? (
          <WorkoutHub
            onSelectWorkout={handleSelectWorkout}
            onOpenGuidelines={() => setIsGuidelinesOpen(true)}
            onOpenChecklist={() => setIsChecklistOpen(true)}
          />
        ) : (
          <WorkoutDetailView
            workout={currentDay}
            onBackToHub={handleNavigateHub}
            onNavigateToWorkout={handleSelectWorkout}
            onOpenGuidelines={() => setIsGuidelinesOpen(true)}
            onOpenChecklist={() => setIsChecklistOpen(true)}
            gymMode={gymMode}
          />
        )}
      </main>

      {/* Institutional Footer */}
      <footer className="border-t border-mamba-border bg-mamba-dark/95 py-8 text-xs text-mamba-muted pb-24 md:pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-mamba-surface border border-mamba-border flex items-center justify-center text-mamba-purple font-black">
              <Dumbbell className="w-4 h-4 text-mamba-cyan" />
            </div>
            <div>
              <p className="font-semibold text-slate-300">
                Mamba Hoops Performance • Biomecânica & Blindagem Articular
              </p>
              <p className="text-[11px] text-mamba-muted">
                Plano de Preparação Física para Basquetebol • Fase 1 (Semanas 1 a 4)
              </p>
            </div>
          </div>

          <div className="flex items-center gap-4 text-slate-400 flex-wrap justify-center">
            <button
              onClick={() => setIsGuidelinesOpen(true)}
              className="hover:text-mamba-cyan transition-colors flex items-center gap-1"
            >
              <ShieldAlert className="w-3.5 h-3.5 text-mamba-cyan" />
              Diretrizes Clínicas
            </button>
            <span>•</span>
            <button
              onClick={() => setIsChecklistOpen(true)}
              className="hover:text-mamba-gold transition-colors flex items-center gap-1"
            >
              <ClipboardCheck className="w-3.5 h-3.5 text-mamba-gold" />
              Checklist 24h
            </button>
            <span>•</span>
            <a
              href="mailto:xiudsales@gmail.com"
              className="flex items-center gap-1 hover:text-slate-200 transition-colors"
            >
              <Mail className="w-3.5 h-3.5" />
              xiudsales@gmail.com
            </a>
          </div>
        </div>
      </footer>

      {/* Mobile-First Bottom Floating Dock Navigation */}
      <MobileBottomNav
        currentView={viewMode}
        onNavigateHub={handleNavigateHub}
        onNavigateWorkout={() => {
          setViewMode('workout');
          window.location.hash = `#${activeDayId}`;
        }}
        onOpenGuidelines={() => setIsGuidelinesOpen(true)}
        onOpenChecklist={() => setIsChecklistOpen(true)}
        activeDayTag={
          activeDayId === 'treino-a' ? 'Treino A' :
          activeDayId === 'treino-b' ? 'Treino B' :
          activeDayId === 'treino-c' ? 'Treino C' : 'Treino D'
        }
        soundEnabled={soundEnabled}
        onToggleSound={() => setSoundEnabled(!soundEnabled)}
      />

      {/* Modals */}
      <BiomechanicalGuidelinesModal
        isOpen={isGuidelinesOpen}
        onClose={() => setIsGuidelinesOpen(false)}
      />

      <ChecklistModal
        isOpen={isChecklistOpen}
        onClose={() => setIsChecklistOpen(false)}
      />
    </div>
  );
};
