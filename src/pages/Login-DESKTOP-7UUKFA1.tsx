import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Link } from 'react-router-dom';
import { Mail, Lock, User, Eye, EyeOff, ArrowRight, BookOpen, Github as GithubIcon } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

type ProviderOption = 'google' | 'github' | 'email';

const Login: React.FC = () => {
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [providerSuggestion, setProviderSuggestion] = useState<ProviderOption | null>(null);

  const { login, register, isAuthenticated, loginWithGoogle, loginWithGithub } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const resetProviderGuidance = () => {
    setProviderSuggestion(null);
  };

  const shouldDisableProvider = (provider: ProviderOption) =>
    loading || (providerSuggestion !== null && providerSuggestion !== provider);

  const handleAuthError = (err: any, fallbackMessage: string) => {
    if (err?.code === 'auth/provider-switch-required') {
      const requiredProvider = (err?.requiredProvider as ProviderOption | undefined) ?? null;
      setProviderSuggestion(requiredProvider);
      setError(err?.message || fallbackMessage);
      return;
    }

    resetProviderGuidance();
    setError(err?.message || fallbackMessage);
  };

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
    resetProviderGuidance();
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    resetProviderGuidance();

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
        resetProviderGuidance();
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      handleAuthError(err, 'Something went wrong. Please try again.');
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className="min-h-screen bg-black flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradient Mesh */}
        <div className="absolute inset-0 bg-gradient-to-br from-orange-900/20 via-black to-yellow-900/20"></div>
        
        {/* Animated Gradient Orbs */}
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-gradient-to-br from-orange-500/30 to-yellow-500/30 rounded-full blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-gradient-to-br from-yellow-500/30 to-orange-500/30 rounded-full blur-3xl animate-float" style={{animationDelay: '3s'}}></div>
      </div>

      <div className="relative w-full max-w-md">
        {/* Single Centered Card */}
        <div className="bg-gray-900/95 backdrop-blur-2xl border border-gray-800 rounded-3xl p-6 sm:p-10 shadow-2xl animate-scaleIn">
          {/* Logo and Brand */}
          <div className="text-center mb-8">
            <Link to="/" className="inline-flex items-center justify-center mb-6 group">
              <div className="w-16 h-16 bg-gradient-to-br from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                <BookOpen className="w-8 h-8 text-white" />
              </div>
            </Link>
            <h1 className="text-2xl sm:text-3xl font-bold text-white mb-2">MeridianAlgo</h1>
            <p className="text-gray-400">
              {mode === 'login' ? 'Welcome Back!' : 'Create Your Account'}
            </p>
          </div>
          
          {/* Tab Switcher */}
          <div className="flex bg-gray-800/50 rounded-2xl p-1 mb-8">
            <button
              onClick={() => {
                setMode('login');
                resetForm();
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                mode === 'login'
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign In
            </button>
            <button
              onClick={() => {
                setMode('register');
                resetForm();
              }}
              className={`flex-1 py-3 px-4 rounded-xl font-medium transition-all duration-300 ${
                mode === 'register'
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white shadow-lg'
                  : 'text-gray-400 hover:text-white'
              }`}
            >
              Sign Up
            </button>
          </div>

          {error && (
            <div className="mb-6 p-4 bg-red-500/10 border border-red-500/30 rounded-xl">
              <p className="text-red-400 text-sm">{error}</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
              {mode === 'register' && (
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300 mb-2">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-10 pr-4 py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-gray-800 transition-all duration-300 hover:border-gray-500"
                      placeholder="Enter your full name"
                      required={mode === 'register'}
                    />
                  </div>
                </div>
              )}

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-300 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full pl-10 pr-4 py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-gray-800 transition-all duration-300 hover:border-gray-500"
                    placeholder="Enter your email"
                    required
                    autoComplete="email"
                  />
                </div>
              </div>

              <div>
                <label htmlFor="password" className="block text-sm font-medium text-gray-300 mb-2">
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                  <input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full pl-10 pr-12 py-4 bg-gray-800/50 border border-gray-600 rounded-xl text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-orange-500 focus:bg-gray-800 transition-all duration-300 hover:border-gray-500"
                    placeholder="Enter your password"
                    required
                    autoComplete="current-password"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white transition-colors"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
              </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-orange-600 to-orange-500 hover:from-orange-700 hover:to-orange-600 disabled:from-gray-600 disabled:to-gray-600 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-lg hover:shadow-orange-500/25 disabled:transform-none disabled:cursor-not-allowed flex items-center justify-center space-x-2"
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

          {/* Google Sign In */}
          <div className="mt-6">
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-700"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-2 bg-gray-900 text-gray-400">Or continue with</span>
              </div>
            </div>
            
            <button
              type="button"
              onClick={async () => {
                setLoading(true);
                setError('');
                resetProviderGuidance();
                try {
                  const success = await loginWithGoogle();
                  if (success) {
                    resetProviderGuidance();
                    navigate('/dashboard');
                  } else {
                    setError('Google sign-in failed. Please try again.');
                  }
                } catch (err: any) {
                  handleAuthError(err, 'Google sign-in failed');
                } finally {
                  setLoading(false);
                }
              }}
              disabled={shouldDisableProvider('google')}
              className={`mt-4 w-full bg-white hover:bg-gray-50 disabled:bg-gray-100 text-gray-900 font-semibold py-4 rounded-xl transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-lg border border-gray-300 flex items-center justify-center space-x-3 disabled:cursor-not-allowed disabled:opacity-60 ${
                providerSuggestion === 'google'
                  ? 'border-orange-500 shadow-[0_0_0_4px_rgba(249,115,22,0.35)]'
                  : ''
              }`}
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Continue with Google</span>
            </button>
            <button
              type="button"
              onClick={async () => {
                setLoading(true);
                setError('');
                resetProviderGuidance();
                try {
                  const success = await loginWithGithub();
                  if (success) {
                    resetProviderGuidance();
                    navigate('/dashboard');
                  } else {
                    setError('GitHub sign-in failed. Please try again.');
                  }
                } catch (err: any) {
                  handleAuthError(err, 'GitHub sign-in failed');
                } finally {
                  setLoading(false);
                }
              }}
              disabled={shouldDisableProvider('github')}
              className={`mt-3 w-full bg-gray-900 hover:bg-gray-800 disabled:bg-gray-900/60 text-white font-semibold py-4 rounded-xl transition-all duration-300 hover:transform hover:scale-[1.02] hover:shadow-lg border border-gray-700 flex items-center justify-center space-x-3 disabled:cursor-not-allowed disabled:opacity-60 ${
                providerSuggestion === 'github'
                  ? 'border-orange-500 shadow-[0_0_0_4px_rgba(249,115,22,0.35)]'
                  : ''
              }`}
            >
              <GithubIcon className="w-5 h-5" />
              <span>Continue with GitHub</span>
            </button>
          </div>

          <div className="mt-6 pt-6 border-t border-gray-800">
            <Link 
              to="/"
              className="text-gray-400 hover:text-orange-400 text-sm transition-colors flex items-center justify-center space-x-2 group"
            >
              <span className="group-hover:-translate-x-1 transition-transform duration-300">←</span>
              <span>Back to home</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
