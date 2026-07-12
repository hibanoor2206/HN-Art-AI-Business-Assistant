import { Sparkles, TrendingUp, Clock, ArrowRight, Zap, Package } from 'lucide-react';
import { TOOLS } from '../lib/tools';
import { getIcon } from '../lib/icons';
import type { DashView } from '../types';

interface DashboardHomeProps {
  onNavigate: (view: DashView) => void;
  chatCounts: Record<string, number>;
}

export function DashboardHome({ onNavigate, chatCounts }: DashboardHomeProps) {
  const totalChats = Object.values(chatCounts).reduce((a, b) => a + b, 0);

  const stats = [
    { label: 'AI Tools Available', value: String(TOOLS.length), icon: Zap, color: 'from-sage-600 to-sage-800' },
    { label: '6 Product Categories', value: '6', icon: Package, color: 'from-gold-500 to-gold-700' },
    { label: 'Chats Generated', value: String(totalChats), icon: TrendingUp, color: 'from-sage-700 to-sage-900' },
    { label: 'Time Saved', value: '~' + Math.max(totalChats * 5, 30) + 'm', icon: Clock, color: 'from-gold-600 to-gold-700' },
  ];

  return (
    <div className="space-y-6">
      {/* Welcome banner */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-sage-700 to-sage-800 p-6 text-white shadow-lg shadow-sage-700/15 sm:p-8">
        <div className="absolute right-0 top-0 h-full w-1/2 bg-gradient-to-l from-gold-500/15 to-transparent" />
        <div className="relative">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1 text-xs font-medium">
            <Sparkles size={14} className="text-gold-400" />
            AI-Powered Business Assistant
          </div>
          <h2 className="mt-4 font-serif text-2xl font-bold sm:text-3xl">Welcome to HN Art AI</h2>
          <p className="mt-2 max-w-lg text-sm text-beige-200">
            Choose from {TOOLS.length} AI tools to automate your handmade business tasks. Generate
            professional content in seconds.
          </p>
          <button
            onClick={() => onNavigate('product-description')}
            className="mt-5 inline-flex items-center gap-2 rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-sage-900 transition hover:bg-beige-100"
          >
            <Sparkles size={16} className="text-gold-600" />
            Start Generating
            <ArrowRight size={15} />
          </button>
          <p className="mt-3 text-xs font-medium text-beige-200/80">
            No signup required • Fast • AI Powered
          </p>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.label} className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-sage-100 dark:bg-sage-800/50 dark:ring-sage-700/40">
              <div className={`inline-flex rounded-xl bg-gradient-to-br ${s.color} p-2.5 shadow-md`}>
                <Icon size={20} className="text-gold-400" />
              </div>
              <p className="mt-3 text-2xl font-bold text-sage-800 dark:text-beige-50">{s.value}</p>
              <p className="mt-0.5 text-xs font-medium text-sage-500 dark:text-sage-400">{s.label}</p>
            </div>
          );
        })}
      </div>

      {/* Quick tools grid */}
      <div>
        <h3 className="font-serif text-lg font-semibold text-sage-800 dark:text-beige-50">Quick Access</h3>
        <p className="mt-0.5 text-sm text-sage-500 dark:text-sage-400">Jump into any AI tool</p>
        <div className="mt-4 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {TOOLS.map((tool) => {
            const Icon = getIcon(tool.icon);
            const count = chatCounts[tool.id];
            return (
              <button
                key={tool.id}
                onClick={() => onNavigate(tool.id)}
                className="group rounded-2xl bg-white p-5 text-left shadow-sm ring-1 ring-sage-100 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:ring-sage-200 dark:bg-sage-800/50 dark:ring-sage-700/40"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sage-600 to-sage-800 shadow-md transition group-hover:scale-110">
                    <Icon size={18} className="text-gold-400" />
                  </div>
                  {count > 0 && (
                    <span className="rounded-md bg-gold-500/20 px-1.5 py-0.5 text-[10px] font-bold text-gold-600">
                      {count}
                    </span>
                  )}
                </div>
                <p className="mt-3 text-sm font-semibold text-sage-800 dark:text-beige-50">{tool.shortName}</p>
                <p className="mt-1 text-xs leading-relaxed text-sage-500 dark:text-sage-400 line-clamp-2">
                  {tool.description}
                </p>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
