import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';

interface NavLink {
  name: string;
  to: string;
  external?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { name: 'About', to: '/about' },
  { name: 'Open Source', to: '/opensource' },
  { name: 'Partnerships', to: '/partnerships' },
  { name: 'Newsletters', to: '/newsletters' },
  { name: 'Contact Us', to: '/contact' },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const showHome = location.pathname !== '/';
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isScrollingDown, setIsScrollingDown] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const isScrollingDownNow = currentScrollY > lastScrollY;
      
      // Update scroll direction
      if (isScrollingDownNow !== isScrollingDown && currentScrollY > 10) {
        setIsScrollingDown(isScrollingDownNow);
      }
      
      // Update navbar background
      setScrolled(currentScrollY > 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY, isScrollingDown]);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-8 py-4 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/90 backdrop-blur-sm border-b border-gray-800' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <Link to="/" className="flex items-center group focus:outline-none relative h-12">
        <img 
          src="/bitflow_logo.png" 
          alt="Meridian Algo Logo" 
          className="h-full w-auto select-none rounded-xl transition-transform duration-300 group-hover:scale-105" 
        />
        <span 
          className={`text-blue-400 text-2xl mx-2 font-mono transition-opacity duration-300 ${
            isScrollingDown ? 'opacity-0' : 'opacity-100'
          }`}
        >
          |
        </span>
        <span 
          className={`text-white text-2xl font-bold tracking-tight font-inter transition-all duration-300 ${
            isScrollingDown ? 'opacity-0 -translate-x-4' : 'opacity-100 translate-x-0'
          }`}
        >
          MeridianAlgo
        </span>
      </Link>
      <div className="flex items-center space-x-8">
        {showHome && (
          <>
            <Link
              to="/"
              className={`text-white text-sm font-semibold tracking-widest hover:text-blue-400 transition-colors duration-200 uppercase font-mono px-1 ${location.pathname === '/' ? 'text-blue-400' : ''}`}
            >
              Home
            </Link>
            <span className="mx-1 text-blue-400 select-none" aria-hidden="true">|</span>
          </>
        )}
        {NAV_LINKS.map((link, idx) => (
          <React.Fragment key={link.name}>
            {idx !== 0 && (
              <span className="mx-1 text-blue-400 select-none" aria-hidden="true">|</span>
            )}
            {link.external ? (
              <a
                href={link.to}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-sm font-semibold tracking-widest hover:text-blue-400 transition-colors duration-200 uppercase font-mono px-1"
              >
                {link.name}
              </a>
            ) : (
              <Link
                to={link.to}
                className={`text-white text-sm font-semibold tracking-widest hover:text-blue-400 transition-colors duration-200 uppercase font-mono px-1 ${location.pathname === link.to ? 'text-blue-400' : ''}`}
              >
                {link.name}
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>
    </nav>
  );
};

export default Navbar; 