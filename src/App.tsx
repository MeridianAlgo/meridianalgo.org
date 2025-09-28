import { useEffect, Suspense, lazy } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import ErrorBoundary from './components/ErrorBoundary';
import LoadingSpinner from './components/LoadingSpinner';
import SkipToContent from './components/SkipToContent';
import AppLayout from './components/AppLayout';
import ProtectedRoute from './components/ProtectedRoute';
import { AuthProvider } from './contexts/AuthContext';

// Lazy load pages for better performance
const Home = lazy(() => import('./pages/Home'));
const About = lazy(() => import('./pages/About'));
const Login = lazy(() => import('./pages/Login'));
const FinancialLiteracy = lazy(() => import('./pages/FinancialLiteracyNew'));
const FinancialLiteracyShowcase = lazy(() => import('./pages/FinancialLiteracyShowcase'));
const Learning = lazy(() => import('./pages/Learning'));
const LearningCenter = lazy(() => import('./pages/LearningCenter'));
const Dashboard = lazy(() => import('./pages/Dashboard'));
const NewDashboard = lazy(() => import('./pages/NewDashboard'));
const Achievements = lazy(() => import('./pages/Achievements'));
const LessonPage = lazy(() => import('./pages/LessonPage'));
const QuizPage = lazy(() => import('./pages/QuizPage'));
const Profile = lazy(() => import('./pages/Profile'));
const Newsletters = lazy(() => import('./pages/Newsletters'));
const Partnerships = lazy(() => import('./pages/Partnerships'));
const Contact = lazy(() => import('./pages/Contact'));
const OpenSource = lazy(() => import('./pages/OpenSource'));
const Research = lazy(() => import('./pages/Research'));
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
      <AuthProvider>
        <Router>
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
                <Route path="financial-literacy" element={<FinancialLiteracyShowcase />} />
                <Route path="financial-literacy-old" element={<FinancialLiteracy />} />
                <Route path="opensource" element={<OpenSource />} />
                <Route path="newsletters" element={<Newsletters />} />
                <Route path="research" element={<Research />} />
                <Route path="partnerships" element={<Partnerships />} />
                <Route path="contact" element={<Contact />} />
              </Route>

              {/* Login page (no layout) */}
              <Route path="/login" element={<Login />} />

              {/* Dashboard without navbar - same style as learning center */}
              <Route path="/dashboard" element={
                <ProtectedRoute>
                  <NewDashboard />
                </ProtectedRoute>
              } />
              
              {/* Old dashboard (kept for compatibility) */}
              <Route path="/dashboard-old" element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              } />

              {/* Learning Center without navbar - separate platform feel */}
              <Route path="/learning" element={
                <ProtectedRoute>
                  <LearningCenter />
                </ProtectedRoute>
              } />

              {/* Achievements page without navbar */}
              <Route path="/achievements" element={
                <ProtectedRoute>
                  <Achievements />
                </ProtectedRoute>
              } />

              {/* Profile page without navbar */}
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              } />

              {/* Financial tools & calculators */}
              <Route path="/tools" element={
                <ProtectedRoute>
                  <ToolsPage />
                </ProtectedRoute>
              } />

              {/* Lesson page without navbar */}
              <Route path="/lesson/:moduleId/:lessonId" element={
                <ProtectedRoute>
                  <LessonPage />
                </ProtectedRoute>
              } />

              {/* Quiz page without navbar */}
              <Route path="/quiz/:moduleId" element={
                <ProtectedRoute>
                  <QuizPage />
                </ProtectedRoute>
              } />
              
              {/* Old learning page (kept for compatibility) */}
              <Route path="/learning-old" element={
                <ProtectedRoute>
                  <Learning />
                </ProtectedRoute>
              } />

              {/* 404 page */}
              <Route path="*" element={<NotFound />} />
            </Routes>
          </Suspense>
        </Router>
      </AuthProvider>
    </ErrorBoundary>
  );
}

export default App;