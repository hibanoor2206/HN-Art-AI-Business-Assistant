import { ArrowRight } from 'lucide-react';

const PRODUCTS = [
  {
    title: 'Resin Art',
    description:
      'Hand-poured resin creations — coasters, trays, and jewelry dishes with stunning color blends and gold accents.',
    image: 'https://images.pexels.com/photos/7256192/pexels-photo-7256192.jpeg',
  },
  {
    title: 'Beaded Bags',
    description:
      'Beautifully handcrafted beaded bags, each one a statement piece woven with care and vibrant patterns.',
    image: 'https://images.pexels.com/photos/35463677/pexels-photo-35463677.jpeg',
  },
  {
    title: 'Beaded Bracelets',
    description:
      'Elegant beaded bracelets in pearls, gemstones, and glass — perfect for everyday wear or thoughtful gifts.',
    image: 'https://images.pexels.com/photos/10835513/pexels-photo-10835513.jpeg',
  },
  {
    title: 'Customized Bouquets',
    description:
      'Personalized dried and fresh flower bouquets tailored for weddings, anniversaries, and special moments.',
    image: 'https://images.pexels.com/photos/10802091/pexels-photo-10802091.jpeg',
  },
  {
    title: 'Customized Frames',
    description:
      'Engraved and personalized photo frames that turn your favorite memories into keepsakes to treasure.',
    image: 'https://images.pexels.com/photos/13625515/pexels-photo-13625515.jpeg',
  },
  {
    title: 'Personalized Gifts',
    description:
      'Thoughtfully curated gift boxes and custom-made presents designed to make every occasion unforgettable.',
    image: 'https://images.pexels.com/photos/5486833/pexels-photo-5486833.jpeg',
  },
];

export default function Products({ onLearnMore }: { onLearnMore?: (title: string) => void }) {
  return (
    <section id="products" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Heading */}
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-sm font-semibold uppercase tracking-wider text-gold-600 dark:text-gold-400">
            Our Products
          </p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-sage-800 dark:text-beige-100 sm:text-4xl">
            Handmade Product Categories
          </h2>
          <p className="mt-4 text-base text-sage-600 dark:text-sage-300">
            Explore our six signature categories of handcrafted goods — each made with
            passion, precision, and a personal touch.
          </p>
        </div>

        {/* Grid */}
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {PRODUCTS.map((product) => (
            <article
              key={product.title}
              className="group overflow-hidden rounded-2xl bg-white shadow-sm ring-1 ring-sage-100 transition duration-300 hover:-translate-y-1.5 hover:shadow-xl dark:bg-sage-800/50 dark:ring-sage-700/40"
            >
              {/* Image */}
              <div className="relative h-56 overflow-hidden">
                <img
                  src={product.image}
                  alt={product.title}
                  loading="lazy"
                  className="h-full w-full object-cover transition duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-sage-900/30 to-transparent opacity-0 transition group-hover:opacity-100" />
              </div>

              {/* Body */}
              <div className="p-6">
                <h3 className="font-serif text-xl font-bold text-sage-800 dark:text-beige-100">
                  {product.title}
                </h3>
                <p className="mt-2.5 text-sm leading-relaxed text-sage-600 dark:text-sage-300">
                  {product.description}
                </p>
                <button
                  onClick={() => onLearnMore?.(product.title)}
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-sage-700 transition hover:text-gold-600 dark:text-beige-100 dark:hover:text-gold-400"
                >
                  Learn More
                  <ArrowRight
                    size={15}
                    className="transition group-hover:translate-x-1"
                  />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
