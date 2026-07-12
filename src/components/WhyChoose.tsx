import { Clock, TrendingUp, MessagesSquare, PenTool } from 'lucide-react';

const REASONS = [
  {
    icon: Clock,
    title: 'Save Time',
    description:
      'Generate product descriptions, replies, and captions in seconds — reclaim hours every week to focus on your craft.',
  },
  {
    icon: TrendingUp,
    title: 'Increase Sales',
    description:
      'SEO-friendly listings, smart pricing, and scroll-stopping content that turn browsers into loyal buyers.',
  },
  {
    icon: MessagesSquare,
    title: 'Better Customer Communication',
    description:
      'Respond to inquiries instantly with warm, professional, on-brand replies that build trust and repeat business.',
  },
  {
    icon: PenTool,
    title: 'Professional Content Creation',
    description:
      'Produce polished emails, order confirmations, and gift card messages that elevate your brand image.',
  },
];

export default function WhyChoose() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-600 dark:text-gold-400">
            Why Choose HN Art AI
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-sage-800 dark:text-beige-100 sm:text-4xl">
            Everything You Need to Grow
          </h2>
          <p className="mt-4 text-base text-sage-600 dark:text-sage-300">
            Handmade business owners wear many hats. HN Art AI takes the busywork off
            your plate so you can grow faster with less effort.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {REASONS.map((reason) => (
            <article
              key={reason.title}
              className="group rounded-2xl bg-white p-6 shadow-sm ring-1 ring-sage-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:bg-sage-800/50 dark:ring-sage-700/40"
            >
              <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-gold-400/15 ring-1 ring-gold-500/20 transition group-hover:scale-110">
                <reason.icon size={22} className="text-gold-600 dark:text-gold-400" />
              </div>
              <h3 className="mt-5 font-serif text-lg font-bold text-sage-800 dark:text-beige-100">
                {reason.title}
              </h3>
              <p className="mt-2.5 text-sm leading-relaxed text-sage-600 dark:text-sage-300">
                {reason.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
