import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const NAV_LINKS = [
  { name: 'About', to: '/about' },
  { name: 'Open Source', to: '/opensource' },
  { name: 'Newsletters', to: '/newsletters' },
  { name: 'Contact Us', to: '/contact' },
];

const Navbar: React.FC = () => {
  const location = useLocation();
  const showHome = location.pathname !== '/';
  return (
    <nav className="fixed top-0 left-0 w-full z-30 flex items-center justify-between px-8 py-6 bg-gradient-to-b from-black/80 via-black/60 to-transparent">
      <Link to="/" className="flex items-center group focus:outline-none">
        <img src="/bitflow_logo.png" alt="Meridian Algo Logo" className="h-9 w-auto mr-3 select-none rounded-xl transition-all duration-200 group-hover:shadow-lg" />
        <span className="text-white text-2xl font-bold tracking-tight font-inter">MeridianAlgo</span>
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