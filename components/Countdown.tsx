import React, { useEffect, useState } from 'react';
import { WEDDING_DATE } from '../constants';

const Countdown: React.FC = () => {
  const [timeLeft, setTimeLeft] = useState<{days: number, hours: number, minutes: number, seconds: number}>({ days: 0, hours: 0, minutes: 0, seconds: 0 });

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = +WEDDING_DATE - +new Date();
      if (difference > 0) {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    };

    calculateTimeLeft(); // Initial call
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, []);

  const TimeUnit = ({ value, label }: { value: number, label: string }) => (
    <div className="flex flex-col items-center mx-2 md:mx-4">
      <div className="text-3xl md:text-4xl font-light text-stone-800 font-serif">
        {String(value).padStart(2, '0')}
      </div>
      <div className="text-xs uppercase tracking-widest text-stone-500 mt-1">{label}</div>
    </div>
  );

  return (
    <div className="py-12 bg-rose-50/30 flex justify-center items-center">
      <div className="flex">
        <TimeUnit value={timeLeft.days} label="Days" />
        <div className="text-2xl font-light text-stone-300 py-1">:</div>
        <TimeUnit value={timeLeft.hours} label="Hours" />
        <div className="text-2xl font-light text-stone-300 py-1">:</div>
        <TimeUnit value={timeLeft.minutes} label="Mins" />
        <div className="text-2xl font-light text-stone-300 py-1">:</div>
        <TimeUnit value={timeLeft.seconds} label="Secs" />
      </div>
    </div>
  );
};

export default Countdown;