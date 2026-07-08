import { 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut as firebaseSignOut, 
  sendPasswordResetEmail,
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
 * Validate if an email matches a general format (example@domain.com).
 * This standard regex accepts any valid email domain (e.g., @gmail.com, @yahoo.com, personal domains).
 */
export function isValidEmail(email: string): boolean {
  const cleanEmail = email.trim().toLowerCase();
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(cleanEmail);
}

/**
 * Maps standard Firebase Auth error codes to user-friendly messages.
 */
export function getFriendlyErrorMessage(error: AuthError): string {
  const code = error.code;
  console.log("Auth Error Code:", code, "Message:", error.message);
  
  switch (code) {
    case "auth/invalid-credential":
    case "auth/wrong-password":
      return "Incorrect email or password. Please verify your credentials and try again.";
    case "auth/user-not-found":
      return "User account does not exist. Please check the spelling or sign up below.";
    case "auth/email-already-in-use":
      return "This email is already registered. Please login instead.";
    case "auth/invalid-email":
      return "Invalid email address format. Please enter a valid email address.";
    case "auth/weak-password":
      return "Password should be at least 6 characters long.";
    case "auth/missing-password":
      return "Please enter a password.";
    case "auth/missing-email":
      return "Please enter an email address.";
    case "auth/user-disabled":
      return "This user account has been disabled. Please contact support.";
    case "auth/too-many-requests":
      return "Too many failed attempts. This account has been temporarily locked. Please try again later.";
    default:
      return error.message || "An unexpected error occurred. Please try again.";
  }
}

/**
 * Sign in existing user with email and password.
 */
export async function signIn(email: string, password: string): Promise<AuthResponse> {
  try {
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    const friendlyError = getFriendlyErrorMessage(error as AuthError);
    return { user: null, error: friendlyError };
  }
}

/**
 * Create a new user with email and password, checking that the email matches a general format.
 */
export async function signUp(
  email: string, 
  password: string
): Promise<AuthResponse> {
  // Validate general email format
  if (!isValidEmail(email)) {
    return {
      user: null,
      error: "Invalid email address format. Please enter a valid email address (e.g., student@domain.com)."
    };
  }

  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    return { user: userCredential.user, error: null };
  } catch (error: any) {
    const friendlyError = getFriendlyErrorMessage(error as AuthError);
    return { user: null, error: friendlyError };
  }
}

/**
 * Reset password for a registered email.
 */
export async function forgotPassword(email: string): Promise<{ success: boolean; error: string | null }> {
  try {
    await sendPasswordResetEmail(auth, email);
    return { success: true, error: null };
  } catch (error: any) {
    const friendlyError = getFriendlyErrorMessage(error as AuthError);
    return { success: false, error: friendlyError };
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
