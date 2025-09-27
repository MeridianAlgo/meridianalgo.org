import React from 'react';
import { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, User, LogOut } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import AuthModal from './AuthModal';

interface NavLink {
  name: string;
  to: string;
  external?: boolean;
}

const NAV_LINKS: NavLink[] = [
  { name: 'Partnerships', to: '/partnerships' },
  { name: 'Contact', to: '/contact' },
];

const LEARN_LINKS: NavLink[] = [
  { name: 'Financial Literacy', to: '/financial-literacy' },
  { name: 'Open Source', to: '/opensource' },
  { name: 'Newsletters', to: '/newsletters' },
  { name: 'Research', to: '/research' },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const showHome = location.pathname !== '/';
  const [lastScrollY, setLastScrollY] = useState(0);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [learnOpen, setLearnOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const learnCloseTimer = useRef<number | null>(null);
  const userMenuTimer = useRef<number | null>(null);
  const { user, isAuthenticated, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Update navbar background
      setScrolled(currentScrollY > 10);
      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  const closeMobile = () => setMobileOpen(false);

  return (
    <nav 
      className={`fixed top-0 left-0 w-full z-50 flex items-center justify-between px-4 sm:px-6 md:px-8 py-6 transition-all duration-300 ${
        scrolled 
          ? 'bg-black/90 backdrop-blur-sm border-b border-gray-800' 
          : 'bg-transparent border-b border-transparent'
      }`}
    >
      <Link to="/" className="flex items-center group">
        <img 
          src="/bitflow_logo.png" 
          alt="Meridian Algo Logo" 
          className="h-8 w-auto select-none rounded-xl transition-transform duration-300 group-hover:scale-105" 
        />
        <div className="flex items-center">
          <span className="h-8 w-0.5 bg-orange-400 mx-4"></span>
          <span className="text-white text-2xl font-bold tracking-tight font-inter">
            MeridianAlgo
          </span>
        </div>
      </Link>

      {/* Desktop nav */}
      <div className="hidden md:flex items-center space-x-8">
        {showHome && (
          <>
            <Link
              to="/"
              className={`inline-flex items-center h-8 leading-none text-white text-sm font-medium tracking-wide hover:text-orange-400 transition-colors duration-200 uppercase font-mono px-1 ${location.pathname === '/' ? 'text-orange-400' : ''}`}
            >
              Home
            </Link>
            <span className="mx-1 text-orange-400 select-none" aria-hidden="true">|</span>
          </>
        )}

        {/* About next to Home */}
        <Link
          to="/about"
          className={`inline-flex items-center h-8 leading-none text-white text-sm font-medium tracking-wide hover:text-orange-400 transition-colors duration-200 uppercase font-mono px-1 ${location.pathname === '/about' ? 'text-orange-400' : ''}`}
        >
          About
        </Link>
        <span className="mx-1 text-orange-400 select-none" aria-hidden="true">|</span>

        {/* Learn dropdown */}
        <div 
          className="relative group"
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
            className={`inline-flex items-center h-8 leading-none cursor-pointer text-white text-sm font-medium tracking-wide hover:text-orange-400 transition-colors duration-200 uppercase font-mono px-1 ${
              (location.pathname === '/financial-literacy' || location.pathname === '/opensource' || location.pathname === '/newsletters' || location.pathname === '/research') ? 'text-orange-400' : ''
            }`}
            aria-haspopup="true"
            aria-expanded={learnOpen}
          >
            Learn
          </button>
          <div 
            className={`${learnOpen ? 'visible opacity-100 pointer-events-auto' : 'invisible opacity-0 pointer-events-none'} transition-opacity duration-150 absolute left-1/2 -translate-x-1/2 top-full mt-0 w-48 z-50`}
            onMouseEnter={() => {
              if (learnCloseTimer.current) window.clearTimeout(learnCloseTimer.current);
              setLearnOpen(true);
            }}
            onMouseLeave={() => {
              if (learnCloseTimer.current) window.clearTimeout(learnCloseTimer.current);
              learnCloseTimer.current = window.setTimeout(() => setLearnOpen(false), 150);
            }}
          >
            <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-800 rounded-xl shadow-2xl p-4 space-y-2">
              {LEARN_LINKS.map((link) => (
                <Link
                  key={link.name}
                  to={link.to}
                  className="block px-4 py-3 text-sm text-white hover:text-orange-400 hover:bg-gray-800/50 rounded-lg transition-colors text-center"
                  onClick={() => setLearnOpen(false)}
                >
                  {link.name}
                </Link>
              ))}
            </div>
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
                className="inline-flex items-center h-8 leading-none text-white text-sm font-medium tracking-wide hover:text-orange-400 transition-colors duration-200 uppercase font-mono px-1"
              >
                {link.name}
              </a>
            ) : (
              <Link
                to={link.to}
                className={`inline-flex items-center h-8 leading-none text-white text-sm font-medium tracking-wide hover:text-orange-400 transition-colors duration-200 uppercase font-mono px-1 ${location.pathname === link.to ? 'text-orange-400' : ''}`}
              >
                {link.name}
              </Link>
            )}
          </React.Fragment>
        ))}

        {/* User Authentication */}
        <span className="mx-1 text-orange-400 select-none" aria-hidden="true">|</span>
        {isAuthenticated ? (
          <div 
            className="relative group"
            onMouseEnter={() => {
              if (userMenuTimer.current) window.clearTimeout(userMenuTimer.current);
              setUserMenuOpen(true);
            }}
            onMouseLeave={() => {
              if (userMenuTimer.current) window.clearTimeout(userMenuTimer.current);
              userMenuTimer.current = window.setTimeout(() => setUserMenuOpen(false), 150);
            }}
          >
            <button
              type="button"
              onClick={() => setUserMenuOpen((v) => !v)}
              className="inline-flex items-center h-8 leading-none cursor-pointer text-white text-sm font-medium tracking-wide hover:text-orange-400 transition-colors duration-200 uppercase font-mono px-1"
              aria-haspopup="true"
              aria-expanded={userMenuOpen}
            >
              <User className="w-4 h-4 mr-1" />
              {user?.name.split(' ')[0]}
            </button>
            <div 
              className={`${userMenuOpen ? 'visible opacity-100 pointer-events-auto' : 'invisible opacity-0 pointer-events-none'} transition-opacity duration-150 absolute right-0 top-full mt-0 w-48 z-50`}
              onMouseEnter={() => {
                if (userMenuTimer.current) window.clearTimeout(userMenuTimer.current);
                setUserMenuOpen(true);
              }}
              onMouseLeave={() => {
                if (userMenuTimer.current) window.clearTimeout(userMenuTimer.current);
                userMenuTimer.current = window.setTimeout(() => setUserMenuOpen(false), 150);
              }}
            >
              <div className="bg-gray-900/95 backdrop-blur-sm border border-gray-800 rounded-xl shadow-2xl p-4 space-y-2">
                <Link
                  to="/dashboard"
                  className="block px-4 py-3 text-sm text-white hover:text-orange-400 hover:bg-gray-800/50 rounded-lg transition-colors text-center"
                  onClick={() => setUserMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    logout();
                    setUserMenuOpen(false);
                  }}
                  className="w-full px-4 py-3 text-sm text-white hover:text-red-400 hover:bg-gray-800/50 rounded-lg transition-colors text-center flex items-center justify-center space-x-2"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Sign Out</span>
                </button>
              </div>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowAuthModal(true)}
            className="inline-flex items-center h-8 leading-none text-white text-sm font-medium tracking-wide hover:text-orange-400 transition-colors duration-200 uppercase font-mono px-1"
          >
            Sign In
          </button>
        )}
      </div>

      {/* Mobile hamburger */}
      <button
        className="md:hidden inline-flex items-center justify-center p-2 rounded-lg text-white hover:text-orange-400 hover:bg-white/5 transition"
        aria-label="Toggle menu"
        onClick={() => setMobileOpen((v) => !v)}
      >
        {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
      </button>
      
      {/* Mobile menu panel with slide animation */}
      <div className={`absolute top-full left-0 w-full bg-black/95 backdrop-blur-sm border-b border-gray-800 md:hidden transition-all duration-300 ${
        mobileOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0 overflow-hidden'
      }`}>
        <div className="px-4 py-4 space-y-2">
            <Link onClick={closeMobile} to="/" className={`block px-2 py-2 text-white hover:text-orange-400 ${location.pathname === '/' ? 'text-orange-400' : ''}`}>Home</Link>
            <Link onClick={closeMobile} to="/about" className={`block px-2 py-2 text-white hover:text-orange-400 ${location.pathname === '/about' ? 'text-orange-400' : ''}`}>About</Link>
            <div className="pt-2">
              <div className="px-2 text-white/70 text-xs uppercase tracking-widest mb-1">Learn</div>
              <Link onClick={closeMobile} to="/financial-literacy" className={`block px-4 py-2 text-white hover:text-orange-400 ${location.pathname === '/financial-literacy' ? 'text-orange-400' : ''}`}>Financial Literacy</Link>
              <Link onClick={closeMobile} to="/opensource" className={`block px-4 py-2 text-white hover:text-orange-400 ${location.pathname === '/opensource' ? 'text-orange-400' : ''}`}>Open Source</Link>
              <Link onClick={closeMobile} to="/newsletters" className={`block px-4 py-2 text-white hover:text-orange-400 ${location.pathname === '/newsletters' ? 'text-orange-400' : ''}`}>Newsletters</Link>
              <Link onClick={closeMobile} to="/research" className={`block px-4 py-2 text-white hover:text-orange-400 ${location.pathname === '/research' ? 'text-orange-400' : ''}`}>Research</Link>
            </div>
            {NAV_LINKS.map((link) => (
              link.external ? (
                <a key={link.name} onClick={closeMobile} href={link.to} target="_blank" rel="noopener noreferrer" className="block px-2 py-2 text-white hover:text-orange-400">{link.name}</a>
              ) : (
                <Link key={link.name} onClick={closeMobile} to={link.to} className={`block px-2 py-2 text-white hover:text-orange-400 ${location.pathname === link.to ? 'text-orange-400' : ''}`}>{link.name}</Link>
              )
            ))}
            
            {/* Mobile Auth */}
            {isAuthenticated ? (
              <>
                <Link onClick={closeMobile} to="/dashboard" className={`block px-2 py-2 text-white hover:text-orange-400 ${location.pathname === '/dashboard' ? 'text-orange-400' : ''}`}>Dashboard</Link>
                <button onClick={() => { logout(); closeMobile(); }} className="block px-2 py-2 text-white hover:text-red-400 w-full text-left">Sign Out</button>
              </>
            ) : (
              <button onClick={() => { setShowAuthModal(true); closeMobile(); }} className="block px-2 py-2 text-white hover:text-orange-400 w-full text-left">Sign In</button>
            )}
          </div>
      </div>

      {/* Auth Modal */}
      <AuthModal 
        isOpen={showAuthModal} 
        onClose={() => setShowAuthModal(false)} 
        initialMode="login"
      />
    </nav>
  );
};

export default Navbar;