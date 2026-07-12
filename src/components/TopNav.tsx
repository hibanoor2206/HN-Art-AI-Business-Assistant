import { useState } from 'react';
import { Search, Bell, Moon, Sun, Menu, LogOut } from 'lucide-react';
import { useTheme } from '../lib/useTheme';

interface TopNavProps {
  title: string;
  onToggleMobile: () => void;
  onBackToLanding: () => void;
}

export function TopNav({ title, onToggleMobile, onBackToLanding }: TopNavProps) {
  const { theme, toggle } = useTheme();
  const [showNotif, setShowNotif] = useState(false);

  const notifications = [
    { title: 'New AI tool available', time: '2h ago' },
    { title: 'Chat history saved', time: '5h ago' },
    { title: 'Welcome to HN Art AI!', time: '1d ago' },
  ];

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-sage-200/60 bg-white/80 px-4 backdrop-blur-xl dark:border-sage-700/50 dark:bg-sage-800/60 sm:px-6">
      <div className="flex items-center gap-3">
        <button
          onClick={onToggleMobile}
          className="rounded-lg p-2 text-sage-600 transition hover:bg-sage-100 dark:text-beige-200 dark:hover:bg-sage-700"
        >
          <Menu size={20} />
        </button>
        <h2 className="font-serif text-lg font-semibold text-sage-800 dark:text-beige-50">{title}</h2>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <div className="relative hidden sm:block">
          <Search size={16} className="absolute left-3 top-1/2 -translate-y-1/2 text-sage-400" />
          <input
            placeholder="Search AI tools..."
            className="w-44 rounded-xl border border-sage-200 bg-white py-2 pl-9 pr-3 text-sm text-sage-800 placeholder:text-sage-400 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 dark:border-sage-700 dark:bg-sage-700/40 dark:text-beige-100 lg:w-56"
          />
        </div>

        <button
          onClick={toggle}
          className="rounded-lg p-2 text-sage-600 transition hover:bg-sage-100 dark:text-beige-200 dark:hover:bg-sage-700"
        >
          {theme === 'light' ? <Moon size={20} /> : <Sun size={20} />}
        </button>

        <div className="relative">
          <button
            onClick={() => setShowNotif(!showNotif)}
            className="relative rounded-lg p-2 text-sage-600 transition hover:bg-sage-100 dark:text-beige-200 dark:hover:bg-sage-700"
          >
            <Bell size={20} />
            <span className="absolute right-1.5 top-1.5 h-2 w-2 rounded-full bg-gold-500" />
          </button>
          {showNotif && (
            <>
              <div className="fixed inset-0 z-10" onClick={() => setShowNotif(false)} />
              <div className="absolute right-0 top-12 z-20 w-72 animate-[slideDown_0.2s_ease-out] rounded-2xl bg-white p-2 shadow-xl ring-1 ring-sage-100 dark:bg-sage-800/90 dark:ring-sage-700/50">
                <p className="px-3 py-2 text-xs font-bold uppercase tracking-wide text-sage-500">Notifications</p>
                {notifications.map((n, i) => (
                  <div key={i} className="rounded-xl px-3 py-2.5 transition hover:bg-sage-50 dark:hover:bg-sage-700/50">
                    <p className="text-sm font-medium text-sage-800 dark:text-beige-100">{n.title}</p>
                    <p className="mt-0.5 text-xs text-sage-400">{n.time}</p>
                  </div>
                ))}
              </div>
            </>
          )}
        </div>

        <div className="flex items-center gap-2 rounded-xl border border-sage-200 bg-white py-1.5 pl-1.5 pr-3 dark:border-sage-700 dark:bg-sage-700/40">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-br from-sage-600 to-sage-800 text-xs font-bold text-gold-400">
            HN
          </div>
          <div className="hidden sm:block">
            <p className="text-xs font-semibold text-sage-800 dark:text-beige-100">HN Art</p>
            <p className="text-[10px] text-sage-400">Business Owner</p>
          </div>
        </div>

        <button
          onClick={onBackToLanding}
          className="rounded-lg p-2 text-sage-500 transition hover:bg-sage-100 hover:text-sage-700 dark:hover:bg-sage-700 dark:hover:text-beige-200"
          title="Back to landing page"
        >
          <LogOut size={18} />
        </button>
      </div>
    </header>
  );
}
