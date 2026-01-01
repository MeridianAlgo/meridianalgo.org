import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import SkipToContent from './components/SkipToContent';
import AppLayout from './components/AppLayout';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Newsletters = lazy(() => import('./pages/Newsletters'));
const Partnerships = lazy(() => import('./pages/Partnerships'));
const Contact = lazy(() => import('./pages/Contact'));
const OpenSource = lazy(() => import('./pages/OpenSource'));
const Research = lazy(() => import('./pages/Research'));
const AI = lazy(() => import('./pages/AI'));
const NotFound = lazy(() => import('./pages/NotFound'));
const ToolsPage = lazy(() => import('./pages/ToolsPage'));

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
      <Router future={{ v7_startTransition: true, v7_relativeSplatPath: true }}>
        <SkipToContent />
        <ScrollToTop />
        <Suspense fallback={
          <div className="min-h-screen flex items-center justify-center bg-black">
            <LoadingSpinner size="lg" />
          </div>
        }>
          <Routes>
            {/* Public routes with standard layout */}
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Home />} />
              <Route path="about" element={<About />} />
              <Route path="tools" element={<ToolsPage />} />
              <Route path="opensource" element={<OpenSource />} />
              <Route path="newsletters" element={<Newsletters />} />
              <Route path="research" element={<Research />} />
              <Route path="ai" element={<AI />} />
              <Route path="partnerships" element={<Partnerships />} />
              <Route path="contact" element={<Contact />} />
            </Route>

            {/* 404 page */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </Router>
    </ErrorBoundary>
  );
}

export default App;