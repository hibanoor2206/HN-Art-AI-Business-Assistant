import { useState, useEffect } from 'react';
import { Sidebar } from './Sidebar';
import { TopNav } from './TopNav';
import { DashboardHome } from './DashboardHome';
import { ToolPage } from './ToolPage';
import { AIChat } from './AIChat';
import { useAllChatHistory } from '../lib/useChatHistory';
import { TOOLS, getTool } from '../lib/tools';
import type { DashView } from '../types';

interface DashboardProps {
  onBackToLanding: () => void;
}

export function Dashboard({ onBackToLanding }: DashboardProps) {
  const [view, setView] = useState<DashView>('dashboard');
  const [collapsed, setCollapsed] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const { counts, refresh } = useAllChatHistory();

  useEffect(() => {
    refresh();
  }, [view, refresh]);

  function handleNavigate(v: DashView) {
    setView(v);
    setMobileOpen(false);
  }

  const viewTitles: Partial<Record<DashView, string>> = {
    dashboard: 'HN Art AI Dashboard',
    products: 'Products',
    settings: 'Settings',
    ...TOOLS.reduce((acc, t) => ({ ...acc, [t.id]: t.shortName }), {} as Record<string, string>),
  };

  const isTool = view !== 'dashboard' && view !== 'products' && view !== 'settings';
  const tool = isTool ? getTool(view) : null;

  return (
    <div className="min-h-screen bg-cream dark:bg-sage-900">
      <Sidebar
        active={view}
        onNavigate={handleNavigate}
        collapsed={collapsed}
        onToggle={() => setCollapsed(!collapsed)}
        mobileOpen={mobileOpen}
        onCloseMobile={() => setMobileOpen(false)}
        chatCounts={counts}
      />

      <div className={`transition-all duration-300 ${collapsed ? 'lg:pl-20' : 'lg:pl-64'}`}>
        <TopNav
          title={viewTitles[view] ?? 'HN Art AI Dashboard'}
          onToggleMobile={() => setMobileOpen(true)}
          onBackToLanding={onBackToLanding}
        />

        <main className="p-4 sm:p-6">
          {view === 'dashboard' && <DashboardHome onNavigate={handleNavigate} chatCounts={counts} />}
          {view === 'products' && <ProductsView />}
          {view === 'settings' && <SettingsView />}
          {isTool && tool && (
            <div className="space-y-6">
              <ToolPage toolId={tool.id} />
              <div className="rounded-2xl bg-white shadow-sm ring-1 ring-sage-100 overflow-hidden dark:bg-sage-800/50 dark:ring-sage-700/40">
                <div className="h-[500px]">
                  <AIChat toolId={tool.id} />
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}

function ProductsView() {
  const products = [
    { name: 'Resin Art', desc: 'Hand-poured resin pieces with gold flakes.', emoji: '🎨' },
    { name: 'Beaded Bags', desc: 'Intricately beaded bags with premium beads.', emoji: '👜' },
    { name: 'Beaded Bracelets', desc: 'Natural stone and pearl bracelets.', emoji: '📿' },
    { name: 'Customized Bouquets', desc: 'Personalized dried flower bouquets.', emoji: '💐' },
    { name: 'Customized Frames', desc: 'Engraved wooden photo frames.', emoji: '🖼️' },
    { name: 'Personalized Gifts', desc: 'Curated gift boxes for any occasion.', emoji: '🎁' },
  ];
  return (
    <div className="mx-auto max-w-5xl space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold text-sage-800 dark:text-beige-50">Our Products</h2>
        <p className="mt-1 text-sm text-sage-500 dark:text-sage-400">Manage your handmade product catalog</p>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {products.map((p) => (
          <div key={p.name} className="rounded-2xl bg-white p-6 shadow-sm ring-1 ring-sage-100 transition hover:shadow-md dark:bg-sage-800/50 dark:ring-sage-700/40">
            <div className="flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-sage-600 to-sage-800 text-2xl shadow-md">
              {p.emoji}
            </div>
            <h3 className="mt-4 font-serif text-lg font-semibold text-sage-800 dark:text-beige-50">{p.name}</h3>
            <p className="mt-1.5 text-sm text-sage-600 dark:text-beige-300">{p.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function SettingsView() {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div>
        <h2 className="font-serif text-2xl font-bold text-sage-800 dark:text-beige-50">Settings</h2>
        <p className="mt-1 text-sm text-sage-500 dark:text-sage-400">Manage your preferences</p>
      </div>
      <div className="space-y-4 rounded-2xl bg-white p-6 shadow-sm ring-1 ring-sage-100 dark:bg-sage-800/50 dark:ring-sage-700/40">
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-sage-700 dark:text-beige-200">Business Name</label>
          <input
            defaultValue="HN Art AI"
            className="w-full rounded-xl border border-sage-200 bg-white px-4 py-3 text-sm text-sage-800 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 dark:border-sage-700 dark:bg-sage-700/40 dark:text-beige-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-sage-700 dark:text-beige-200">Email</label>
          <input
            defaultValue="hello@hnartai.com"
            className="w-full rounded-xl border border-sage-200 bg-white px-4 py-3 text-sm text-sage-800 focus:border-gold-500 focus:outline-none focus:ring-2 focus:ring-gold-500/20 dark:border-sage-700 dark:bg-sage-700/40 dark:text-beige-100"
          />
        </div>
        <div>
          <label className="mb-1.5 block text-sm font-semibold text-sage-700 dark:text-beige-200">Brand Voice</label>
          <select className="w-full rounded-xl border border-sage-200 bg-white px-4 py-3 text-sm text-sage-800 focus:border-gold-500 focus:outline-none dark:border-sage-700 dark:bg-sage-700/40 dark:text-beige-100">
            <option>Warm & Professional</option>
            <option>Playful & Fun</option>
            <option>Luxury & Elegant</option>
            <option>Minimal & Modern</option>
          </select>
        </div>
      </div>
    </div>
  );
}
