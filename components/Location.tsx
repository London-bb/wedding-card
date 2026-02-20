import React, { useEffect, useRef, useState } from 'react';
import { LOCATION } from '../constants';
import { MapPin, Navigation } from 'lucide-react';

// 카카오맵 커스텀 오버레이 내용 (HTML 문자열)
// 스타일을 JS 문자열로 주입해야 하는 라이브러리 제약상 여기서 관리
const OVERLAY_CONTENT = (name: string) => `
  <div style="
    padding: 8px 12px;
    background: white;
    border: 1px solid #ddd;
    border-radius: 20px;
    font-family: sans-serif;
    font-size: 13px;
    font-weight: 600;
    color: #333;
    box-shadow: 0 2px 6px rgba(0,0,0,0.15);
    margin-bottom: 8px;
    white-space: nowrap;
  ">
    ${name.split(',')[1] || name} <span style="color:#f43f5e">♥</span>
  </div>
`;

const Location: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'kakao' | 'google'>('kakao');
  const mapContainerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (activeTab === 'kakao' && window.kakao?.maps) {
      window.kakao.maps.load(() => {
        if (!mapContainerRef.current) return;

        // 기존 지도 제거 (중복 생성 방지)
        mapContainerRef.current.innerHTML = '';

        const options = {
          center: new window.kakao.maps.LatLng(LOCATION.lat, LOCATION.lng),
          level: 4,
        };

        const map = new window.kakao.maps.Map(mapContainerRef.current, options);

        // 마커 표시
        const markerPosition = new window.kakao.maps.LatLng(LOCATION.lat, LOCATION.lng);
        const marker = new window.kakao.maps.Marker({
          position: markerPosition
        });
        marker.setMap(map);

        // 커스텀 오버레이 표시
        const customOverlay = new window.kakao.maps.CustomOverlay({
          position: markerPosition,
          content: OVERLAY_CONTENT(LOCATION.name),
          yAnchor: 2.4, // 마커보다 훨씬 위에 표시
        });
        customOverlay.setMap(map);

        // 줌 컨트롤 추가
        const zoomControl = new window.kakao.maps.ZoomControl();
        map.addControl(zoomControl, window.kakao.maps.ControlPosition.RIGHT);
      });
    }
  }, [activeTab]);

  return (
    <section className="py-20 px-4 bg-stone-50" id="location">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-serif text-stone-800 mb-8">오시는 길</h2>

        {/* 탭 버튼 */}
        <div className="flex justify-center mb-6">
          <div className="bg-white p-1 rounded-full shadow-sm border border-stone-200 inline-flex" role="tablist">
            <button
              onClick={() => setActiveTab('kakao')}
              role="tab"
              aria-selected={activeTab === 'kakao'}
              aria-controls="map-panel"
              className={`py-2 px-6 rounded-full transition-all text-sm font-medium ${activeTab === 'kakao'
                ? 'bg-stone-800 text-white shadow-sm'
                : 'text-stone-500 hover:text-stone-800'
                }`}
            >
              카카오맵
            </button>
            <button
              onClick={() => setActiveTab('google')}
              role="tab"
              aria-selected={activeTab === 'google'}
              aria-controls="map-panel"
              className={`py-2 px-6 rounded-full transition-all text-sm font-medium ${activeTab === 'google'
                ? 'bg-stone-800 text-white shadow-sm'
                : 'text-stone-500 hover:text-stone-800'
                }`}
            >
              구글 지도
            </button>
          </div>
        </div>

        {/* 지도 영역 */}
        <div
          id="map-panel"
          role="tabpanel"
          className="bg-white p-0 shadow-md rounded-2xl mb-8 overflow-hidden h-[300px] md:h-[400px] lg:h-[500px] w-full relative border border-stone-100"
        >
          {activeTab === 'kakao' ? (
            <div ref={mapContainerRef} className="w-full h-full bg-stone-100" />
          ) : (
            <iframe
              src={LOCATION.mapUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Wedding Location Map"
              className="grayscale-[20%]"
            />
          )}
        </div>

        <div className="space-y-4">
          <div className="flex flex-col items-center">
            <h3 className="text-xl font-bold text-stone-800 mb-1">{LOCATION.name}</h3>
            <p className="text-stone-600 flex items-center justify-center gap-1.5 text-sm md:text-base">
              <MapPin size={16} className="text-rose-400 shrink-0" />
              {LOCATION.address}
            </p>
          </div>

          <div className="pt-4 flex justify-center gap-3">
            {LOCATION.kakaoPlaceUrl && (
              <a
                href={LOCATION.kakaoPlaceUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 bg-[#FEE500] text-[#3C1E1E] px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-sm font-bold"
              >
                <img src="https://t1.kakaocdn.net/kakaocorp/kakaocorp/admin/service/a2a8c78b017800001.png" alt="Kakao" className="w-5 h-5 object-contain" />
                카카오맵
              </a>
            )}

            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(LOCATION.address)}`}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-white border border-stone-200 text-stone-600 px-5 py-2.5 rounded-xl shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all text-sm font-medium"
            >
              <Navigation size={16} />
              구글 지도
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;