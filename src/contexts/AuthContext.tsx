import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

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
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string, name: string) => Promise<boolean>;
  logout: () => void;
  updateProgress: (conceptId: string) => void;
  completeQuiz: (quizId: string, score: number) => void;
  awardCertificate: (certificateId: string) => void;
  isAuthenticated: boolean;
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

  // Load user from localStorage on mount
  useEffect(() => {
    const savedUser = localStorage.getItem('meridianAlgo_user');
    if (savedUser) {
      const userData = JSON.parse(savedUser);
      
      // Cross-reference with users database to get latest data
      const existingUsers = JSON.parse(localStorage.getItem('meridianAlgo_users') || '{}');
      const userKey = userData.email.toLowerCase();
      
      if (existingUsers[userKey]) {
        // Use data from users database as it's the source of truth
        const dbUserData = existingUsers[userKey];
        const mergedUser = {
          id: dbUserData.id,
          email: dbUserData.email,
          name: dbUserData.name,
          joinDate: dbUserData.joinDate,
          completedConcepts: dbUserData.completedConcepts || [],
          completedQuizzes: dbUserData.completedQuizzes || [],
          certificates: dbUserData.certificates || [],
          learningStreak: dbUserData.learningStreak || 1,
          lastLoginDate: dbUserData.lastLoginDate || new Date().toISOString()
        };
        
        setUser(mergedUser);
        localStorage.setItem('meridianAlgo_user', JSON.stringify(mergedUser));
      } else {
        // Fallback to saved user data
        setUser(userData);
      }
    }
  }, []);

  // Save user to localStorage and users database whenever user state changes
  useEffect(() => {
    if (user) {
      localStorage.setItem('meridianAlgo_user', JSON.stringify(user));
      
      // Also update the users database
      const existingUsers = JSON.parse(localStorage.getItem('meridianAlgo_users') || '{}');
      const userKey = user.email.toLowerCase();
      if (existingUsers[userKey]) {
        existingUsers[userKey] = {
          ...existingUsers[userKey],
          ...user
        };
        localStorage.setItem('meridianAlgo_users', JSON.stringify(existingUsers));
      }
    }
  }, [user]);

  const generateUserId = () => {
    return 'user_' + Math.random().toString(36).substr(2, 9) + Date.now().toString(36);
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user exists in localStorage
    const existingUsers = JSON.parse(localStorage.getItem('meridianAlgo_users') || '{}');
    const userKey = email.toLowerCase();
    
    if (existingUsers[userKey] && existingUsers[userKey].password === password) {
      const userData = existingUsers[userKey];
      
      // Calculate learning streak
      const today = new Date().toDateString();
      const lastLogin = userData.lastLoginDate ? new Date(userData.lastLoginDate).toDateString() : null;
      let newStreak = userData.learningStreak || 1;
      
      if (lastLogin && today !== lastLogin) {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);
        const wasYesterday = lastLogin === yesterday.toDateString();
        newStreak = wasYesterday ? (userData.learningStreak || 0) + 1 : 1;
      }
      
      const loginUser: User = {
        id: userData.id,
        email: userData.email,
        name: userData.name,
        joinDate: userData.joinDate,
        completedConcepts: userData.completedConcepts || [],
        completedQuizzes: userData.completedQuizzes || [],
        certificates: userData.certificates || [],
        learningStreak: newStreak,
        lastLoginDate: new Date().toISOString()
      };
      
      // Update the users database with new login info
      existingUsers[userKey] = {
        ...existingUsers[userKey],
        ...loginUser
      };
      localStorage.setItem('meridianAlgo_users', JSON.stringify(existingUsers));
      
      setUser(loginUser);
      return true;
    }
    
    return false;
  };

  const register = async (email: string, password: string, name: string): Promise<boolean> => {
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Check if user already exists
    const existingUsers = JSON.parse(localStorage.getItem('meridianAlgo_users') || '{}');
    const userKey = email.toLowerCase();
    
    if (existingUsers[userKey]) {
      return false; // User already exists
    }
    
    // Create new user
    const newUser: User = {
      id: generateUserId(),
      email: email.toLowerCase(),
      name,
      joinDate: new Date().toISOString(),
      completedConcepts: [],
      completedQuizzes: [],
      certificates: [],
      learningStreak: 1,
      lastLoginDate: new Date().toISOString()
    };
    
    // Save to users database
    existingUsers[userKey] = {
      ...newUser,
      password // Store password for demo purposes (in real app, this would be hashed)
    };
    localStorage.setItem('meridianAlgo_users', JSON.stringify(existingUsers));
    
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('meridianAlgo_user');
  };

  const updateProgress = (conceptId: string) => {
    if (!user) return;
    
    const isCompleted = user.completedConcepts.includes(conceptId);
    const updatedCompletedConcepts = isCompleted 
      ? user.completedConcepts.filter(id => id !== conceptId)
      : [...user.completedConcepts, conceptId];
    
    const updatedUser = {
      ...user,
      completedConcepts: updatedCompletedConcepts
    };
    
    // Immediately update both localStorage and users database
    localStorage.setItem('meridianAlgo_user', JSON.stringify(updatedUser));
    
    const existingUsers = JSON.parse(localStorage.getItem('meridianAlgo_users') || '{}');
    const userKey = user.email.toLowerCase();
    if (existingUsers[userKey]) {
      existingUsers[userKey] = {
        ...existingUsers[userKey],
        ...updatedUser
      };
      localStorage.setItem('meridianAlgo_users', JSON.stringify(existingUsers));
    }
    
    setUser(updatedUser);
  };

  const completeQuiz = (quizId: string, score: number) => {
    if (!user) return;
    
    const quizResult = `${quizId}:${score}`;
    const updatedUser = {
      ...user,
      completedQuizzes: [...user.completedQuizzes.filter(q => !q.startsWith(quizId)), quizResult]
    };
    
    // Immediately update both localStorage and users database
    localStorage.setItem('meridianAlgo_user', JSON.stringify(updatedUser));
    
    const existingUsers = JSON.parse(localStorage.getItem('meridianAlgo_users') || '{}');
    const userKey = user.email.toLowerCase();
    if (existingUsers[userKey]) {
      existingUsers[userKey] = {
        ...existingUsers[userKey],
        ...updatedUser
      };
      localStorage.setItem('meridianAlgo_users', JSON.stringify(existingUsers));
    }
    
    setUser(updatedUser);
  };

  const awardCertificate = (certificateId: string) => {
    if (!user || user.certificates.includes(certificateId)) return;
    
    const updatedUser = {
      ...user,
      certificates: [...user.certificates, certificateId]
    };
    
    // Immediately update both localStorage and users database
    localStorage.setItem('meridianAlgo_user', JSON.stringify(updatedUser));
    
    const existingUsers = JSON.parse(localStorage.getItem('meridianAlgo_users') || '{}');
    const userKey = user.email.toLowerCase();
    if (existingUsers[userKey]) {
      existingUsers[userKey] = {
        ...existingUsers[userKey],
        ...updatedUser
      };
      localStorage.setItem('meridianAlgo_users', JSON.stringify(existingUsers));
    }
    
    setUser(updatedUser);
  };

  const value: AuthContextType = {
    user,
    login,
    register,
    logout,
    updateProgress,
    completeQuiz,
    awardCertificate,
    isAuthenticated: !!user
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
