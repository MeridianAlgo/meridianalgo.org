import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface NavLink {
  name: string;
  to: string;
  external?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { name: 'Partnerships', to: '/partnerships' },
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

  const [mobileOpen, setMobileOpen] = useState(false);

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 sm:px-6 md:px-8 py-4 transition-all duration-300 ${
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
          className={`text-orange-400 text-2xl mx-2 font-mono transition-opacity duration-300 ${
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
      {/* Desktop nav */}
      <div className="hidden md:flex items-center space-x-8">
        {showHome && (
          <>
            <Link
              to="/"
              className={`text-white text-sm font-semibold tracking-widest hover:text-orange-400 transition-colors duration-200 uppercase font-mono px-1 ${location.pathname === '/' ? 'text-orange-400' : ''}`}
            >
              Home
            </Link>
            <span className="mx-1 text-orange-400 select-none" aria-hidden="true">|</span>
          </>
        )}

        {/* About next to Home */}
        <Link
          to="/about"
          className={`text-white text-sm font-semibold tracking-widest hover:text-orange-400 transition-colors duration-200 uppercase font-mono px-1 ${location.pathname === '/about' ? 'text-orange-400' : ''}`}
        >
          About
        </Link>
        <span className="mx-1 text-orange-400 select-none" aria-hidden="true">|</span>

        {/* Learn dropdown */}
        <div className="relative group">
          <span className={`cursor-pointer text-white text-sm font-semibold tracking-widest hover:text-orange-400 transition-colors duration-200 uppercase font-mono px-1 ${
            (location.pathname === '/opensource' || location.pathname === '/newsletters') ? 'text-orange-400' : ''
          }`}>
            Learn
          </span>
          <div className="invisible opacity-0 group-hover:visible group-hover:opacity-100 transition-all duration-200 absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-black/90 backdrop-blur-sm border border-gray-800 rounded-lg shadow-lg py-2 z-50">
            <Link
              to="/opensource"
              className="block px-4 py-2 text-sm text-white hover:bg-orange-600 hover:text-white"
            >
              Open Source
            </Link>
            <Link
              to="/newsletters"
              className="block px-4 py-2 text-sm text-white hover:bg-orange-600 hover:text-white"
            >
              Newsletters
            </Link>
          </div>
        </div>
        <span className="mx-1 text-orange-400 select-none" aria-hidden="true">|</span>
        {NAV_LINKS.map((link, idx) => (
          <React.Fragment key={link.name}>
            {idx !== 0 && (
              <span className="mx-1 text-orange-400 select-none" aria-hidden="true">|</span>
            )}
            {link.external ? (
              <a
                href={link.to}
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-sm font-semibold tracking-widest hover:text-orange-400 transition-colors duration-200 uppercase font-mono px-1"
              >
                {link.name}
              </a>
            ) : (
              <Link
                to={link.to}
                className={`text-white text-sm font-semibold tracking-widest hover:text-orange-400 transition-colors duration-200 uppercase font-mono px-1 ${location.pathname === link.to ? 'text-orange-400' : ''}`}
              >
                {link.name}
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-white hover:text-orange-400 hover:bg-white/5 transition"
        aria-label="Toggle menu"
        onClick={() => setMobileOpen((v) => !v)}
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      
      {/* Mobile menu panel */}
      {mobileOpen && (
        <div className="absolute top-full left-0 w-full bg-black/95 backdrop-blur-sm border-b border-gray-800 md:hidden">
          <div className="px-4 py-4 space-y-2">
            <Link onClick={closeMobile} to="/" className={`block px-2 py-2 text-white hover:text-orange-400 ${location.pathname === '/' ? 'text-orange-400' : ''}`}>Home</Link>
            <Link onClick={closeMobile} to="/about" className={`block px-2 py-2 text-white hover:text-orange-400 ${location.pathname === '/about' ? 'text-orange-400' : ''}`}>About</Link>
            <div className="pt-2">
              <div className="px-2 text-white/70 text-xs uppercase tracking-widest mb-1">Learn</div>
              <Link onClick={closeMobile} to="/opensource" className={`block px-4 py-2 text-white hover:text-orange-400 ${location.pathname === '/opensource' ? 'text-orange-400' : ''}`}>Open Source</Link>
              <Link onClick={closeMobile} to="/newsletters" className={`block px-4 py-2 text-white hover:text-orange-400 ${location.pathname === '/newsletters' ? 'text-orange-400' : ''}`}>Newsletters</Link>
            </div>
            {NAV_LINKS.map((link) => (
              link.external ? (
                <a key={link.name} onClick={closeMobile} href={link.to} target="_blank" rel="noopener noreferrer" className="block px-2 py-2 text-white hover:text-orange-400">{link.name}</a>
              ) : (
                <Link key={link.name} onClick={closeMobile} to={link.to} className={`block px-2 py-2 text-white hover:text-orange-400 ${location.pathname === link.to ? 'text-orange-400' : ''}`}>{link.name}</Link>
              )
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;