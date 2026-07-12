import { Home, Package, Settings, ChevronLeft, X } from 'lucide-react';
import { TOOLS } from '../lib/tools';
import { getIcon } from '../lib/icons';
import { Logo } from './Logo';
import type { DashView } from '../types';

interface SidebarProps {
  active: DashView;
  onNavigate: (view: DashView) => void;
  collapsed: boolean;
  onToggle: () => void;
  mobileOpen: boolean;
  onCloseMobile: () => void;
  chatCounts: Record<string, number>;
}

const NAV_MAIN = [
  { id: 'dashboard' as const, label: 'Dashboard', icon: Home },
  { id: 'products' as const, label: 'Products', icon: Package },
];

const NAV_TOOLS = TOOLS.map((t) => ({ id: t.id, label: t.shortName, icon: getIcon(t.icon) }));

const NAV_BOTTOM = [
  { id: 'settings' as const, label: 'Settings', icon: Settings },
];

export function Sidebar({
  active,
  onNavigate,
  collapsed,
  onToggle,
  mobileOpen,
  onCloseMobile,
  chatCounts,
}: SidebarProps) {
  return (
    <>
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 bg-sage-900/40 backdrop-blur-sm lg:hidden"
          onClick={onCloseMobile}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex flex-col border-r border-sage-200/60 bg-white/90 backdrop-blur-xl transition-all duration-300 dark:border-sage-700/50 dark:bg-sage-800/70 ${
          collapsed ? 'w-20' : 'w-64'
        } ${mobileOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
      >
        <div className="flex h-16 items-center justify-between border-b border-sage-200/60 px-4 dark:border-sage-700/50">
          {collapsed ? (
            <div className="mx-auto flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-sage-700 to-sage-900 shadow-md">
              <span className="font-serif text-lg font-bold text-gold-400">H</span>
            </div>
          ) : (
            <Logo size="sm" />
          )}
          <button
            onClick={onCloseMobile}
            className="rounded-lg p-1.5 text-sage-500 transition hover:bg-sage-100 dark:hover:bg-sage-700"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto scrollbar-thin px-3 py-4">
          <div className="space-y-1">
            {NAV_MAIN.map((item) => {
              const Icon = item.icon;
              return (
                <NavItem
                  key={item.id}
                  label={item.label}
                  icon={Icon}
                  active={active === item.id}
                  collapsed={collapsed}
                  onClick={() => onNavigate(item.id)}
                />
              );
            })}
          </div>

          {!collapsed && (
            <p className="mb-2 mt-6 px-3 text-[10px] font-bold uppercase tracking-wider text-sage-400 dark:text-sage-500">
              AI Tools
            </p>
          )}
          <div className="space-y-1">
            {NAV_TOOLS.map((item) => {
              const Icon = item.icon;
              const count = chatCounts[item.id as string];
              return (
                <NavItem
                  key={item.id}
                  label={item.label}
                  icon={Icon}
                  active={active === item.id}
                  collapsed={collapsed}
                  badge={count}
                  onClick={() => onNavigate(item.id as DashView)}
                />
              );
            })}
          </div>

          <div className="mt-6 space-y-1">
            {!collapsed && (
              <p className="mb-2 px-3 text-[10px] font-bold uppercase tracking-wider text-sage-400 dark:text-sage-500">
                System
              </p>
            )}
            {NAV_BOTTOM.map((item) => {
              const Icon = item.icon;
              return (
                <NavItem
                  key={item.id}
                  label={item.label}
                  icon={Icon}
                  active={active === item.id}
                  collapsed={collapsed}
                  onClick={() => onNavigate(item.id)}
                />
              );
            })}
          </div>
        </nav>

        <div className="hidden border-t border-sage-200/60 p-3 dark:border-sage-700/50 lg:block">
          <button
            onClick={onToggle}
            className="flex w-full items-center justify-center gap-2 rounded-lg py-2 text-sm font-medium text-sage-500 transition hover:bg-sage-100 hover:text-sage-700 dark:hover:bg-sage-700 dark:hover:text-beige-200"
          >
            <ChevronLeft size={18} className={`transition-transform ${collapsed ? 'rotate-180' : ''}`} />
            {!collapsed && <span>Collapse</span>}
          </button>
        </div>
      </aside>
    </>
  );
}

function NavItem({
  label,
  icon: Icon,
  active,
  collapsed,
  badge,
  onClick,
}: {
  label: string;
  icon: typeof Home;
  active: boolean;
  collapsed: boolean;
  badge?: number;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      title={collapsed ? label : undefined}
      className={`group flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium transition-all ${
        active
          ? 'bg-gradient-to-r from-sage-700 to-sage-800 text-white shadow-md'
          : 'text-sage-600 hover:bg-sage-100 hover:text-sage-800 dark:text-beige-300 dark:hover:bg-sage-700 dark:hover:text-beige-100'
      }`}
    >
      <Icon size={18} className={`flex-shrink-0 ${active ? 'text-gold-400' : ''}`} />
      {!collapsed && <span className="flex-1 truncate text-left">{label}</span>}
      {!collapsed && badge !== undefined && badge > 0 && (
        <span className={`rounded-md px-1.5 py-0.5 text-[10px] font-bold ${active ? 'bg-white/20 text-white' : 'bg-gold-500/20 text-gold-600'}`}>
          {badge}
        </span>
      )}
    </button>
  );
}
