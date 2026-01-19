import React, { useState } from 'react';
import { Share2, Link, Check, MessageCircle } from 'lucide-react';

const ShareButton: React.FC = () => {
    const [copied, setCopied] = useState(false);

    const handleShare = async () => {
        if (navigator.share) {
            try {
                await navigator.share({
                    title: 'Wedding Invitation',
                    text: 'We invite you to our wedding!',
                    url: window.location.href,
                });
            } catch (error) {
                console.log('Error sharing:', error);
            }
        } else {
            handleCopy();
        }
    };

    const handleCopy = () => {
        navigator.clipboard.writeText(window.location.href);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
        alert('Link copied to clipboard!');
    };

    // Kakao share logic would go here if we had the SDK initialized

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col gap-3">
            <button
                onClick={handleShare}
                className="bg-stone-800 text-white p-4 rounded-full shadow-xl hover:bg-stone-700 transition-all flex items-center justify-center w-14 h-14"
                aria-label="Share"
            >
                <Share2 size={20} />
            </button>
        </div>
    );
};

export default ShareButton;
