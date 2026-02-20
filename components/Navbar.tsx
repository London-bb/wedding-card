import React, { useState, useEffect } from 'react';
import { Menu, X, Heart } from 'lucide-react';

const Navbar: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);

    // 스크롤 감지
    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: '홈', href: '#hero' },
        { name: '모시는 글', href: '#invitation' },
        { name: '갤러리', href: '#gallery' },
        { name: '오시는 길', href: '#location' },
        { name: '방명록', href: '#guestbook' },
    ];

    const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
        e.preventDefault();
        setIsOpen(false);

        const element = document.querySelector(href);
        if (element) {
            const yOffset = -80; // 네비게이션 높이만큼 보정
            const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
            window.scrollTo({ top: y, behavior: 'smooth' });
        }
    };

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 hidden md:block ${scrolled ? 'bg-white/90 backdrop-blur-md shadow-sm py-3' : 'bg-transparent py-5'
                }`}
        >
            <div className="max-w-7xl mx-auto px-6 flex justify-between items-center">
                {/* Logo */}
                <a
                    href="#hero"
                    onClick={(e) => {
                        e.preventDefault();
                        setIsOpen(false);
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                    }}
                    className={`font-script text-2xl md:text-3xl flex items-center gap-2 ${scrolled ? 'text-stone-800' : 'text-stone-800 lg:text-white'
                        }`}
                >
                    <Heart className={`w-5 h-5 ${scrolled ? 'text-rose-400' : 'text-rose-400 lg:text-white'} fill-current`} />
                    <span>OurWedding</span>
                </a>

                {/* Desktop Menu */}
                <div className="hidden md:flex items-center gap-8">
                    {navLinks.map((link) => (
                        <a
                            key={link.name}
                            href={link.href}
                            onClick={(e) => handleLinkClick(e, link.href)}
                            className={`text-sm font-medium hover:text-rose-400 transition-colors ${scrolled ? 'text-stone-600' : 'text-stone-200 hover:text-white'
                                }`}
                        >
                            {link.name}
                        </a>
                    ))}
                </div>

                {/* Mobile Menu Button */}
                <button
                    onClick={() => setIsOpen(!isOpen)}
                    className={`md:hidden p-2 rounded-full transition-colors ${scrolled ? 'text-stone-800 hover:bg-stone-100' : 'text-stone-800 hover:bg-white/20'
                        }`}
                    aria-label="메뉴 열기"
                >
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {/* Mobile Menu Overlay */}
            {isOpen && (
                <div className="absolute top-full left-0 w-full bg-white shadow-lg md:hidden animate-slide-down border-t border-stone-100">
                    <div className="flex flex-col py-4">
                        {navLinks.map((link) => (
                            <a
                                key={link.name}
                                href={link.href}
                                onClick={(e) => handleLinkClick(e, link.href)}
                                className="px-8 py-4 text-stone-600 hover:bg-rose-50 hover:text-rose-500 font-medium border-b border-stone-50 last:border-0"
                            >
                                {link.name}
                            </a>
                        ))}
                    </div>
                </div>
            )}
        </nav>
    );
};

export default Navbar;
