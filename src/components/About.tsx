import { Sparkles, Zap, Target, Heart } from 'lucide-react';

const STATS = [
  { value: '10', label: 'Tools' },
  { value: 'Seconds', label: 'To Results' },
  { value: 'On-Brand', label: 'Every Time' },
  { value: 'Handmade', label: 'First Focus' },
];

const VALUES = [
  {
    icon: Zap,
    title: 'Automate the Repetitive',
    description:
      'Stop rewriting the same product descriptions and customer replies. Let AI generate them instantly while you craft.',
  },
  {
    icon: Target,
    title: 'Stay On-Brand',
    description:
      'Every piece of content is tailored to your handmade business voice — warm, authentic, and professional.',
  },
  {
    icon: Sparkles,
    title: 'Create Like a Pro',
    description:
      'Marketing ideas, SEO keywords, and business names that make your small shop look like a polished brand.',
  },
  {
    icon: Heart,
    title: 'Made for Makers',
    description:
      'Built specifically for handmade business owners — resin artists, beaders, florists, and gift creators alike.',
  },
];

export default function About() {
  return (
    <section id="about" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-16">
          {/* Left: copy + stats */}
          <div>
            <p className="text-sm font-semibold uppercase tracking-wider text-gold-600 dark:text-gold-400">
              About HN Art AI
            </p>
            <h2 className="mt-3 font-serif text-3xl font-bold leading-tight text-sage-800 dark:text-beige-100 sm:text-4xl">
              AI Built for the Hands That Make
            </h2>
            <p className="mt-5 text-base leading-relaxed text-sage-600 dark:text-sage-300">
              HN Art AI helps handmade business owners automate repetitive tasks so they
              can spend more time creating and less time on paperwork. Whether you sell
              resin art, beaded jewelry, custom bouquets, or personalized gifts, our AI
              tools handle your writing, pricing, and customer communication — turning
              hours of busywork into seconds of effortless output.
            </p>

            {/* Stats grid */}
            <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4">
              {STATS.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl bg-white p-5 text-center shadow-sm ring-1 ring-sage-100 dark:bg-sage-800/50 dark:ring-sage-700/40"
                >
                  <p className="font-serif text-2xl font-bold text-gradient-gold">
                    {stat.value}
                  </p>
                  <p className="mt-1 text-xs font-medium text-sage-500 dark:text-sage-400">
                    {stat.label}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Right: value propositions */}
          <div className="grid gap-5 sm:grid-cols-2">
            {VALUES.map((value) => (
              <article
                key={value.title}
                className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-sage-100 transition duration-300 hover:-translate-y-1 hover:shadow-lg dark:bg-sage-800/50 dark:ring-sage-700/40"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-gradient-to-br from-sage-700 to-sage-800 shadow-md ring-1 ring-gold-500/20 transition group-hover:scale-110">
                  <value.icon size={20} className="text-gold-400" />
                </div>
                <h3 className="mt-4 font-serif text-base font-bold text-sage-800 dark:text-beige-100">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm leading-relaxed text-sage-600 dark:text-sage-300">
                  {value.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
