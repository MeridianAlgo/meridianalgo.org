import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import ErrorBoundary from './components/ErrorBoundary';
import ScrollToTopButton from './components/ScrollToTopButton';
import LoadingSpinner from './components/LoadingSpinner';
import SkipToContent from './components/SkipToContent';
import { AuthProvider } from './contexts/AuthContext';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const FinancialLiteracy = lazy(() => import('./pages/FinancialLiteracyNew'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const Newsletters = lazy(() => import('./pages/Newsletters'));
const Partnerships = lazy(() => import('./pages/Partnerships'));
const Contact = lazy(() => import('./pages/Contact'));
const OpenSource = lazy(() => import('./pages/OpenSource'));
const Research = lazy(() => import('./pages/Research'));
const NotFound = lazy(() => import('./pages/NotFound'));

function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <ErrorBoundary>
      <AuthProvider>
        <Router>
          <div className="min-h-screen bg-black">
            <SkipToContent />
            <ScrollToTop />
            <Navbar />
            <Suspense fallback={
              <div className="min-h-screen flex items-center justify-center">
                <LoadingSpinner size="lg" />
              </div>
            }>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/financial-literacy" element={<FinancialLiteracy />} />
                <Route path="/dashboard" element={<Dashboard />} />
                <Route path="/opensource" element={<OpenSource />} />
                <Route path="/newsletters" element={<Newsletters />} />
                <Route path="/research" element={<Research />} />
                <Route path="/partnerships" element={<Partnerships />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </Suspense>
            <Footer />
            <ScrollToTopButton />
          </div>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;