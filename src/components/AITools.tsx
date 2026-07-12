import { ArrowRight } from 'lucide-react';
import { TOOLS } from '../lib/tools';
import { getIcon } from '../lib/icons';

export default function AITools({ onSelectTool }: { onSelectTool?: (id: string) => void }) {
  return (
    <section id="ai-tools" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-600 dark:text-gold-400">
            AI Tools
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-sage-800 dark:text-beige-100 sm:text-4xl">
            10 AI Tools to Automate Your Business
          </h2>
          <p className="mt-4 text-base text-sage-600 dark:text-sage-300">
            From product descriptions to pricing, our AI tools handle the repetitive
            work so you can focus on creating what you love.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {TOOLS.map((tool) => {
            const Icon = getIcon(tool.icon);
            return (
              <article
                key={tool.id}
                className="group flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-sage-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:bg-sage-800/50 dark:ring-sage-700/40"
              >
                {/* Icon */}
                <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-sage-700 to-sage-800 shadow-md ring-1 ring-gold-500/20 transition group-hover:scale-110">
                  <Icon size={22} className="text-gold-400" />
                </div>

                <h3 className="mt-5 font-serif text-lg font-bold leading-snug text-sage-800 dark:text-beige-100">
                  {tool.shortName}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-sage-600 dark:text-sage-300">
                  {tool.description}
                </p>

                <button
                  onClick={() => onSelectTool?.(tool.id)}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-sage-700 transition hover:text-gold-600 dark:text-beige-100 dark:hover:text-gold-400"
                >
                  Try Now
                  <ArrowRight
                    size={15}
                    className="transition group-hover:translate-x-1"
                  />
                </button>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
