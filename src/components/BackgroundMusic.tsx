import React, { useState, useRef, useEffect } from 'react';
import { Music, Pause } from 'lucide-react';

const BackgroundMusic: React.FC = () => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef<HTMLAudioElement | null>(null);

    // Helper to ensure only one instance plays
    useEffect(() => {
        audioRef.current = new Audio('https://cdn.pixabay.com/download/audio/2022/03/10/audio_c8c8a73467.mp3?filename=piano-moment-11993.mp3');
        audioRef.current.loop = true;
        audioRef.current.volume = 0.5;

        return () => {
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
