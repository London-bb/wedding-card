import React from 'react';
import { COUPLE, WEDDING_DATE } from '../constants';

const Hero: React.FC = () => {
  const formattedDate = WEDDING_DATE.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = WEDDING_DATE.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <section className="relative h-screen w-full overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img
          src="https://picsum.photos/800/1200?random=10"
          alt="Wedding Cover"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-black/30" />
      </div>

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-white text-center px-4 space-y-6 fade-in-up">
        <div className="uppercase tracking-[0.3em] text-xs md:text-sm text-stone-200">
          We Are Getting Married
        </div>

        <h1 className="font-script text-6xl md:text-8xl mb-2">
          {COUPLE.groom.firstName} <span className="text-4xl px-2">&</span> {COUPLE.bride.firstName}
        </h1>

        <div className="w-16 h-[1px] bg-white/70 my-4" />

        <div className="text-lg md:text-xl font-light tracking-wide">
          <p>{formattedDate}</p>
          <p className="text-sm mt-1 text-stone-200">{formattedTime}</p>
        </div>

        <div className="absolute bottom-10 animate-bounce">
          <svg className="w-6 h-6 text-white/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  );
};

export default Hero;