import Navbar from './Navbar';
import Hero from './Hero';
import Products from './Products';
import AITools from './AITools';
import WhyChoose from './WhyChoose';
import About from './About';
import Testimonials from './Testimonials';
import Contact from './Contact';
import Footer from './Footer';

interface LandingPageProps {
  onGetStarted: () => void;
}

export default function LandingPage({ onGetStarted }: LandingPageProps) {
  const scrollTo = (href: string) => {
    document.querySelector(href)?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-cream dark:bg-sage-900">
      <Navbar onGetStarted={onGetStarted} />
      <main>
        <Hero
          onTryAssistant={onGetStarted}
          onExploreProducts={() => scrollTo('#products')}
        />
        <Products />
        <AITools onSelectTool={onGetStarted} />
        <WhyChoose />
        <About />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
