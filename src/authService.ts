import { 
  GoogleAuthProvider,
  signInWithPopup,
  signOut as firebaseSignOut, 
  User,
  AuthError
} from "firebase/auth";
import { auth } from "./firebase";

// Define strict typing for Auth Response
export interface AuthResponse {
  user: User | null;
  error: string | null;
}

/**
 * Maps standard Firebase Auth error codes to user-friendly messages.
 */
export function getFriendlyErrorMessage(error: AuthError): string {
  const code = error.code;
  console.log("Auth Error Code:", code, "Message:", error.message);
  
  switch (code) {
    case "auth/popup-closed-by-user":
      return "The sign-in popup was closed before completion. Please try again.";
    case "auth/cancelled-popup-request":
      return "The sign-in request was cancelled. Please try again.";
    case "auth/popup-blocked":
      return "The sign-in popup was blocked by your browser. Please allow popups for this site and try again.";
    case "auth/operation-not-allowed":
      return "Google Sign-In is not enabled or allowed in this project. Please contact the administrator.";
    case "auth/network-request-failed":
      return "A network connection error occurred. Please check your internet connection.";
    default:
      return error.message || "An unexpected error occurred. Please try again.";
  }
}

/**
 * Sign in using Google Provider (Popup-based flow).
 */
export async function signInWithGoogle(): Promise<AuthResponse> {
  try {
    const provider = new GoogleAuthProvider();
    provider.setCustomParameters({
      prompt: "select_account"
    });
    const userCredential = await signInWithPopup(auth, provider);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    const friendlyError = getFriendlyErrorMessage(error as AuthError);
    return { user: null, error: friendlyError };
  }
}

/**
 * Sign out the currently logged in user.
 */
export async function signOut(): Promise<{ error: string | null }> {
  try {
    await firebaseSignOut(auth);
    return { error: null };
  } catch (error: any) {
    const friendlyError = getFriendlyErrorMessage(error as AuthError);
    return { error: friendlyError };
  }
}
