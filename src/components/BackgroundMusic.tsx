import React, { useState, useRef, useEffect } from 'react';
import { Music, Pause } from 'lucide-react';

const BackgroundMusic: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Helper to ensure only one instance plays
    useEffect(() => {
        audioRef.current = new Audio('/music/Whispering_Small_Island.wav');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.4;

        // Browser autoplay policy workaround - play on first interaction
        const handleAutoPlay = () => {
            if (audioRef.current && !isPlaying) {
                audioRef.current.play()
                    .then(() => {
                        setIsPlaying(true);
                        // Remove listeners once playing
                        window.removeEventListener('click', handleAutoPlay);
                        window.removeEventListener('scroll', handleAutoPlay);
                        window.removeEventListener('touchstart', handleAutoPlay);
                    })
                    .catch(e => console.log("Autoplay blocked, waiting for interaction", e));
            }
        };

        window.addEventListener('click', handleAutoPlay);
        window.addEventListener('scroll', handleAutoPlay);
        window.addEventListener('touchstart', handleAutoPlay);

        return () => {
            window.removeEventListener('click', handleAutoPlay);
            window.removeEventListener('scroll', handleAutoPlay);
            window.removeEventListener('touchstart', handleAutoPlay);
            if (audioRef.current) {
                audioRef.current.pause();
                audioRef.current = null;
            }
        }
    }, []);

    const togglePlay = () => {
        if (!audioRef.current) return;

        if (isPlaying) {
            audioRef.current.pause();
        } else {
            audioRef.current.play().catch(e => console.error("Playback failed", e));
        }
        setIsPlaying(!isPlaying);
    };

    return (
        <div className="fixed bottom-4 left-4 z-50">
            <button
                onClick={togglePlay}
                className={`w-10 h-10 rounded-full flex items-center justify-center shadow-lg transition-all ${isPlaying ? 'bg-rose-400 text-white animate-spin-slow' : 'bg-white/80 text-stone-600'}`}
                aria-label="Toggle Music"
            >
                {isPlaying ? <Pause size={16} /> : <Music size={16} />}
            </button>
            <style>{`
        @keyframes spin-slow {
            from { transform: rotate(0deg); }
            to { transform: rotate(360deg); }
        }
        .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
        }
      `}</style>
        </div>
    );
};

export default BackgroundMusic;
