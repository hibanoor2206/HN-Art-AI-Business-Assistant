import { useState, useEffect } from 'react';
import { ToastProvider } from './lib/useToast';
import { LoadingScreen } from './components/LoadingScreen';
import LandingPage from './components/LandingPage';
import { Dashboard } from './components/Dashboard';
import type { AppView } from './types';

function AppContent() {
  const [view, setView] = useState<AppView>('landing');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 2200);
    return () => clearTimeout(timer);
  }, []);

  if (loading) return <LoadingScreen />;

  return (
    <>
      {view === 'landing' && <LandingPage onGetStarted={() => setView('dashboard')} />}
      {view === 'dashboard' && <Dashboard onBackToLanding={() => setView('landing')} />}
    </>
  );
}

export default function App() {
  return (
    <ToastProvider>
      <AppContent />
    </ToastProvider>
  );
}
