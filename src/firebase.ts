import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Public Firebase config credentials
const firebaseConfig = {
  apiKey: "AIzaSyChRO1rxYa5XN9A63CXl37oTzpBXn8zSP4",
  authDomain: "amiable-legend-9r6mz.firebaseapp.com",
  projectId: "amiable-legend-9r6mz",
  storageBucket: "amiable-legend-9r6mz.firebasestorage.app",
  messagingSenderId: "924151109619",
  appId: "1:924151109619:web:72e9428628cc040533a486"
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication
export const auth = getAuth(app);

// Initialize Firestore with custom database ID
export const db = getFirestore(app, "ai-studio-cos101studyporta-3d286769-8d68-413e-beba-de2c30058405");

export default app;
