import React from 'react';
import { LOCATION } from '../constants';
import { MapPin, Navigation } from 'lucide-react';

const Location: React.FC = () => {
  return (
    <section className="py-20 px-4 bg-stone-50">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-serif text-stone-800 mb-8">Location</h2>
        
        <div className="bg-white p-2 shadow-sm rounded-lg mb-8 overflow-hidden">
          <iframe 
            src={LOCATION.mapUrl} 
            width="100%" 
            height="300" 
            style={{ border: 0 }} 
            allowFullScreen 
            loading="lazy" 
            referrerPolicy="no-referrer-when-downgrade"
            className="rounded"
            title="Wedding Location Map"
          />
        </div>

        <div className="space-y-4">
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-semibold text-stone-800">{LOCATION.name}</h3>
            <p className="text-stone-600 mt-2 flex items-center justify-center gap-2">
              <MapPin size={16} className="text-rose-400" />
              {LOCATION.address}
            </p>
          </div>

          <div className="pt-6 flex justify-center gap-4">
            <a 
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(LOCATION.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-rose-400 text-white px-6 py-3 rounded-full shadow-lg hover:bg-rose-500 transition-colors text-sm font-medium"
            >
              <Navigation size={16} />
              Open in Google Maps
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;