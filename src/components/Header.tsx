import React from 'react';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Header: React.FC = () => {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [isScrolled, setIsScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 bg-transparent backdrop-blur-sm transition-all duration-300 ${
      isScrolled ? 'border-b border-white/10' : 'border-b border-transparent'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-3 group">
            <div className="w-12 h-12 rounded-lg overflow-hidden group-hover:scale-110 transition-transform duration-300">
              <img 
                src="/Profile Logo (1).png" 
                alt="MeridianAlgo Logo" 
                className="w-full h-full object-contain"
              />
            </div>
            <span className="text-white font-bold text-xl">
              <span className="text-blue-400">M</span>eridian<span className="text-blue-400">A</span>lgo
            </span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-8">
            <Link to="/" className="text-white/80 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105">
              Home
            </Link>
            <Link to="/about" className="text-white/80 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105">
              About
            </Link>
            <Link to="/contact" className="text-white/80 hover:text-white px-3 py-2 text-sm font-medium transition-all duration-300 hover:scale-105">
              Contact
            </Link>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={toggleMenu}
              className="text-white/80 hover:text-white focus:outline-none transition-colors duration-300"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden">
            <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 border-t border-white/10 bg-black/90 backdrop-blur-md">
              <Link to="/" className="block text-white/80 hover:text-white px-3 py-2 text-base font-medium transition-colors duration-300">
                Home
              </Link>
              <Link to="/about" className="block text-white/80 hover:text-white px-3 py-2 text-base font-medium transition-colors duration-300">
                About
              </Link>
              <Link to="/contact" className="block text-white/80 hover:text-white px-3 py-2 text-base font-medium transition-colors duration-300">
                Contact
              </Link>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;