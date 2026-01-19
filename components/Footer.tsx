import React from 'react';
import { Share2 } from 'lucide-react';
import { COUPLE } from '../constants';

const Footer: React.FC = () => {
  const handleShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${COUPLE.groom.firstName} & ${COUPLE.bride.firstName}'s Wedding`,
          text: 'We invite you to our wedding!',
          url: window.location.href,
        });
      } catch (error) {
        console.log('Error sharing:', error);
      }
    } else {
      alert('Link copied to clipboard!');
      navigator.clipboard.writeText(window.location.href);
    }
  };

  return (
    <footer className="bg-stone-100 py-10 px-4 text-center">
      <div className="mb-8">
        <button 
          onClick={handleShare}
          className="inline-flex items-center gap-2 text-stone-600 border border-stone-300 px-6 py-2 rounded-full hover:bg-white transition-colors text-sm"
        >
          <Share2 size={16} />
          Share Invitation
        </button>
      </div>
      
      <p className="text-stone-400 text-xs font-light">
        © 2025 {COUPLE.groom.firstName} & {COUPLE.bride.firstName}. All rights reserved.
      </p>
      <p className="text-stone-300 text-[10px] mt-2">
        Designed with Love
      </p>
    </footer>
  );
};

export default Footer;