import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Features from './components/Features';
import HowWeWork from './components/HowWeWork';
import Portfolio from './components/Portfolio';
import CTA from './components/CTA';
import Footer from './components/Footer';

export default function App() {
  return (
    <main className="bg-gray-950 min-h-screen">
      <Navbar />
      <Hero />
      <Features />
      <HowWeWork />
      <Portfolio />
      <CTA />
      <Footer />
    </main>
  );
}
