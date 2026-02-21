import React, { useEffect } from 'react';
import { Heart, MessageCircle } from 'lucide-react';
import { COUPLE, WEDDING_DATE, LOCATION } from '@/config/constants';

declare global {
  interface Window {
    Kakao: any;
  }
}

const Footer: React.FC = () => {
  const groomName = COUPLE.groom.firstName;
  const brideName = COUPLE.bride.firstName;

  useEffect(() => {
    // Initialize Kakao SDK
    const kakaoKey = import.meta.env.VITE_KAKAO_JAVASCRIPT_KEY || process.env.KAKAO_JAVASCRIPT_KEY;
    if (window.Kakao && !window.Kakao.isInitialized() && kakaoKey) {
      window.Kakao.init(kakaoKey);
    }
  }, []);

  const handleKakaoShare = () => {
    if (!window.Kakao) return;

    window.Kakao.Share.sendDefault({
      objectType: 'feed',
      content: {
        title: `${groomName} ♥ ${brideName} 결혼합니다`,
        description: `${WEDDING_DATE.getFullYear()}년 ${WEDDING_DATE.getMonth() + 1}월 ${WEDDING_DATE.getDate()}일\n${LOCATION.name}`,
        imageUrl: `${window.location.origin}${window.location.pathname}images/flower2.jpg`,
        link: {
          mobileWebUrl: window.location.href,
          webUrl: window.location.href,
        },
      },
      buttons: [
        {
          title: '청첩장 보기',
          link: {
            mobileWebUrl: window.location.href,
            webUrl: window.location.href,
          },
        },
      ],
    });
  };

  return (
    <footer className="py-20 px-6 text-center bg-stone-50">
      <div className="flex justify-center gap-4 mb-10">
        <button
          onClick={handleKakaoShare}
          className="flex flex-col items-center gap-2 group"
        >
          <div className="w-12 h-12 bg-[#FEE500] rounded-full flex items-center justify-center text-[#3C1E1E] shadow-sm group-hover:scale-110 transition-transform">
            <MessageCircle size={24} fill="currentColor" />
          </div>
          <span className="text-xs text-stone-500">카카오톡 공유</span>
        </button>
      </div>

      <div className="flex flex-col items-center justify-center space-y-4 mb-8">
        <div className="text-stone-300">
          <Heart size={20} fill="currentColor" />
        </div>

        <div className="font-serif text-lg tracking-widest text-stone-800">
          {groomName} & {brideName}
        </div>
      </div>

      <p className="text-stone-400 text-xs font-light">
        © 2026 {COUPLE.groom.firstName} & {COUPLE.bride.firstName}. All rights reserved.
      </p>
      <p className="text-stone-300 text-[10px] mt-2">
        Designed by {COUPLE.groom.name}{COUPLE.groom.firstName} | Music by Smilegate
      </p>
    </footer>
  );
};

export default Footer;