import { useState } from 'react';
import { Mail, MessageCircle, Instagram, Send, MapPin } from 'lucide-react';
import { supabase } from '../lib/supabase';
import { useToast } from '../lib/useToast';

const CONTACT_CARDS = [
  {
    icon: Mail,
    label: 'Email',
    value: 'hello@hnartai.com',
    href: 'mailto:hello@hnartai.com',
  },
  {
    icon: MessageCircle,
    label: 'WhatsApp',
    value: '+1 (555) 012-3456',
    href: 'https://wa.me/15550123456',
  },
  {
    icon: Instagram,
    label: 'Instagram',
    value: '@hnartai',
    href: 'https://instagram.com/hnartai',
  },
];

export default function Contact() {
  const { toast } = useToast();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) {
      toast('Please fill in all fields.', 'error');
      return;
    }

    setSubmitting(true);
    try {
      const { error } = await supabase.from('contact_submissions').insert({
        name: name.trim(),
        email: email.trim(),
        message: message.trim(),
      });

      if (error) throw error;

      toast('Message sent! We will get back to you soon.', 'success');
      setName('');
      setEmail('');
      setMessage('');
    } catch (err) {
      console.error('Contact submission error:', err);
      toast('Something went wrong. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <section id="contact" className="py-20 sm:py-24">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="overflow-hidden rounded-3xl bg-white shadow-lg ring-1 ring-sage-100 dark:bg-sage-800/50 dark:ring-sage-700/40">
          <div className="grid lg:grid-cols-2">
            {/* Left: info side */}
            <div className="relative bg-gradient-to-br from-sage-700 to-sage-900 p-8 sm:p-10 lg:p-12">
              <div className="pointer-events-none absolute inset-0 -z-0 opacity-20">
                <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-gold-400/30 blur-3xl" />
                <div className="absolute bottom-0 -left-10 h-40 w-40 rounded-full bg-gold-500/20 blur-3xl" />
              </div>

              <div className="relative">
                <p className="text-sm font-semibold uppercase tracking-wider text-gold-400">
                  Get in Touch
                </p>
                <h2 className="mt-3 font-serif text-3xl font-bold text-beige-100 sm:text-4xl">
                  Let's Talk About Your Business
                </h2>
                <p className="mt-4 text-sm leading-relaxed text-beige-100/80">
                  Have a question, a feature request, or just want to say hello? We would
                  love to hear from you. Reach out and we will respond within 24 hours.
                </p>

                {/* Contact cards */}
                <div className="mt-8 space-y-3">
                  {CONTACT_CARDS.map((card) => (
                    <a
                      key={card.label}
                      href={card.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center gap-4 rounded-xl bg-white/10 px-4 py-3.5 ring-1 ring-white/15 transition hover:bg-white/15"
                    >
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-lg bg-gold-400/20 ring-1 ring-gold-400/30">
                        <card.icon size={18} className="text-gold-400" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-xs font-medium uppercase tracking-wide text-beige-100/60">
                          {card.label}
                        </p>
                        <p className="truncate text-sm font-semibold text-beige-100">
                          {card.value}
                        </p>
                      </div>
                    </a>
                  ))}
                </div>

                {/* Location */}
                <div className="mt-8 flex items-center gap-3 text-sm text-beige-100/70">
                  <MapPin size={18} className="flex-shrink-0 text-gold-400" />
                  <span>Remote-first, serving handmade makers worldwide</span>
                </div>
              </div>
            </div>

            {/* Right: form side */}
            <div className="p-8 sm:p-10 lg:p-12">
              <h3 className="font-serif text-2xl font-bold text-sage-800 dark:text-beige-100">
                Send us a message
              </h3>
              <p className="mt-2 text-sm text-sage-600 dark:text-sage-300">
                Fill out the form below and we will be in touch shortly.
              </p>

              <form onSubmit={handleSubmit} className="mt-8 space-y-5">
                <div>
                  <label
                    htmlFor="contact-name"
                    className="mb-1.5 block text-sm font-semibold text-sage-700 dark:text-beige-100"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="w-full rounded-xl border border-sage-200 bg-cream/50 px-4 py-3 text-sm text-sage-800 placeholder-sage-400 outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 dark:border-sage-700 dark:bg-sage-900/50 dark:text-beige-100 dark:placeholder-sage-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-email"
                    className="mb-1.5 block text-sm font-semibold text-sage-700 dark:text-beige-100"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="w-full rounded-xl border border-sage-200 bg-cream/50 px-4 py-3 text-sm text-sage-800 placeholder-sage-400 outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 dark:border-sage-700 dark:bg-sage-900/50 dark:text-beige-100 dark:placeholder-sage-500"
                  />
                </div>

                <div>
                  <label
                    htmlFor="contact-message"
                    className="mb-1.5 block text-sm font-semibold text-sage-700 dark:text-beige-100"
                  >
                    Message
                  </label>
                  <textarea
                    id="contact-message"
                    rows={5}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell us how we can help..."
                    className="w-full resize-none rounded-xl border border-sage-200 bg-cream/50 px-4 py-3 text-sm text-sage-800 placeholder-sage-400 outline-none transition focus:border-gold-500 focus:ring-2 focus:ring-gold-500/20 dark:border-sage-700 dark:bg-sage-900/50 dark:text-beige-100 dark:placeholder-sage-500"
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="inline-flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-sage-700 to-sage-800 px-6 py-3.5 text-sm font-semibold text-beige-100 shadow-lg transition hover:from-sage-800 hover:to-sage-900 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
                >
                  {submitting ? (
                    <>
                      <span className="h-4 w-4 animate-spin rounded-full border-2 border-beige-100/40 border-t-beige-100" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send size={16} />
                      Send Message
                    </>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
