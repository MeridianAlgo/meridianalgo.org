import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X } from 'lucide-react';

interface NavLink {
  name: string;
  to: string;
  external?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { name: 'AI', to: '/ai' },
  { name: 'Contact', to: '/contact' },
];

const LEARN_LINKS: NavLink[] = [
  { name: 'Financial Tools', to: '/tools' },
  { name: 'Open Source', to: '/opensource' },
  { name: 'Newsletters', to: '/newsletters' },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [nameHidden, setNameHidden] = useState(false);
  const showHome = location.pathname !== '/';
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);
  const learnCloseTimer = useRef<number | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      setScrolled(currentScrollY > 10);
      setNameHidden(currentScrollY > 80);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 sm:px-6 md:px-8 py-6 transition-colors duration-300 ${
        scrolled
          ? 'bg-black/90 backdrop-blur-sm border-b border-white/5'
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <Link to="/" className="flex items-center flex-shrink-0">
        <img
          src="/meridianalgo.png"
          alt="Meridian Algo Logo"
          className="h-7 sm:h-8 w-auto select-none rounded-xl"
        />
        {/* Orange divider — stays fixed, fades out after word slides away */}
        <span
          className="h-6 sm:h-8 w-0.5 bg-orange-400 mx-2 sm:mx-4 flex-shrink-0"
          style={{
            opacity: nameHidden ? 0 : 1,
            transition: 'opacity 220ms ease',
            transitionDelay: nameHidden ? '360ms' : '0ms',
          }}
        />
        {/* Word slides LEFT toward orange line, clipped by overflow-hidden */}
        <div className="overflow-hidden">
          <span
            className="inline-block text-white text-lg sm:text-xl md:text-2xl font-bold tracking-tight select-none whitespace-nowrap"
            style={{
              transform: nameHidden ? 'translateX(-115%)' : 'translateX(0)',
              opacity: nameHidden ? 0 : 1,
              transition: 'transform 360ms cubic-bezier(0.4, 0, 0.15, 1), opacity 300ms ease',
              transitionDelay: nameHidden ? '0ms' : '100ms',
            }}
          >
            MeridianAlgo
          </span>
        </div>
      </Link>

      {/* Desktop nav */}
      <div className="hidden lg:flex items-center space-x-4 xl:space-x-8 flex-shrink-0">
        {showHome && (
          <>
            <Link
              to="/"
              className={`inline-flex items-center h-8 leading-none text-white text-xs xl:text-sm font-medium tracking-wide hover:text-orange-400 transition-colors duration-200 uppercase font-mono px-1 ${location.pathname === '/' ? 'text-orange-400' : ''}`}
            >
              Home
            </Link>
            <span className="mx-0.5 xl:mx-1 text-white/20 select-none" aria-hidden="true">|</span>
          </>
        )}

        <Link
          to="/about"
          className={`inline-flex items-center h-8 leading-none text-white text-xs xl:text-sm font-medium tracking-wide hover:text-orange-400 transition-colors duration-200 uppercase font-mono px-1 ${location.pathname === '/about' ? 'text-orange-400' : ''}`}
        >
          About
        </Link>
        <span className="mx-0.5 xl:mx-1 text-white/20 select-none" aria-hidden="true">|</span>

        {/* Learn dropdown */}
        <div
          className="relative"
          onMouseEnter={() => {
            if (learnCloseTimer.current) window.clearTimeout(learnCloseTimer.current);
            setLearnOpen(true);
          }}
          onMouseLeave={() => {
            if (learnCloseTimer.current) window.clearTimeout(learnCloseTimer.current);
            learnCloseTimer.current = window.setTimeout(() => setLearnOpen(false), 150);
          }}
        >
          <button
            type="button"
            onClick={() => setLearnOpen((v) => !v)}
            className={`inline-flex items-center h-8 leading-none cursor-pointer text-white text-xs xl:text-sm font-medium tracking-wide hover:text-orange-400 transition-colors duration-200 uppercase font-mono px-1 whitespace-nowrap ${
              (location.pathname === '/tools' || location.pathname === '/opensource' || location.pathname === '/newsletters') ? 'text-orange-400' : ''
            }`}
            aria-haspopup="true"
            aria-expanded={learnOpen}
          >
            Learning
          </button>
          <div
            className={`${learnOpen ? 'visible opacity-100 pointer-events-auto translate-y-0' : 'invisible opacity-0 pointer-events-none -translate-y-1'} transition-all duration-150 absolute left-1/2 -translate-x-1/2 top-full mt-2 w-48 z-50`}
            onMouseEnter={() => {
              if (learnCloseTimer.current) window.clearTimeout(learnCloseTimer.current);
              setLearnOpen(true);
            }}
            onMouseLeave={() => {
              if (learnCloseTimer.current) window.clearTimeout(learnCloseTimer.current);
              learnCloseTimer.current = window.setTimeout(() => setLearnOpen(false), 150);
            }}
          >
            <div className="bg-black border border-white/10 rounded-xl shadow-2xl py-2">
              {LEARN_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className="block px-4 py-3 text-[11px] text-gray-400 hover:text-white hover:bg-white/5 transition-colors duration-150 text-center font-mono uppercase tracking-wider"
                  onClick={() => setLearnOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
          </div>
        </div>

        <span className="mx-0.5 xl:mx-1 text-white/20 select-none" aria-hidden="true">|</span>
        {NAV_LINKS.map((link, idx) => (
          <React.Fragment key={link.name}>
            {idx !== 0 && (
              <span className="mx-0.5 xl:mx-1 text-white/20 select-none" aria-hidden="true">|</span>
            )}
            {link.external ? (
              <a
                href={link.to}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center h-8 leading-none text-white text-xs xl:text-sm font-medium tracking-wide hover:text-orange-400 transition-colors duration-200 uppercase font-mono px-1"
              >
                {link.name}
              </a>
            ) : (
              <Link
                to={link.to}
                className={`inline-flex items-center h-8 leading-none text-white text-xs xl:text-sm font-medium tracking-wide hover:text-orange-400 transition-colors duration-200 uppercase font-mono px-1 ${location.pathname === link.to ? 'text-orange-400' : ''}`}
              >
                {link.name}
              </Link>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Mobile hamburger */}
      <button
        className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-white hover:text-orange-400 hover:bg-white/5 transition-colors duration-200 flex-shrink-0"
        aria-label="Toggle menu"
        onClick={() => setMobileOpen((v) => !v)}
      >
        {mobileOpen ? <X className="w-5 h-5 sm:w-6 sm:h-6" /> : <Menu className="w-5 h-5 sm:w-6 sm:h-6" />}
      </button>

      {/* Mobile menu panel */}
      <div className={`absolute top-full left-0 w-full bg-black border-b border-white/5 lg:hidden transition-all duration-300 ${
        mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="px-4 py-4 space-y-1">
          <Link onClick={closeMobile} to="/" className={`block px-3 py-2 text-sm text-white hover:text-orange-400 transition-colors duration-150 ${location.pathname === '/' ? 'text-orange-400' : ''}`}>Home</Link>
          <Link onClick={closeMobile} to="/about" className={`block px-3 py-2 text-sm text-white hover:text-orange-400 transition-colors duration-150 ${location.pathname === '/about' ? 'text-orange-400' : ''}`}>About</Link>
          <div className="pt-2">
            <div className="px-3 text-gray-600 text-[10px] uppercase tracking-widest mb-1 font-mono">Learn</div>
            {LEARN_LINKS.map((link) => (
              <Link
                key={link.name}
                onClick={closeMobile}
                to={link.to}
                className={`block px-5 py-2 text-sm text-gray-400 hover:text-white transition-colors duration-150 ${location.pathname === link.to ? 'text-orange-400' : ''}`}
              >
                {link.name}
              </Link>
            ))}
          </div>
          {NAV_LINKS.map((link) => (
            link.external ? (
              <a key={link.name} onClick={closeMobile} href={link.to} target="_blank" rel="noopener noreferrer" className="block px-3 py-2 text-sm text-white hover:text-orange-400 transition-colors duration-150">{link.name}</a>
            ) : (
              <Link key={link.name} onClick={closeMobile} to={link.to} className={`block px-3 py-2 text-sm text-white hover:text-orange-400 transition-colors duration-150 ${location.pathname === link.to ? 'text-orange-400' : ''}`}>{link.name}</Link>
            )
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
