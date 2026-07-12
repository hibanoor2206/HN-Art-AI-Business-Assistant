import { useEffect, useState } from 'react';
import { Palette } from 'lucide-react';

export function LoadingScreen() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setProgress((p) => {
        if (p >= 100) return 100;
        return p + Math.random() * 15 + 5;
      });
    }, 120);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 z-[200] flex flex-col items-center justify-center bg-cream dark:bg-sage-900">
      <div className="relative flex flex-col items-center">
        <div className="mb-6 flex h-20 w-20 animate-[float_3s_ease-in-out_infinite] items-center justify-center rounded-2xl bg-gradient-to-br from-sage-700 to-sage-900 shadow-xl shadow-sage-700/15 ring-1 ring-gold-500/30">
          <Palette size={36} className="text-gold-400" />
        </div>
        <h1 className="font-serif text-2xl font-bold text-sage-800 dark:text-beige-100">
          HN Art <span className="text-gradient-gold">AI</span>
        </h1>
        <p className="mt-1.5 text-sm font-medium text-sage-500 dark:text-sage-400">
          Crafting Creativity with the Power of AI
        </p>
        <div className="mt-8 h-1 w-48 overflow-hidden rounded-full bg-sage-200 dark:bg-sage-700">
          <div
            className="h-full rounded-full bg-gradient-to-r from-gold-500 to-gold-600 transition-all duration-200"
            style={{ width: `${Math.min(progress, 100)}%` }}
          />
        </div>
        <p className="mt-3 text-xs font-medium text-sage-400">{Math.min(Math.round(progress), 100)}%</p>
      </div>
    </div>
  );
}
