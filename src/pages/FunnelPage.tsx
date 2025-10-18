import Header from '@/components/Header';
import Contact from '@/components/Contact';
import Footer from '@/components/Footer';
import Funnel from '@/components/funnel';
import { useScrollAnimation } from '@/hooks/useScrollAnimation';


const FunnelPage = () => {
  useScrollAnimation();

  return (
    <div className="min-h-screen">
     
      <main>
        <Funnel />
      </main>
     
    </div>
  );
};

export default FunnelPage;