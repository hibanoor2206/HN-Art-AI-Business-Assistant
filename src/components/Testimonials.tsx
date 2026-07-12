import { Star, Quote } from 'lucide-react';

const REVIEWS = [
  {
    name: 'Amara Okafor',
    business: 'Resin Art Studio',
    rating: 5,
    text: 'HN Art AI completely changed how I run my resin shop. Product descriptions that used to take me an hour now take seconds, and they sound exactly like my brand. My Etsy sales have doubled in three months!',
    initial: 'A',
  },
  {
    name: 'Priya Sharma',
    business: 'Beaded Creations',
    rating: 5,
    text: 'The customer reply generator is a lifesaver. I used to stress over how to respond to difficult messages, but now I get warm, professional replies in an instant. My customers feel cared for, and I save hours every week.',
    initial: 'P',
  },
  {
    name: 'Sofia Mendes',
    business: 'Custom Bouquets & Gifts',
    rating: 5,
    text: 'Instagram captions, marketing ideas, pricing — HN Art AI does it all. As a one-person business, this is like having a full marketing team in my pocket. My followers grew from 800 to 5,000 in just two months!',
    initial: 'S',
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: count }).map((_, i) => (
        <Star key={i} size={16} className="fill-gold-500 text-gold-500" />
      ))}
    </div>
  );
}

export default function Testimonials() {
  return (
    <section className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-600 dark:text-gold-400">
            Testimonials
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-sage-800 dark:text-beige-100 sm:text-4xl">
            Loved by Handmade Business Owners
          </h2>
          <p className="mt-4 text-base text-sage-600 dark:text-sage-300">
            Real stories from makers who use HN Art AI to grow their craft businesses
            every day.
          </p>
        </div>

        {/* Cards */}
        <div className="mt-14 grid gap-6 lg:grid-cols-3">
          {REVIEWS.map((review) => (
            <article
              key={review.name}
              className="relative flex flex-col rounded-2xl bg-white p-6 shadow-sm ring-1 ring-sage-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:bg-sage-800/50 dark:ring-sage-700/40"
            >
              {/* Decorative quote */}
              <Quote
                size={40}
                className="absolute right-5 top-5 text-gold-400/20"
              />

              <Stars count={review.rating} />

              <p className="mt-4 flex-1 text-sm leading-relaxed text-sage-600 dark:text-sage-300">
                "{review.text}"
              </p>

              <div className="mt-6 flex items-center gap-3 border-t border-sage-100 pt-5 dark:border-sage-700/40">
                <div className="flex h-11 w-11 items-center justify-center rounded-full bg-gradient-to-br from-sage-700 to-sage-800 font-serif text-sm font-bold text-gold-400 ring-1 ring-gold-500/20">
                  {review.initial}
                </div>
                <div>
                  <p className="font-serif text-sm font-bold text-sage-800 dark:text-beige-100">
                    {review.name}
                  </p>
                  <p className="text-xs font-medium text-sage-500 dark:text-sage-400">
                    {review.business}
                  </p>
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
