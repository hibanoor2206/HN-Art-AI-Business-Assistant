import { Mail, MessageCircle, Instagram, ArrowUp } from 'lucide-react';
import { Logo } from './Logo';
import { TOOLS } from '../lib/tools';

const QUICK_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Products', href: '#products' },
  { label: 'AI Tools', href: '#ai-tools' },
  { label: 'About', href: '#about' },
  { label: 'Contact', href: '#contact' },
];

const PRODUCTS = [
  'Resin Art',
  'Beaded Bags',
  'Beaded Bracelets',
  'Customized Bouquets',
  'Customized Frames',
  'Personalized Gifts',
];

const SOCIALS = [
  { icon: Mail, label: 'Email', href: 'mailto:hello@hnartai.com' },
  { icon: MessageCircle, label: 'WhatsApp', href: 'https://wa.me/15550123456' },
  { icon: Instagram, label: 'Instagram', href: 'https://instagram.com/hnartai' },
];

export default function Footer() {
  const handleNavClick = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="border-t border-sage-100 bg-cream dark:border-sage-700/40 dark:bg-sage-900">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-4">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo />
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-sage-600 dark:text-sage-300">
              Crafting Creativity with the Power of AI. HN Art AI gives handmade
              business owners the tools to grow faster with less effort.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {SOCIALS.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sage-600 ring-1 ring-sage-100 transition hover:bg-sage-700 hover:text-gold-400 dark:bg-sage-800/50 dark:text-sage-300 dark:ring-sage-700/40 dark:hover:bg-sage-700"
                >
                  <social.icon size={17} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-sage-800 dark:text-beige-100">
              Quick Links
            </h3>
            <ul className="mt-4 space-y-2.5">
              {QUICK_LINKS.map((link) => (
                <li key={link.href}>
                  <button
                    onClick={() => handleNavClick(link.href)}
                    className="text-sm text-sage-600 transition hover:text-gold-600 dark:text-sage-300 dark:hover:text-gold-400"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Products */}
          <div>
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-sage-800 dark:text-beige-100">
              Products
            </h3>
            <ul className="mt-4 space-y-2.5">
              {PRODUCTS.map((product) => (
                <li key={product}>
                  <button
                    onClick={() => handleNavClick('#products')}
                    className="text-sm text-sage-600 transition hover:text-gold-600 dark:text-sage-300 dark:hover:text-gold-400"
                  >
                    {product}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* AI Tools */}
          <div>
            <h3 className="font-serif text-sm font-bold uppercase tracking-wider text-sage-800 dark:text-beige-100">
              AI Tools
            </h3>
            <ul className="mt-4 space-y-2.5">
              {TOOLS.slice(0, 6).map((tool) => (
                <li key={tool.id}>
                  <button
                    onClick={() => handleNavClick('#ai-tools')}
                    className="text-sm text-sage-600 transition hover:text-gold-600 dark:text-sage-300 dark:hover:text-gold-400"
                  >
                    {tool.shortName}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-sage-100 pt-6 sm:flex-row dark:border-sage-700/40">
          <p className="text-xs font-medium text-sage-500 dark:text-sage-400">
            © 2026 HN Art AI. All rights reserved.
          </p>
          <button
            onClick={scrollTop}
            aria-label="Back to top"
            className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-sage-600 ring-1 ring-sage-100 transition hover:bg-sage-700 hover:text-gold-400 dark:bg-sage-800/50 dark:text-sage-300 dark:ring-sage-700/40 dark:hover:bg-sage-700"
          >
            <ArrowUp size={17} />
          </button>
        </div>
      </div>
    </footer>
  );
}
