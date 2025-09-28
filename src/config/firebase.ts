// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { 
  getAuth, 
  GoogleAuthProvider, 
  signInWithPopup, 
  signOut,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  onAuthStateChanged,
  updateProfile,
  setPersistence,
  browserLocalPersistence,
  User as FirebaseUser
} from "firebase/auth";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  setDoc, 
  updateDoc,
  serverTimestamp,
  Timestamp
} from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDuSUXzoARKyYHoJ3-xxkfuE2221Wh7XFU",
  authDomain: "website-login-2ee9f.firebaseapp.com",
  projectId: "website-login-2ee9f",
  storageBucket: "website-login-2ee9f.firebasestorage.app",
  messagingSenderId: "49721774739",
  appId: "1:49721774739:web:4ce31baf99c999d8993366",
  measurementId: "G-R8M3K6QMZN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Set persistence to LOCAL (keeps user logged in even after browser closes)
setPersistence(auth, browserLocalPersistence);

export const googleProvider = new GoogleAuthProvider();

// FIRESTORE CLOUD DATABASE FUNCTIONS - REAL PERSISTENCE! 

// Save user progress to Firestore cloud database
export const saveUserProgressToFirestore = async (user: FirebaseUser, progressData: any) => {
  if (!user.uid) return;
  
  try {
    const userDocRef = doc(db, 'users', user.uid);
    await setDoc(userDocRef, {
      // User info
      email: user.email,
      displayName: user.displayName,
      photoURL: user.photoURL,
      
      // Progress data
      completedConcepts: progressData.completedConcepts || [],
      completedQuizzes: progressData.completedQuizzes || [],
      certificates: progressData.certificates || [],
      totalPoints: progressData.totalPoints || 0,
      learningStreak: progressData.learningStreak || 1,
      joinDate: progressData.joinDate || new Date().toISOString(),
      
      // Timestamps
      lastLogin: serverTimestamp(),
      updatedAt: serverTimestamp()
    }, { merge: true }); // merge: true prevents overwriting existing data
    
    console.log('🔥 Firebase: Progress saved to Firestore for:', user.email);
  } catch (error) {
    console.error('❌ Firebase: Error saving to Firestore:', error);
    // Fallback to localStorage if Firestore fails
    const fallbackKey = `meridianAlgo_progress_${user.uid}`;
    localStorage.setItem(fallbackKey, JSON.stringify(progressData));
  }
};

// Load user progress from Firestore cloud database
export const loadUserProgressFromFirestore = async (user: FirebaseUser) => {
  if (!user.uid) return null;
  
  try {
    const userDocRef = doc(db, 'users', user.uid);
    const docSnap = await getDoc(userDocRef);
    
    if (docSnap.exists()) {
      const data = docSnap.data();
      console.log('🔥 Firebase: Progress loaded from Firestore for:', user.email);
      return {
        id: user.uid,
        email: user.email || '',
        name: user.displayName || data.displayName || user.email?.split('@')[0] || 'User',
        joinDate: data.joinDate || new Date().toISOString(),
        completedConcepts: data.completedConcepts || [],
        completedQuizzes: data.completedQuizzes || [],
        certificates: data.certificates || [],
        learningStreak: data.learningStreak || 1,
        lastLoginDate: new Date().toISOString(),
        totalPoints: data.totalPoints || 0
      };
    } else {
      // First time user - create new document
      const newUserData = {
        id: user.uid,
        email: user.email || '',
        name: user.displayName || user.email?.split('@')[0] || 'User',
        joinDate: new Date().toISOString(),
        completedConcepts: [],
        completedQuizzes: [],
        certificates: [],
        learningStreak: 1,
        lastLoginDate: new Date().toISOString(),
        totalPoints: 0
      };
      
      await saveUserProgressToFirestore(user, newUserData);
      console.log('🔥 Firebase: New user created in Firestore:', user.email);
      return newUserData;
    }
  } catch (error) {
    console.error('❌ Firebase: Error loading from Firestore:', error);
    // Fallback to localStorage
    const fallbackKey = `meridianAlgo_progress_${user.uid}`;
    const fallback = localStorage.getItem(fallbackKey);
    return fallback ? JSON.parse(fallback) : null;
  }
};

// Google Sign-In function
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    console.log('🔥 Firebase: Google sign-in successful:', result.user.email);
    return result.user;
  } catch (error: any) {
    console.error("❌ Firebase: Error signing in with Google:", error);
    throw error;
  }
};

// Email/Password Sign Up
export const signUpWithEmail = async (email: string, password: string, displayName: string) => {
  try {
    const result = await createUserWithEmailAndPassword(auth, email, password);
    // Update display name
    await updateProfile(result.user, { displayName });
    console.log('🔥 Firebase: Email sign-up successful:', result.user.email);
    return result.user;
  } catch (error: any) {
    console.error("❌ Firebase: Error signing up with email:", error);
    throw error;
  }
};

// Email/Password Sign In
export const signInWithEmail = async (email: string, password: string) => {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    console.log('🔥 Firebase: Email sign-in successful:', result.user.email);
    return result.user;
  } catch (error: any) {
    console.error("❌ Firebase: Error signing in with email:", error);
    throw error;
  }
};

// Sign out function
export const signOutUser = async () => {
  try {
    await signOut(auth);
    console.log('🔥 Firebase: User signed out');
  } catch (error) {
    console.error("❌ Firebase: Error signing out:", error);
    throw error;
  }
};

// Listen for auth state changes
export const onAuthChange = (callback: (user: FirebaseUser | null) => void) => {
  return onAuthStateChanged(auth, callback);
};

export default app;
