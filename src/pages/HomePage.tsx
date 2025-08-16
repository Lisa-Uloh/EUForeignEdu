import Header from '@/components/Header';
import Hero from '@/components/Hero';
import About from '@/components/About';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const HomePage = () => {
  useScrollAnimation();

  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <Hero />
        <About />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;