import React from 'react';
import { COUPLE, WEDDING_DATE, COVER_IMAGE } from '@/config/constants';

const Hero: React.FC = () => {
  const formattedDate = WEDDING_DATE.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  });

  const formattedTime = WEDDING_DATE.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });

  return (
    <section id="hero" className="relative h-screen w-full overflow-hidden flex items-center justify-center">
      {/* Background with Parallax Effect */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat bg-fixed transform scale-105"
        style={{ backgroundImage: `url(${COVER_IMAGE})` }}
      >
        <div className="absolute inset-0 bg-black/30 backdrop-blur-[1px]" />
      </div>

      {/* Content */}
      <div className="relative z-10 text-white text-center px-4 space-y-8 animate-fade-in-up max-w-4xl mx-auto">
        <div className="uppercase tracking-[0.5em] text-sm md:text-base lg:text-lg text-stone-200 font-light">
          We Are Getting Married
        </div>

        <h1 className="font-script text-7xl md:text-8xl lg:text-9xl mb-4 drop-shadow-lg leading-tight">
          {COUPLE.groom.firstName}
          <span className="text-4xl md:text-6xl px-4 font-serif italic text-rose-200">&</span>
          {COUPLE.bride.firstName}
        </h1>

        <div className="w-24 h-[1px] bg-white/60 mx-auto my-8" />

        <div className="font-serif tracking-widest space-y-2">
          <p className="text-xl md:text-3xl font-light">{formattedDate}</p>
          <p className="text-base md:text-xl text-stone-300 font-light">{formattedTime}</p>
          <p className="text-sm md:text-base text-stone-400 mt-2 font-sans tracking-wide">
            웨딩시티 신도림 11층 그랜드 볼룸
          </p>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 animate-bounce cursor-pointer opacity-70 hover:opacity-100 transition-opacity">
        <a href="#invitation" aria-label="Scroll down">
          <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </a>
      </div>
    </section>
  );
};

export default Hero;