// Neon Auth Configuration
// Using Neon Data API for authentication

export const DATABASE_URL = import.meta.env.VITE_DATABASE_URL || '';
export const NEON_DATA_API_URL = import.meta.env.VITE_NEON_DATA_API_URL || '';

// Admin email
export const ADMIN_EMAIL = 'meridianalgo@gmail.com';

// Auth helper functions
export const isAdmin = (email: string | null): boolean => {
  return email === ADMIN_EMAIL;
};

// Simple session storage
const SESSION_KEY = 'neon_user_session';

// Get current user from local session
export const getCurrentUser = () => {
  const session = localStorage.getItem(SESSION_KEY);
  if (!session) return null;
  
  try {
    return JSON.parse(session);
  } catch {
    return null;
  }
};

// Save user session
export const saveUserSession = (user: any) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
};

// Sign in with Google (using Google OAuth directly)
export const signInWithGoogle = () => {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const redirectUri = `${window.location.origin}/auth/callback`;
  
  const authUrl = `https://accounts.google.com/o/oauth2/v2/auth?` +
    `client_id=${clientId}` +
    `&redirect_uri=${encodeURIComponent(redirectUri)}` +
    `&response_type=token` +
    `&scope=email profile` +
    `&prompt=select_account`;
  
  window.location.href = authUrl;
};

// Handle OAuth callback
export const handleAuthCallback = () => {
  const hash = window.location.hash.substring(1);
  const params = new URLSearchParams(hash);
  const accessToken = params.get('access_token');
  
  if (!accessToken) return null;
  
  return accessToken;
};

// Get user info from Google
export const getUserInfo = async (accessToken: string) => {
  try {
    const response = await fetch('https://www.googleapis.com/oauth2/v2/userinfo', {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });
    
    if (!response.ok) return null;
    
    const data = await response.json();
    return {
      id: data.id,
      email: data.email,
      name: data.name,
      picture: data.picture,
    };
  } catch (error) {
    console.error('Error getting user info:', error);
    return null;
  }
};

// Sign out
export const signOut = () => {
  localStorage.removeItem(SESSION_KEY);
  window.location.href = '/login';
};
