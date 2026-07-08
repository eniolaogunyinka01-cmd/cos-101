import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Public Firebase config credentials with environment variable overrides
const firebaseConfig = {
  apiKey: (import.meta as any).env.VITE_FIREBASE_API_KEY || "AIzaSyChRO1rxYa5XN9A63CXl37oTzpBXn8zSP4",
  authDomain: (import.meta as any).env.VITE_FIREBASE_AUTH_DOMAIN || "amiable-legend-9r6mz.firebaseapp.com",
  projectId: (import.meta as any).env.VITE_FIREBASE_PROJECT_ID || "amiable-legend-9r6mz",
  storageBucket: (import.meta as any).env.VITE_FIREBASE_STORAGE_BUCKET || "amiable-legend-9r6mz.firebasestorage.app",
  messagingSenderId: (import.meta as any).env.VITE_FIREBASE_MESSAGING_SENDER_ID || "924151109619",
  appId: (import.meta as any).env.VITE_FIREBASE_APP_ID || "1:924151109619:web:72e9428628cc040533a486"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Use custom Firestore database ID if provided, otherwise default to the project-specific one or default database
const dbId = (import.meta as any).env.VITE_FIREBASE_DATABASE_ID || "ai-studio-cos101studyporta-3d286769-8d68-413e-beba-de2c30058405";
export const db = getFirestore(app, dbId);

export default app;

