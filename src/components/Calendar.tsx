import React, { useMemo } from 'react';
import { Heart } from 'lucide-react';
import { WEDDING_DATE } from '@/config/constants';

const Calendar: React.FC = () => {
    const { year, month, daysInMonth, startDay, weddingDay } = useMemo(() => {
        const year = WEDDING_DATE.getFullYear();
        const month = WEDDING_DATE.toLocaleString('default', { month: 'long' }).toUpperCase();
        const weddingDay = WEDDING_DATE.getDate();

        // Get first day of the month (0 = Sunday, 1 = Monday, etc.)
        const firstDayOfMonth = new Date(year, WEDDING_DATE.getMonth(), 1).getDay();
        // Get total days in month
        const totalDays = new Date(year, WEDDING_DATE.getMonth() + 1, 0).getDate();

        return { year, month, daysInMonth: totalDays, startDay: firstDayOfMonth, weddingDay };
    }, []);

    const days = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

    // Generate calendar grid
    const calendarGrid = useMemo(() => {
        const grid = [];
        // Key generator for empty slots
        let keyCounter = 0;

        // Add empty slots for days before the 1st
        for (let i = 0; i < startDay; i++) {
            grid.push({ key: `empty-${keyCounter++}`, day: '', date: null });
        }

        // Add actual days
        for (let i = 1; i <= daysInMonth; i++) {
            grid.push({ key: `day-${i}`, day: i.toString(), date: i });
        }

        // Fill remaining slots to make it a nice grid (optional, but good for layout)
        while (grid.length % 7 !== 0) {
            grid.push({ key: `empty-end-${keyCounter++}`, day: '', date: null });
        }

        return grid;
    }, [daysInMonth, startDay]);

    return (
        <div className="py-8 px-6 text-center bg-white/50 rounded-lg mx-4 my-6 shadow-sm border border-stone-100">
            <h3 className="text-xl font-serif text-stone-600 mb-6 tracking-widest uppercase">
                {month} {year}
            </h3>

            <div className="grid grid-cols-7 gap-y-4 text-sm mb-4 border-b border-stone-200 pb-2">
                {days.map((d, i) => (
                    <div key={d} className={`font-semibold text-xs tracking-wider ${i === 0 ? 'text-rose-400' : 'text-stone-500'}`}>
                        {d}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7 gap-y-6 text-sm font-light text-stone-700">
                {calendarGrid.map((item, index) => {
                    if (!item.date) return <div key={item.key}></div>;

                    const isWeddingDay = item.date === weddingDay;
                    // Sunday is the 0th index in a row of 7
                    const isSunday = index % 7 === 0;

                    return (
                        <div key={item.key} className="relative flex justify-center items-center h-10 w-full">
                            {isWeddingDay && (
                                <div className="absolute inset-0 flex items-center justify-center -z-10">
                                    <Heart className="fill-rose-400 stroke-rose-400 w-10 h-10 opacity-40 animate-pulse" />
                                </div>
                            )}
                            <span className={`z-10 text-base flex items-center justify-center
                                ${isWeddingDay ? 'w-8 h-8 rounded-full bg-rose-500 text-white font-bold shadow-sm' : ''} 
                                ${isSunday && !isWeddingDay ? 'text-rose-400' : ''}
                                ${!isSunday && !isWeddingDay ? 'text-stone-700' : ''}
                            `}>
                                {item.day}
                            </span>
                        </div>
                    );
                })}
            </div>

            <div className="mt-6 text-sm text-stone-500 font-serif italic">
                We rely on your presence to make our day truly special.
            </div>
        </div>
    );
};

export default Calendar;
