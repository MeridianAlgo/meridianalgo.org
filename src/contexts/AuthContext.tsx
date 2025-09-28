import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import ProgressService, { ProgressData } from '../services/progressService';
import { 
  onAuthChange, 
  signInWithEmail, 
  signUpWithEmail, 
  signInWithGoogle, 
  signOutUser,
  loadUserProgressFromFirestore,
  saveUserProgressToFirestore 
} from '../config/firebase';
import { User as FirebaseUser } from 'firebase/auth';

export interface User {
  id: string;
  email: string;
  name: string;
  joinDate: string;
  completedConcepts: string[];
  completedQuizzes: string[];
  certificates: string[];
  learningStreak: number;
  lastLoginDate: string;
  totalPoints: number;
  streakMessage?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  loginWithGoogle: () => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  isAuthenticated: boolean;
  updateProgress: (conceptId: string) => void;
  completeQuiz: (quizId: string, score: number) => void;
  awardCertificate: (certificateId: string) => void;
  progressData: ProgressData | null;
  refreshProgress: () => Promise<void>;
  loading?: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [firebaseUser, setFirebaseUser] = useState<FirebaseUser | null>(null);
  const [progressData, setProgressData] = useState<ProgressData | null>(null);
  const [loading, setLoading] = useState(true);
  const progressService = ProgressService.getInstance();

  // Listen to Firebase auth state changes
  useEffect(() => {
    console.log('🔥 AuthContext: Setting up Firebase auth listener...');
    
    const unsubscribe = onAuthChange(async (fbUser) => {
      if (fbUser) {
        console.log('🔥 AuthContext: Firebase user authenticated:', fbUser.email);
        setFirebaseUser(fbUser);
        
        // Load user data from Firestore cloud database
        const userData = await loadUserProgressFromFirestore(fbUser);
        
        if (userData) {
          setUser(userData);
          console.log('🔥 AuthContext: User data loaded from Firestore for:', userData.email);
        } else {
          console.log('❌ AuthContext: Failed to load user data');
        }
      } else {
        console.log('🔥 AuthContext: No Firebase user');
        setFirebaseUser(null);
        setUser(null);
      }
      setLoading(false);
    });
    
    return () => unsubscribe();
  }, []);

  // Refresh progress data whenever user changes
  useEffect(() => {
    if (user) {
      refreshProgress();
    }
  }, [user]);

  const refreshProgress = async () => {
    if (!user) return;
    
    try {
      const progress = await progressService.calculateProgress(
        user.completedConcepts,
        user.completedQuizzes
      );
      setProgressData(progress);
      
      // Update user points if changed
      const updatedUser = {
        ...user,
        totalPoints: progress.totalPoints
      };
      
      if (updatedUser.totalPoints !== user.totalPoints) {
        setUser(updatedUser);
      }
    } catch (error) {
      console.error('Error refreshing progress:', error);
    }
  };

  // Save user progress to Firestore whenever user state changes
  useEffect(() => {
    if (user && firebaseUser) {
      console.log('🔥 AuthContext: Saving user progress to Firestore for:', user.email);
      saveUserProgressToFirestore(firebaseUser, user);
    }
  }, [user, firebaseUser]);

  const login = async (email: string, password: string): Promise<boolean> => {
    console.log('AuthContext: Login attempt for:', email);
    
    try {
      await signInWithEmail(email, password);
      console.log('AuthContext: Firebase login successful for:', email);
      return true;
    } catch (error: any) {
      console.error('AuthContext: Login error:', error.message);
      return false;
    }
  };

  const loginWithGoogle = async (): Promise<boolean> => {
    console.log('AuthContext: Google login attempt');
    
    try {
      await signInWithGoogle();
      console.log('AuthContext: Google login successful');
      return true;
    } catch (error: any) {
      console.error('AuthContext: Google login error:', error.message);
      return false;
    }
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    console.log('AuthContext: Register attempt for:', email);
    
    try {
      await signUpWithEmail(email, password, name);
      console.log('AuthContext: Firebase registration successful for:', email);
      return true;
    } catch (error: any) {
      console.error('AuthContext: Registration error:', error.message);
      return false;
    }
  };

  const logout = async () => {
    console.log('AuthContext: Logging out user');
    try {
      await signOutUser();
      setUser(null);
      setFirebaseUser(null);
    } catch (error) {
      console.error('AuthContext: Logout error:', error);
    }
  };

  const updateProgress = (conceptId: string) => {
    if (!user) return;
    
    const isCompleted = user.completedConcepts.includes(conceptId);
    const updatedCompletedConcepts = isCompleted 
      ? user.completedConcepts.filter(id => id !== conceptId)
      : [...user.completedConcepts, conceptId];
    
    // Calculate points for this lesson
    const lessonPoints = progressService.getPointsForLesson(conceptId);
    const pointsChange = isCompleted ? -lessonPoints : lessonPoints;
    
    const updatedUser = {
      ...user,
      completedConcepts: updatedCompletedConcepts,
      totalPoints: Math.max(0, user.totalPoints + pointsChange)
    };
    
    setUser(updatedUser);
  };

  const completeQuiz = (quizId: string, score: number) => {
    if (!user) return;
    
    const quizResult = `${quizId}:${score}`;
    const updatedUser = {
      ...user,
      completedQuizzes: [...user.completedQuizzes.filter(q => !q.startsWith(quizId)), quizResult]
    };
    
    setUser(updatedUser);
  };

  const awardCertificate = (certificateId: string) => {
    if (!user || user.certificates.includes(certificateId)) return;
    
    const updatedUser = {
      ...user,
      certificates: [...user.certificates, certificateId]
    };
    
    setUser(updatedUser);
  };

  const value: AuthContextType = {
    user,
    login,
    loginWithGoogle,
    register,
    logout,
    isAuthenticated: !!user && !!firebaseUser,
    updateProgress,
    completeQuiz,
    awardCertificate,
    progressData,
    refreshProgress,
    loading
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};
