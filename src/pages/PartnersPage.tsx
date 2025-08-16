import Header from '@/components/Header';
import Partners from '@/components/Partners';
import Footer from '@/components/Footer';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';

const PartnersPage = () => {
  useScrollAnimation();

  return (
    <div className="min-h-screen">
      <Header />
      <main className="pt-20">
        <Partners />
      </main>
      <Footer />
    </div>
  );
};

export default PartnersPage;