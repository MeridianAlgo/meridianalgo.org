import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, BookOpen } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

const Login: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const { login, register, isAuthenticated, loginWithGoogle } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  // Redirect if already authenticated
  useEffect(() => {
    if (isAuthenticated) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from, { replace: true });
    }
  }, [isAuthenticated, navigate, location]);

  useEffect(() => {
    document.title = mode === 'login' ? 'MeridianAlgo - Sign In' : 'MeridianAlgo - Sign Up';
  }, [mode]);

  const resetForm = () => {
    setEmail('');
    setPassword('');
    setName('');
    setError('');
    setShowPassword(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      let success = false;
      
      if (mode === 'login') {
        success = await login(email, password);
        if (!success) {
          setError('Invalid email or password. Please try again.');
        }
      } else {
        if (name.trim().length < 2) {
          setError('Please enter your full name.');
          setLoading(false);
          return;
        }
        success = await register(email, password, name.trim());
        if (!success) {
          setError('An account with this email already exists.');
        }
      }

      if (success) {
        const from = location.state?.from?.pathname || '/dashboard';
        navigate(from, { replace: true });
      }
    } catch (err) {
      setError('Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 flex items-center justify-center p-4 relative overflow-hidden">
      {/* Simplified Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-900"></div>
      </div>

      <div className="relative w-full max-w-5xl z-10">
        {/* Split Layout Card */}
        <div className="relative bg-slate-900/80 backdrop-blur-2xl border border-slate-700/50 rounded-3xl shadow-2xl overflow-hidden animate-scaleIn grid md:grid-cols-2">
          {/* Left Side - Form */}
          <div className="p-10">
            {/* Logo and Brand */}
            <div className="mb-8">
              <Link to="/" className="inline-flex items-center mb-6 group">
                <div className="w-12 h-12 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-all duration-300">
                  <BookOpen className="w-6 h-6 text-white" />
                </div>
                <h1 className="ml-3 text-2xl font-bold text-white">
                  MeridianAlgo
                </h1>
              </Link>
              <h2 className="text-3xl font-bold text-white mb-2">
                {mode === 'login' ? 'Welcome back!' : 'Create account'}
              </h2>
              <p className="text-slate-400">
                {mode === 'login' ? 'Sign in to continue your learning' : 'Start your financial journey today'}
              </p>
            </div>
          
            {/* Tab Switcher */}
            <div className="relative flex bg-slate-800/50 backdrop-blur-sm rounded-xl p-1 mb-6 border border-slate-700/50">
              <div 
                className={`absolute top-1 bottom-1 w-[calc(50%-4px)] bg-gradient-to-r from-orange-500 to-yellow-500 rounded-lg shadow-lg transition-all duration-300 ease-out ${
                  mode === 'login' ? 'left-1' : 'left-[calc(50%+2px)]'
                }`}
              ></div>
              <button
                onClick={() => {
                  setMode('login');
                  resetForm();
                }}
                className={`relative flex-1 py-2.5 px-4 rounded-lg font-semibold transition-all duration-300 z-10 text-sm ${
                  mode === 'login'
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign In
              </button>
              <button
                onClick={() => {
                  setMode('register');
                  resetForm();
                }}
                className={`relative flex-1 py-2.5 px-4 rounded-lg font-semibold transition-all duration-300 z-10 text-sm ${
                  mode === 'register'
                    ? 'text-white'
                    : 'text-slate-400 hover:text-white'
                }`}
              >
                Sign Up
              </button>
            </div>

            {error && (
              <div className="mb-6 p-3 bg-red-500/10 backdrop-blur-sm border border-red-500/30 rounded-lg animate-fadeIn">
                <p className="text-red-400 text-sm font-medium">{error}</p>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {mode === 'register' && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative group">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-orange-400 transition-colors duration-300" />
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 focus:bg-slate-800/70 transition-all duration-300 hover:border-slate-500/50"
                      placeholder="John Doe"
                      required={mode === 'register'}
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">
                  Email Address
                </label>
                <div className="relative group">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-orange-400 transition-colors duration-300" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 focus:bg-slate-800/70 transition-all duration-300 hover:border-slate-500/50"
                    placeholder="you@example.com"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-slate-300 mb-2">
                  Password
                </label>
                <div className="relative group">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400 group-focus-within:text-orange-400 transition-colors duration-300" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-3 bg-slate-800/50 backdrop-blur-sm border border-slate-600/50 rounded-lg text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-orange-500/50 focus:border-orange-500/50 focus:bg-slate-800/70 transition-all duration-300 hover:border-slate-500/50"
                    placeholder="••••••••"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-slate-400 hover:text-orange-400 transition-colors duration-300 focus:outline-none"
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 disabled:from-slate-600 disabled:to-slate-600 text-white font-bold py-3 rounded-lg transition-all duration-300 hover:transform hover:scale-[1.02] disabled:transform-none disabled:cursor-not-allowed disabled:opacity-50 flex items-center justify-center space-x-2"
              >
                {loading ? (
                  <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>{mode === 'login' ? 'Sign In' : 'Create Account'}</span>
                    <ArrowRight className="w-5 h-5" />
                  </>
                )}
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-700/50 space-y-3">
              <Link 
                to="/"
                className="text-slate-400 hover:text-orange-400 text-sm font-medium transition-all duration-300 flex items-center justify-center space-x-2 group"
              >
                <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
                <span>Back to home</span>
              </Link>
              <Link 
                to="/admin"
                className="text-slate-500 hover:text-slate-400 text-xs transition-all duration-300 flex items-center justify-center"
              >
                Admin Portal
              </Link>
            </div>
          </div>

          {/* Right Side - Social Login */}
          <div className="bg-slate-800/30 p-10 flex flex-col items-center justify-center border-l border-slate-700/50">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-white mb-2">Quick Sign In</h3>
              <p className="text-slate-400">Use your existing account</p>
            </div>
            
            <div className="w-full max-w-sm space-y-4">
              <button
                type="button"
                onClick={async () => {
                  setLoading(true);
                  setError('');
                  try {
                    const success = await loginWithGoogle();
                    if (success) {
                      navigate('/dashboard');
                    } else {
                      setError('Google sign-in failed. Please try again.');
                    }
                  } catch (err: any) {
                    setError(err.message || 'Google sign-in failed');
                  } finally {
                    setLoading(false);
                  }
                }}
                disabled={loading}
                className="w-full bg-white hover:bg-slate-50 disabled:bg-slate-100 text-slate-900 font-bold py-4 rounded-lg transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-lg border-2 border-slate-200 hover:border-slate-300 flex items-center justify-center space-x-3 disabled:cursor-not-allowed disabled:opacity-60 group"
              >
                <svg className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" viewBox="0 0 24 24">
                  <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                  <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                  <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                  <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                </svg>
                <span>Continue with Google</span>
              </button>

              <button
                type="button"
                disabled
                className="w-full bg-slate-700/50 text-slate-500 font-bold py-4 rounded-lg border-2 border-slate-600/50 flex items-center justify-center space-x-3 cursor-not-allowed"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                </svg>
                <span>GitHub (Coming Soon)</span>
              </button>
            </div>

            <div className="mt-8 text-center">
              <p className="text-slate-500 text-sm">
                By signing in, you agree to our<br />
                <a href="/terms" className="text-orange-400 hover:text-orange-300">Terms of Service</a> and{' '}
                <a href="/privacy" className="text-orange-400 hover:text-orange-300">Privacy Policy</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
