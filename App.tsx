import React from 'react';
import Hero from './components/Hero';
import InvitationText from './components/InvitationText';
import Gallery from './components/Gallery';
import Location from './components/Location';
import Countdown from './components/Countdown';
import Calendar from './components/Calendar';
import FallingPetals from './components/FallingPetals';
import GuestbookAI from './components/GuestbookAI';
import Accounts from './components/Accounts';
import ContactHost from './components/ContactHost';
import ShareButton from './components/ShareButton';
import BackgroundMusic from './components/BackgroundMusic';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 lg:flex lg:h-screen lg:overflow-hidden">
      <BackgroundMusic />
      <FallingPetals />

      {/* Desktop Left Panel (Hero Cover) */}
      <div className="hidden lg:block lg:w-1/2 relative overflow-hidden h-full">
        <div className="absolute inset-0">
          <img
            src="https://picsum.photos/800/1200?random=10"
            alt="Wedding Cover"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-black/20" />
        </div>
        <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center p-12">
          <h1 className="font-script text-9xl mb-4 text-white drop-shadow-lg">
            We Are<br />Married
          </h1>
          <p className="text-2xl font-serif tracking-widest mt-8">
            MAY 23, 2026
          </p>
        </div>
      </div>

      {/* Main Content Area (Scrollable on Desktop) */}
      <div className="lg:w-1/2 lg:h-full lg:overflow-y-auto no-scrollbar relative w-full">
        <main className="w-full max-w-md md:max-w-2xl lg:max-w-full mx-auto bg-white shadow-2xl lg:shadow-none min-h-screen relative overflow-hidden lg:min-h-0">
          <Hero />
          <InvitationText />
          <Calendar />
          <Countdown />
          <Gallery />
          <Location />
          <Accounts />
          <GuestbookAI />
          <Footer />

          {/* Floating RSVP Button (Simulated) */}
          <div className="fixed bottom-6 right-6 z-40 md:absolute md:right-[-80px] md:bottom-10">
            {/* ... */}
          </div>
        </main>
      </div>
    </div>
  );
}

export default App;