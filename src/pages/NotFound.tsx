import { Link } from 'react-router-dom';
import { Home, ArrowLeft } from 'lucide-react';
import AnimatedSection from '../components/AnimatedSection';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-black flex items-center justify-center px-4">
      <AnimatedSection animation="fadeInUp" className="text-center">
        <div className="relative">
          <h1 className="text-[200px] font-bold text-gray-800 select-none animate-pulse">404</h1>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-6xl font-bold bg-gradient-to-r from-orange-400 to-orange-600 bg-clip-text text-transparent">
              Oops!
            </span>
          </div>
        </div>

        <h2 className="text-3xl font-bold text-white mt-8 mb-4">Page Not Found</h2>
        <p className="text-gray-400 max-w-md mx-auto mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-8 py-4 rounded-xl font-bold transition-all duration-300 shadow-lg shadow-orange-500/20 cursor-target"
          >
            <Home className="w-4 h-4" />
            Go Home
          </Link>
          <button
            onClick={() => window.history.back()}
            className="px-6 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-all duration-300 flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Go Back
          </button>
        </div>
      </AnimatedSection>
    </div>
  );
};

export default NotFound;
