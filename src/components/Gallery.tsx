import React, { useState, useEffect, useRef, useCallback } from 'react';
import { GALLERY_IMAGES } from '@/config/constants';
import { X, ChevronLeft, ChevronRight, ZoomIn, Loader2 } from 'lucide-react';

const Gallery: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [lightboxLoaded, setLightboxLoaded] = useState(false);
  const [gridLoaded, setGridLoaded] = useState<boolean[]>(
    () => new Array(GALLERY_IMAGES.length).fill(false)
  );
  const touchStartX = useRef<number | null>(null);
  const thumbStripRef = useRef<HTMLDivElement>(null);

  // Pagination
  const [visibleCount, setVisibleCount] = useState(9);

  const showMoreImages = () => {
    setVisibleCount(prev => Math.min(prev + 9, GALLERY_IMAGES.length));
  };

  const openLightbox = (index: number) => {
    setLightboxLoaded(false);
    setLightboxIndex(index);
  };

  const closeLightbox = () => setLightboxIndex(null);

  const goPrev = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxLoaded(false);
    setLightboxIndex((lightboxIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  }, [lightboxIndex]);

  const goNext = useCallback(() => {
    if (lightboxIndex === null) return;
    setLightboxLoaded(false);
    setLightboxIndex((lightboxIndex + 1) % GALLERY_IMAGES.length);
  }, [lightboxIndex]);

  // 키보드 네비게이션
  useEffect(() => {
    if (lightboxIndex === null) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowLeft') goPrev();
      else if (e.key === 'ArrowRight') goNext();
      else if (e.key === 'Escape') closeLightbox();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, goPrev, goNext]);

  // Lightbox 열릴 때 body 스크롤 막기
  useEffect(() => {
    document.body.style.overflow = lightboxIndex !== null ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [lightboxIndex]);

  // 썸네일 스트립 스크롤 동기화
  useEffect(() => {
    if (lightboxIndex === null || !thumbStripRef.current) return;
    const strip = thumbStripRef.current;
    const thumb = strip.children[lightboxIndex] as HTMLElement;
    if (thumb) {
      thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [lightboxIndex]);

  // 모바일 스와이프
  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      delta < 0 ? goNext() : goPrev();
    }
    touchStartX.current = null;
  };

  const handleGridImageLoad = (index: number) => {
    setGridLoaded(prev => {
      const next = [...prev];
      next[index] = true;
      return next;
    });
  };

  return (
    <section className="py-16 bg-stone-100">
      {/* 섹션 헤더 */}
      <div className="text-center mb-10 px-4">
        <h2 className="text-3xl font-serif text-stone-800 mb-2">Gallery</h2>
        <p className="text-stone-500 text-sm">우리의 소중한 순간들</p>
        <div className="w-12 h-[1px] bg-stone-300 mx-auto mt-4" />
      </div>

      {/* Masonry 그리드 — CSS columns 기반, 사진 수 제한 없음 */}
      {/* Masonry 그리드 — CSS columns 기반, 사진 수 제한 없음 */}
      {/* Masonry 그리드 — CSS columns 기반, 사진 수 제한 없음 */}
      <div className="px-1 sm:px-2 md:px-4">
        <div className="masonry-grid columns-2 md:columns-3 lg:columns-4 xl:columns-5 gap-3 space-y-3">
          {GALLERY_IMAGES.slice(0, visibleCount).map((img, index) => (
            <div
              key={img.id}
              className="break-inside-avoid mb-1.5 md:mb-2 overflow-hidden relative group cursor-pointer animate-fade-in-up"
              onClick={() => openLightbox(index)}
              style={{ borderRadius: '3px' }}
            >
              {/* 로딩 스켈레톤 */}
              {!gridLoaded[index] && (
                <div
                  className="w-full bg-stone-200 animate-pulse"
                  style={{ height: '200px' }}
                />
              )}
              <img
                src={img.url}
                alt={img.alt}
                className={`w-full h-auto block transition-all duration-500 group-hover:brightness-90 ${gridLoaded[index] ? 'opacity-100' : 'opacity-0 absolute top-0'
                  }`}
                loading="lazy"
                decoding="async"
                onLoad={() => handleGridImageLoad(index)}
              />
              {/* 호버 오버레이 */}
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/15 transition-colors duration-300 flex items-center justify-center pointer-events-none">
                <ZoomIn
                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 drop-shadow-xl"
                  size={24}
                />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 더 보기 버튼 */}
      {visibleCount < GALLERY_IMAGES.length && (
        <div className="text-center mt-8 pb-4">
          <button
            onClick={showMoreImages}
            className="inline-flex items-center gap-2 px-6 py-3 bg-white border border-stone-200 rounded-full text-stone-600 font-medium text-sm hover:bg-rose-50 hover:text-rose-500 hover:border-rose-200 transition-all shadow-sm hover:shadow-md active:scale-95"
          >
            <span>더 많은 사진 보기</span>
            <span className="text-xs text-stone-400 bg-stone-100 px-1.5 py-0.5 rounded-md">
              {Math.min(visibleCount + 9, GALLERY_IMAGES.length)} / {GALLERY_IMAGES.length}
            </span>
          </button>
        </div>
      )}

      {/* ─── Lightbox ─── */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-black/97 flex flex-col"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* 상단 바: 카운터 + 닫기 */}
          <div className="flex items-center justify-between px-4 py-3 flex-shrink-0">
            <span className="text-white/60 text-sm tabular-nums">
              {lightboxIndex + 1} / {GALLERY_IMAGES.length}
            </span>
            <button
              className="text-white/70 hover:text-white transition-colors p-2 -mr-2"
              onClick={closeLightbox}
              aria-label="닫기"
            >
              <X size={24} />
            </button>
          </div>

          {/* 이미지 영역 */}
          <div className="flex-1 flex items-center justify-center relative min-h-0 px-12 md:px-16">
            {/* 이전 버튼 */}
            <button
              className="absolute left-1 md:left-4 text-white/50 hover:text-white transition-colors p-2 z-10"
              onClick={goPrev}
              aria-label="이전 사진"
            >
              <ChevronLeft size={32} />
            </button>

            {/* 고해상도 이미지 + 로딩 스피너 */}
            <div className="relative flex items-center justify-center w-full h-full">
              {!lightboxLoaded && (
                <div className="absolute inset-0 flex items-center justify-center">
                  <Loader2 className="text-white/40 animate-spin" size={36} />
                </div>
              )}
              <img
                key={lightboxIndex} // key 변경으로 이미지 재마운트 → onLoad 재발동
                src={GALLERY_IMAGES[lightboxIndex].url}
                alt={GALLERY_IMAGES[lightboxIndex].alt}
                className={`max-h-full max-w-full object-contain select-none transition-opacity duration-300 ${lightboxLoaded ? 'opacity-100' : 'opacity-0'
                  }`}
                draggable={false}
                onLoad={() => setLightboxLoaded(true)}
                style={{ maxHeight: 'calc(100vh - 160px)' }}
              />
            </div>

            {/* 다음 버튼 */}
            <button
              className="absolute right-1 md:right-4 text-white/50 hover:text-white transition-colors p-2 z-10"
              onClick={goNext}
              aria-label="다음 사진"
            >
              <ChevronRight size={32} />
            </button>
          </div>

          {/* 썸네일 스트립 */}
          <div
            ref={thumbStripRef}
            className="flex-shrink-0 flex gap-1.5 px-4 py-3 overflow-x-auto no-scrollbar"
          >
            {GALLERY_IMAGES.map((img, i) => (
              <button
                key={img.id}
                onClick={() => {
                  setLightboxLoaded(false);
                  setLightboxIndex(i);
                }}
                className={`flex-shrink-0 rounded overflow-hidden border-2 transition-all duration-200 ${i === lightboxIndex
                  ? 'border-white opacity-100 scale-105'
                  : 'border-transparent opacity-35 hover:opacity-60'
                  }`}
                style={{ width: '48px', height: '48px' }}
                aria-label={`${i + 1}번째 사진으로 이동`}
              >
                <img
                  src={img.url}
                  alt=""
                  className="w-full h-full object-cover"
                  loading="lazy"
                  decoding="async"
                />
              </button>
            ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default Gallery;