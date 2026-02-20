import React from 'react';
import Navbar from '@/components/Navbar';
import Hero from '@/components/Hero';
import InvitationText from '@/components/InvitationText';
import Gallery from '@/components/Gallery';
import Location from '@/components/Location';
import Countdown from '@/components/Countdown';
import Calendar from '@/components/Calendar';
import FallingPetals from '@/components/FallingPetals';
import GuestbookAI from '@/components/GuestbookAI';
import ContactAndAccounts from '@/components/ContactAndAccounts';
import ShareButton from '@/components/ShareButton';
import BackgroundMusic from '@/components/BackgroundMusic';
import Footer from '@/components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-stone-50 text-stone-800 font-sans selection:bg-rose-100">
      <Navbar />
      <BackgroundMusic />
      <FallingPetals />

      {/* Hero Section (Full Width) */}
      <Hero />

      {/* Main Content Area */}
      <main className="w-full relative z-10">

        {/* Invitation & Calendar Grid */}
        <section id="invitation" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="lg:grid lg:grid-cols-2 lg:gap-16 lg:items-center">
            <div className="mb-12 lg:mb-0">
              <InvitationText />
            </div>
            <div className="space-y-8">
              <Calendar />
              <Countdown />
            </div>
          </div>
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="bg-white py-20">
          <Gallery />
        </section>

        {/* Location & Contact Grid */}
        <section id="location" className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 bg-stone-50">
          <div className="lg:grid lg:grid-cols-3 lg:gap-12">
            <div className="lg:col-span-2">
              <Location />
            </div>
            <div className="mt-12 lg:mt-0 lg:col-span-1 lg:flex lg:flex-col lg:justify-center">
              <ContactAndAccounts />
            </div>
          </div>
        </section>

        {/* Guestbook Section */}
        <section id="guestbook" className="bg-rose-50/50 py-20">
          <div className="max-w-4xl mx-auto px-4">
            <GuestbookAI />
          </div>
        </section>
      </main>

      <Footer />
      <ShareButton />
    </div>
  );
}

export default App;