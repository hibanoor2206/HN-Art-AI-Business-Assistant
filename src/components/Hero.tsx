import { ArrowRight, Sparkles, Wand2, FileText, MessageCircle, Instagram, DollarSign } from 'lucide-react';

const STATS = [
  { value: '10', label: 'AI Tools' },
  { value: '6', label: 'Handmade Product Categories' },
  { value: '24/7', label: 'AI Assistance' },
];

const MOCK_FEATURES = [
  { icon: FileText, label: 'Product Descriptions' },
  { icon: MessageCircle, label: 'Customer Replies' },
  { icon: Instagram, label: 'Instagram Captions' },
  { icon: DollarSign, label: 'Pricing Assistant' },
];

export default function Hero({
  onTryAssistant,
  onExploreProducts,
}: {
  onTryAssistant: () => void;
  onExploreProducts: () => void;
}) {
  return (
    <section id="home" className="relative overflow-hidden pt-28 pb-20 sm:pt-32 lg:pt-36">
      {/* Decorative background blobs */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -right-24 h-72 w-72 rounded-full bg-gold-400/20 blur-3xl dark:bg-gold-500/10" />
        <div className="absolute top-40 -left-24 h-72 w-72 rounded-full bg-sage-300/30 blur-3xl dark:bg-sage-700/20" />
      </div>

      <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:gap-8 lg:px-8">
        {/* Left: copy */}
        <div className="animate-fade-up">
          <div className="inline-flex items-center gap-2 rounded-full border border-gold-500/30 bg-gold-400/10 px-4 py-1.5 text-xs font-semibold text-gold-600 dark:text-gold-400">
            <Sparkles size={14} />
            AI-Powered Handmade Business Tools
          </div>

          <h1 className="mt-6 font-serif text-4xl font-bold leading-tight text-sage-800 dark:text-beige-100 sm:text-5xl lg:text-6xl">
            Grow Your Handmade Business with{' '}
            <span className="text-gradient-gold">AI</span>
          </h1>

          <p className="mt-5 max-w-xl text-base text-sage-600 dark:text-sage-300 sm:text-lg">
            Designed for handmade businesses, HN Art AI gives you the tools to create
            product descriptions, customer replies, social media captions, and more —
            so you can spend less time writing and more time crafting.
          </p>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <button
              onClick={onTryAssistant}
              className="group inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sage-700 to-sage-800 px-6 py-3.5 text-sm font-semibold text-beige-100 shadow-lg transition hover:from-sage-800 hover:to-sage-900 hover:shadow-xl"
            >
              <Wand2 size={18} />
              Try AI Assistant
              <ArrowRight size={16} className="transition group-hover:translate-x-1" />
            </button>
            <button
              onClick={onExploreProducts}
              className="inline-flex items-center justify-center gap-2 rounded-xl border border-sage-200 bg-white/70 px-6 py-3.5 text-sm font-semibold text-sage-700 transition hover:bg-white hover:shadow-md dark:border-sage-700/40 dark:bg-sage-800/50 dark:text-beige-100 dark:hover:bg-sage-800"
            >
              Explore Products
              <ArrowRight size={16} />
            </button>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <p className="font-serif text-3xl font-bold text-sage-800 dark:text-gold-400 sm:text-4xl">
                  {stat.value}
                </p>
                <p className="mt-1 text-xs font-medium text-sage-500 dark:text-sage-400 sm:text-sm">
                  {stat.label}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Right: bright workspace illustration with glassmorphism card mockup */}
        <div className="relative animate-fade-up [animation-delay:150ms]">
          <div className="relative mx-auto max-w-md">
            {/* Bright workspace backdrop */}
            <div className="absolute inset-0 -z-10 rounded-[2rem] bg-gradient-to-br from-beige-200 via-cream to-gold-400/30 shadow-2xl dark:from-sage-800 dark:via-sage-900 dark:to-sage-800" />

            {/* Floating decorative craft icons */}
            <div className="pointer-events-none absolute -top-4 -left-4 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-lg ring-1 ring-sage-100 dark:bg-sage-800/70 dark:ring-sage-700/40">
              <Wand2 size={20} className="text-gold-500" />
            </div>
            <div className="pointer-events-none absolute -bottom-3 -right-3 flex h-12 w-12 items-center justify-center rounded-2xl bg-white shadow-lg ring-1 ring-sage-100 dark:bg-sage-800/70 dark:ring-sage-700/40">
              <Sparkles size={20} className="text-gold-500" />
            </div>

            {/* Glassmorphism card mockup */}
            <div className="glass-strong rounded-[2rem] p-6 shadow-xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-sage-700 to-sage-900">
                    <Sparkles size={16} className="text-gold-400" />
                  </div>
                  <div>
                    <p className="font-serif text-sm font-bold text-sage-800 dark:text-beige-100">
                      HN Art AI
                    </p>
                    <p className="text-[10px] font-medium text-sage-500 dark:text-sage-400">
                      Smart Assistant
                    </p>
                  </div>
                </div>
                <span className="flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 text-[10px] font-semibold text-emerald-700 dark:bg-emerald-950/50 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse-dot" />
                  Online
                </span>
              </div>

              <div className="mt-5 space-y-3">
                {MOCK_FEATURES.map((feature, idx) => (
                  <div
                    key={feature.label}
                    className="flex items-center gap-3 rounded-xl bg-white/80 px-4 py-3 ring-1 ring-sage-100 transition hover:ring-gold-500/30 dark:bg-sage-800/60 dark:ring-sage-700/40"
                    style={{ animationDelay: `${idx * 80}ms` }}
                  >
                    <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-lg bg-gold-400/15">
                      <feature.icon size={16} className="text-gold-600 dark:text-gold-400" />
                    </div>
                    <span className="text-sm font-medium text-sage-700 dark:text-beige-100">
                      {feature.label}
                    </span>
                    <ArrowRight size={14} className="ml-auto text-sage-300 dark:text-sage-500" />
                  </div>
                ))}
              </div>

              {/* Fake input bar */}
              <div className="mt-5 flex items-center gap-2 rounded-xl bg-white/80 px-4 py-3 ring-1 ring-sage-100 dark:bg-sage-800/60 dark:ring-sage-700/40">
                <span className="text-xs text-sage-400 dark:text-sage-500">
                  Generate content in seconds…
                </span>
                <div className="ml-auto flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-r from-sage-700 to-sage-800">
                  <ArrowRight size={14} className="text-beige-100" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
