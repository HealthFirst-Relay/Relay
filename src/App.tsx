import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import EventBasics from './components/EventBasics';
import About from './components/About';
import Benefits from './components/Benefits';
import Inspiration from './components/Inspiration';
import Timeline from './components/Timeline';
import Registration from './components/Registration';
import Feedback from './components/Feedback';
import FAQ from './components/FAQ';
import Footer from './components/Footer';
import ScrollProgress from './components/ScrollProgress';

const REGISTRATION_STORAGE_KEY = 'hfrm_registrations';

function getRegistrationCount() {
  try {
    const list = JSON.parse(localStorage.getItem(REGISTRATION_STORAGE_KEY) || '[]');
    return Array.isArray(list) ? list.length : 0;
  } catch {
    return 0;
  }
}

export default function App() {
  const [participantCount, setParticipantCount] = useState(0);

  useEffect(() => {
    setParticipantCount(getRegistrationCount());

    const onRegistrationSaved = () => setParticipantCount(getRegistrationCount());
    window.addEventListener('hfrm:registration-saved', onRegistrationSaved);
    return () => window.removeEventListener('hfrm:registration-saved', onRegistrationSaved);
  }, []);

  return (
    <div className="min-h-screen bg-[#0f120e] overflow-x-hidden">
      <ScrollProgress />
      <Navbar />
      <main>
        <Hero participantCount={participantCount} />
        <EventBasics />
        <About participantCount={participantCount} />
        <Benefits />
        <Inspiration />
        <Timeline />
        <Registration onRegistered={setParticipantCount} />
        <Feedback />
        <FAQ />
      </main>
      <Footer />
    </div>
  );
}
