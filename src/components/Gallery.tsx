import React, { useState, useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';
import { GALLERY_IMAGES } from '@/config/constants';
import { X, ChevronLeft, ChevronRight, ZoomIn, Loader2 } from 'lucide-react';

interface GridItemProps {
  img: typeof GALLERY_IMAGES[0];
  index: number;
  onOpen: (index: number, isSingle?: boolean) => void;
  orientation: 'landscape' | 'portrait' | 'square' | undefined;
  isLoaded: boolean;
  onLoad: (id: number) => void;
  getBentoSpan: (imgId: number) => string;
  isSingleRequest?: boolean;
}

const GridItem: React.FC<GridItemProps> = ({ img, index, onOpen, orientation, isLoaded, onLoad, getBentoSpan, isSingleRequest }) => (
  <div
    className={`relative overflow-hidden group cursor-pointer border border-stone-100 ${getBentoSpan(img.id)} ${orientation === 'portrait' ? 'min-h-[280px]' : 'min-h-[140px]'}`}
    onClick={() => onOpen(index, isSingleRequest)}
  >
    {!isLoaded && (
      <div className="absolute inset-0 bg-stone-100 animate-pulse" />
    )}
    <img
      src={img.url}
      alt={img.alt}
      className={`w-full h-full object-cover transition-all duration-700 group-hover:scale-105 group-hover:brightness-90 ${isLoaded && orientation ? 'opacity-100' : 'opacity-0'}`}
      loading="lazy"
      onLoad={() => onLoad(img.id)}
    />
    <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-black/5 pointer-events-none">
      <div className="bg-white/20 backdrop-blur-sm p-3 rounded-full border border-white/30 shadow-xl">
        <ZoomIn className="text-white drop-shadow-md" size={24} />
      </div>
    </div>
  </div>
);

const Gallery: React.FC = () => {
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isSingleView, setIsSingleView] = useState(false);
  const [lightboxLoaded, setLightboxLoaded] = useState(false);
  const [gridLoaded, setGridLoaded] = useState<Record<number, boolean>>({});
  const touchStartX = useRef<number | null>(null);
  const thumbStripRef = useRef<HTMLDivElement>(null);

  // State for specialized landing view
  const [isLandingOpen, setIsLandingOpen] = useState(false);

  // Bento Grid with Orientation Detection (global for all images)
  const [orientations, setOrientations] = useState<Record<number, 'landscape' | 'portrait' | 'square'>>({});

  useEffect(() => {
    GALLERY_IMAGES.forEach(img => {
      if (orientations[img.id]) return;
      const i = new Image();
      i.src = img.url;
      i.onload = () => {
        const ratio = i.width / i.height;
        let orientation: 'landscape' | 'portrait' | 'square';
        if (ratio > 1.25) orientation = 'landscape';
        else if (ratio < 0.8) orientation = 'portrait';
        else orientation = 'square';
        setOrientations(prev => ({ ...prev, [img.id]: orientation }));
      };
    });
  }, [orientations]);

  // History management
  useEffect(() => {
    const handlePopState = () => {
      if (isLandingOpen) setIsLandingOpen(false);
      if (lightboxIndex !== null) setLightboxIndex(null);
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, [isLandingOpen, lightboxIndex]);

  const openLanding = () => {
    setIsLandingOpen(true);
    window.history.pushState({ gallery: 'landing' }, '');
  };

  const closeLanding = () => {
    setIsLandingOpen(false);
    if (window.history.state?.gallery === 'landing') window.history.back();
  };

  const openLightbox = (index: number, single: boolean = false) => {
    setLightboxLoaded(false);
    setIsSingleView(single);
    setLightboxIndex(index);
  };

  const closeLightbox = () => {
    setLightboxIndex(null);
    setIsSingleView(false);
  };

  const getBentoSpan = (imgId: number) => {
    const orientation = orientations[imgId];
    if (orientation === 'landscape') return 'col-span-2 row-span-1';
    if (orientation === 'portrait') return 'col-span-1 row-span-2';
    return 'col-span-1 row-span-1';
  };

  const goPrev = useCallback(() => {
    if (lightboxIndex === null || isSingleView) return;
    setLightboxLoaded(false);
    setLightboxIndex((lightboxIndex - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length);
  }, [lightboxIndex, isSingleView]);

  const goNext = useCallback(() => {
    if (lightboxIndex === null || isSingleView) return;
    setLightboxLoaded(false);
    setLightboxIndex((lightboxIndex + 1) % GALLERY_IMAGES.length);
  }, [lightboxIndex, isSingleView]);

  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (lightboxIndex !== null) {
        if (!isSingleView) {
          if (e.key === 'ArrowLeft') goPrev();
          else if (e.key === 'ArrowRight') goNext();
        }
        if (e.key === 'Escape') closeLightbox();
      } else if (isLandingOpen && e.key === 'Escape') {
        closeLanding();
      }
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [lightboxIndex, isLandingOpen, isSingleView, goPrev, goNext]);

  useEffect(() => {
    const shouldLock = lightboxIndex !== null || isLandingOpen;
    document.body.style.overflow = shouldLock ? 'hidden' : '';
    const navbar = document.querySelector('nav');
    if (navbar) navbar.style.display = shouldLock ? 'none' : '';
    return () => {
      document.body.style.overflow = '';
      if (navbar) navbar.style.display = '';
    };
  }, [lightboxIndex, isLandingOpen]);

  useEffect(() => {
    if (lightboxIndex === null || isSingleView || !thumbStripRef.current) return;
    const strip = thumbStripRef.current;
    const thumb = strip.children[lightboxIndex] as HTMLElement;
    if (thumb) thumb.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
  }, [lightboxIndex, isSingleView]);

  const handleTouchStart = (e: React.TouchEvent) => {
    if (isSingleView) return;
    touchStartX.current = e.touches[0].clientX;
  };
  const handleTouchEnd = (e: React.TouchEvent) => {
    if (isSingleView || touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      delta < 0 ? goNext() : goPrev();
    }
    touchStartX.current = null;
  };

  const handleGridImageLoad = (id: number) => {
    setGridLoaded(prev => ({ ...prev, [id]: true }));
  };

  const PREVIEW_COUNT = 12;
  const previewImages = GALLERY_IMAGES.slice(0, PREVIEW_COUNT);

  return (
    <section id="gallery" className="py-20 bg-stone-50 overflow-hidden">
      <div className="text-center mb-16 px-4">
        <h2 className="text-3xl font-serif text-stone-800 mb-3 tracking-widest uppercase">Gallery</h2>
        <div className="w-8 h-[1px] bg-stone-300 mx-auto mb-4" />
        <p className="text-stone-400 text-sm font-light">우리의 소중한 순간들</p>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6">
        <div className="grid grid-cols-3 grid-flow-dense gap-1.5">
          {previewImages.map((img, idx) => (
            <GridItem
              key={img.id}
              img={img}
              index={idx}
              onOpen={openLightbox}
              orientation={orientations[img.id]}
              isLoaded={gridLoaded[img.id] || false}
              onLoad={handleGridImageLoad}
              getBentoSpan={getBentoSpan}
              isSingleRequest={true} // 메인 그리드에서는 단일 보기로 시작
            />
          ))}
        </div>

        <div className="mt-12 text-center">
          <button
            onClick={openLanding}
            className="inline-flex items-center gap-2 px-10 py-4 border border-stone-200 rounded-full text-stone-600 text-[11px] tracking-[0.2em] font-light hover:bg-stone-800 hover:text-white hover:border-stone-800 transition-all duration-500 group shadow-sm bg-white"
          >
            SEE MORE
            <ChevronRight size={14} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {typeof document !== 'undefined' && createPortal(
        <>
          {isLandingOpen && (
            <div className="fixed inset-0 z-[1000] bg-white overflow-y-auto animate-slideUp">
              <div className="sticky top-0 z-[1010] bg-white/95 backdrop-blur-md px-5 py-4 border-b border-stone-100 flex items-center justify-between shadow-sm">
                <h3 className="text-lg font-serif tracking-widest text-stone-800 uppercase">Gallery</h3>
                <button
                  onClick={closeLanding}
                  className="flex items-center gap-2 text-[11px] tracking-widest text-stone-500 hover:text-stone-900 transition-colors"
                >
                  <span className="font-light">CLOSE</span>
                  <X size={20} strokeWidth={1.5} />
                </button>
              </div>

              <div className="max-w-5xl mx-auto px-4 py-12 pb-32">
                <div className="grid grid-cols-3 grid-flow-dense gap-2 md:gap-3">
                  {GALLERY_IMAGES.map((img, idx) => (
                    <GridItem
                      key={img.id}
                      img={img}
                      index={idx}
                      onOpen={openLightbox}
                      orientation={orientations[img.id]}
                      isLoaded={gridLoaded[img.id] || false}
                      onLoad={handleGridImageLoad}
                      getBentoSpan={getBentoSpan}
                      isSingleRequest={false} // 전체 갤러리에서는 탐색 가능하게
                    />
                  ))}
                </div>
                <div className="mt-20 text-center">
                  <p className="text-stone-300 text-[10px] tracking-[0.2em] mb-6 uppercase">Our Wedding Days</p>
                  <button
                    onClick={closeLanding}
                    className="px-12 py-4.5 bg-stone-900 text-white rounded-full text-xs tracking-[0.3em] font-light hover:bg-stone-800 transition-all shadow-2xl active:scale-95 uppercase"
                  >
                    Back to Invitation
                  </button>
                </div>
              </div>
            </div>
          )}

          {lightboxIndex !== null && (
            <div
              className={`fixed inset-0 z-[2000] flex flex-col ${isSingleView ? 'bg-black/90 backdrop-blur-sm' : 'bg-black'}`}
              onTouchStart={handleTouchStart}
              onTouchEnd={handleTouchEnd}
            >
              <div className="flex items-center justify-between px-4 py-3 flex-shrink-0 z-[2010]">
                {!isSingleView ? (
                  <span className="text-white/60 text-sm tabular-nums">
                    {lightboxIndex + 1} / {GALLERY_IMAGES.length}
                  </span>
                ) : <div />}
                <button
                  className="text-white/70 hover:text-white transition-colors p-2 bg-white/10 rounded-full"
                  onClick={closeLightbox}
                >
                  <X size={24} />
                </button>
              </div>

              <div className="flex-1 flex items-center justify-center relative px-4 md:px-16 overflow-hidden">
                {!isSingleView && (
                  <>
                    <button
                      className="absolute left-2 text-white/40 hover:text-white transition-colors p-2 z-20 hidden md:block"
                      onClick={goPrev}
                    >
                      <ChevronLeft size={40} />
                    </button>
                    <button
                      className="absolute right-2 text-white/40 hover:text-white transition-colors p-2 z-20 hidden md:block"
                      onClick={goNext}
                    >
                      <ChevronRight size={40} />
                    </button>
                  </>
                )}

                <div className="relative flex items-center justify-center w-full h-full p-4">
                  {!lightboxLoaded && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Loader2 className="text-white/20 animate-spin" size={40} />
                    </div>
                  )}
                  <img
                    key={lightboxIndex}
                    src={GALLERY_IMAGES[lightboxIndex].url}
                    alt={GALLERY_IMAGES[lightboxIndex].alt}
                    className={`max-h-full max-w-full object-contain transition-opacity duration-300 shadow-2xl ${lightboxLoaded ? 'opacity-100' : 'opacity-0'}`}
                    onLoad={() => setLightboxLoaded(true)}
                  />
                </div>
              </div>

              {!isSingleView && (
                <div
                  ref={thumbStripRef}
                  className="flex-shrink-0 flex gap-2 px-4 py-6 overflow-x-auto no-scrollbar bg-black/40 backdrop-blur-sm"
                >
                  {GALLERY_IMAGES.map((img, i) => (
                    <button
                      key={img.id}
                      onClick={() => { setLightboxLoaded(false); setLightboxIndex(i); }}
                      className={`flex-shrink-0 rounded-sm overflow-hidden border-2 transition-all ${i === lightboxIndex ? 'border-white scale-110' : 'border-transparent opacity-40 hover:opacity-100'}`}
                      style={{ width: '50px', height: '50px' }}
                    >
                      <img src={img.url} alt="" className="w-full h-full object-cover" loading="lazy" />
                    </button>
                  ))}
                </div>
              )}
            </div>
          )}
        </>,
        document.body
      )}
    </section>
  );
};

export default Gallery;