import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Benefits from './components/Benefits';
import Inspiration from './components/Inspiration';
import Rewards from './components/Rewards';
import Organizers from './components/Organizers';
import Timeline from './components/Timeline';
import Stories from './components/Stories';
import Gallery from './components/Gallery';
import Registration from './components/Registration';
import Feedback from './components/Feedback';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';

export default function App() {
  return (
    <div className="min-h-screen bg-[#080808] overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Benefits />
        <Inspiration />
        <Rewards />
        <Organizers />
        <Timeline />
        <Stories />
        <Gallery />
        <Registration />
        <Feedback />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
