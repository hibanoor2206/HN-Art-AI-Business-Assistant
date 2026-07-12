import { useState, useEffect } from 'react';
import { Menu, X, Moon, Sun, ArrowRight } from 'lucide-react';
import { useTheme } from '../lib/useTheme';
import { Logo } from './Logo';

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Products', href: '#products' },
  { label: 'AI Tools', href: '#ai-tools' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

export default function Navbar({ onGetStarted }: { onGetStarted: () => void }) {
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    const el = document.querySelector(href);
    el?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-300 ${
        scrolled ? 'glass shadow-sm' : 'bg-transparent'
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo onClick={() => handleNavClick('#home')} />

        {/* Desktop nav links */}
        <ul className="hidden items-center gap-1 md:flex">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <button
                onClick={() => handleNavClick(link.href)}
                className="rounded-lg px-4 py-2 text-sm font-medium text-sage-600 transition hover:bg-sage-100/70 hover:text-sage-800 dark:text-sage-300 dark:hover:bg-sage-700/40 dark:hover:text-beige-100"
              >
                {link.label}
              </button>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggle}
            aria-label="Toggle theme"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-sage-600 transition hover:bg-sage-100/70 hover:text-sage-800 dark:text-sage-300 dark:hover:bg-sage-700/40 dark:hover:text-gold-400"
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          <button
            onClick={onGetStarted}
            className="hidden items-center gap-1.5 rounded-lg bg-gradient-to-r from-sage-700 to-sage-800 px-4 py-2 text-sm font-semibold text-beige-100 shadow-md transition hover:from-sage-800 hover:to-sage-900 hover:shadow-lg sm:flex"
          >
            Get Started
            <ArrowRight size={15} />
          </button>

          {/* Mobile menu toggle */}
          <button
            onClick={() => setMobileOpen((p) => !p)}
            aria-label="Toggle menu"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-sage-700 transition hover:bg-sage-100/70 dark:text-beige-100 dark:hover:bg-sage-700/40 md:hidden"
          >
            {mobileOpen ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden">
          <div className="glass mx-4 mb-3 rounded-2xl p-4 shadow-lg">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="w-full rounded-lg px-4 py-2.5 text-left text-sm font-medium text-sage-600 transition hover:bg-sage-100/70 hover:text-sage-800 dark:text-sage-300 dark:hover:bg-sage-700/40 dark:hover:text-beige-100"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
            <button
              onClick={() => {
                setMobileOpen(false);
                onGetStarted();
              }}
              className="mt-3 flex w-full items-center justify-center gap-1.5 rounded-lg bg-gradient-to-r from-sage-700 to-sage-800 px-4 py-2.5 text-sm font-semibold text-beige-100 shadow-md transition hover:from-sage-800 hover:to-sage-900"
            >
              Get Started
              <ArrowRight size={15} />
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
