import { getSupabase, isSupabaseConfigured } from "./supabase";

// Define strict typing for Auth User
export interface LocalUser {
  id: string;
  email: string;
  displayName?: string;
}

// Define strict typing for Auth Response
export interface AuthResponse {
  user: LocalUser | null;
  error: string | null;
}

/**
 * Validate if an email matches a general format (example@domain.com).
 */
export function isValidEmail(email: string): boolean {
  const cleanEmail = email.trim().toLowerCase();
  const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
  return emailPattern.test(cleanEmail);
}

// Global active session state
let currentSessionUser: LocalUser | null = null;
let authChangeSubscribers: ((user: LocalUser | null) => void)[] = [];

// Track if subscription has been initialized
let supabaseSubscriptionInitialized = false;

function notifySubscribers() {
  authChangeSubscribers.forEach((cb) => cb(currentSessionUser));
}

function initSupabaseAuthSubscription() {
  if (supabaseSubscriptionInitialized) return;
  if (!isSupabaseConfigured()) return;

  try {
    const supabase = getSupabase();
    
    // Get initial user session
    supabase.auth.getSession().then(({ data: { session } }) => {
      const user = session?.user;
      if (user) {
        currentSessionUser = {
          id: user.id,
          email: user.email || "",
          displayName: user.user_metadata?.displayName || user.email?.split("@")[0] || "Student",
        };
      } else {
        currentSessionUser = null;
      }
      notifySubscribers();
    });

    // Listen for auth state changes
    supabase.auth.onAuthStateChange((event, session) => {
      console.log("Supabase Auth Event:", event);
      const user = session?.user;
      if (user) {
        currentSessionUser = {
          id: user.id,
          email: user.email || "",
          displayName:
            user.user_metadata?.displayName ||
            user.email?.split("@")[0] ||
            "Student",
        };
      } else {
        currentSessionUser = null;
      }
      notifySubscribers();
    });

    supabaseSubscriptionInitialized = true;
  } catch (err) {
    console.error("Error setting up Supabase auth listener:", err);
  }
}

/**
 * Subscribe to authentication state changes.
 * Emulates the auth observer pattern.
 */
export function subscribeToAuthChanges(callback: (user: LocalUser | null) => void): () => void {
  authChangeSubscribers.push(callback);

  if (isSupabaseConfigured()) {
    initSupabaseAuthSubscription();
    callback(currentSessionUser);
  } else {
    // Local fallback when Supabase is not configured yet
    const saved = localStorage.getItem("csc101_currentUser");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        currentSessionUser = {
          id: parsed.id || "local-fallback-id",
          email: parsed.email || "",
          displayName: parsed.displayName || parsed.email.split("@")[0],
        };
      } catch (e) {
        currentSessionUser = null;
      }
    } else {
      currentSessionUser = null;
    }
    callback(currentSessionUser);
  }

  return () => {
    authChangeSubscribers = authChangeSubscribers.filter((cb) => cb !== callback);
  };
}

/**
 * Sign up a new user using Supabase, or falls back to localStorage.
 */
export async function signUp(email: string, password: string): Promise<AuthResponse> {
  const cleanEmail = email.trim().toLowerCase();

  if (!isValidEmail(cleanEmail)) {
    return { user: null, error: "Please enter a valid email address (e.g., user@example.com)." };
  }

  if (!password || password.length < 6) {
    return { user: null, error: "Password must be at least 6 characters long." };
  }

  if (!isSupabaseConfigured()) {
    // Local Fallback sign up logic
    try {
      const usersStr = localStorage.getItem("csc101_users") || "[]";
      const users = JSON.parse(usersStr);

      const userExists = users.some((u: any) => u.email === cleanEmail);
      if (userExists) {
        return { user: null, error: "An account with this email address already exists." };
      }

      const displayName = cleanEmail.split("@")[0];
      const id = "local-" + Math.random().toString(36).substr(2, 9);
      const newUser = { id, email: cleanEmail, password, displayName };

      users.push(newUser);
      localStorage.setItem("csc101_users", JSON.stringify(users));

      const localUser: LocalUser = { id, email: cleanEmail, displayName };
      localStorage.setItem("csc101_currentUser", JSON.stringify(localUser));
      currentSessionUser = localUser;
      notifySubscribers();

      return { user: localUser, error: null };
    } catch (e) {
      return { user: null, error: "A local storage error occurred during registration." };
    }
  }

  try {
    const supabase = getSupabase();
    const displayName = cleanEmail.split("@")[0];
    const { data, error } = await supabase.auth.signUp({
      email: cleanEmail,
      password,
      options: {
        data: {
          displayName: displayName,
        },
      },
    });

    if (error) {
      return { user: null, error: error.message };
    }

    if (!data.user) {
      return { user: null, error: "Account created but no user data returned." };
    }

    const localUser: LocalUser = {
      id: data.user.id,
      email: data.user.email || cleanEmail,
      displayName: data.user.user_metadata?.displayName || displayName,
    };

    currentSessionUser = localUser;
    notifySubscribers();
    return { user: localUser, error: null };
  } catch (err: any) {
    return { user: null, error: err.message || "An error occurred during registration." };
  }
}

/**
 * Sign in an existing user using Supabase, or falls back to localStorage.
 */
export async function signIn(email: string, password: string): Promise<AuthResponse> {
  const cleanEmail = email.trim().toLowerCase();

  if (!cleanEmail || !password) {
    return { user: null, error: "Please fill in all fields." };
  }

  if (!isSupabaseConfigured()) {
    // Local Fallback sign in logic
    try {
      const usersStr = localStorage.getItem("csc101_users") || "[]";
      const users = JSON.parse(usersStr);

      const user = users.find((u: any) => u.email === cleanEmail && u.password === password);
      if (!user) {
        return { user: null, error: "Incorrect email or password. Please try again." };
      }

      const loggedInUser: LocalUser = {
        id: user.id || "local-fallback-id",
        email: user.email,
        displayName: user.displayName || user.email.split("@")[0],
      };

      localStorage.setItem("csc101_currentUser", JSON.stringify(loggedInUser));
      currentSessionUser = loggedInUser;
      notifySubscribers();

      return { user: loggedInUser, error: null };
    } catch (e) {
      return { user: null, error: "A local storage error occurred during sign-in." };
    }
  }

  try {
    const supabase = getSupabase();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: cleanEmail,
      password,
    });

    if (error) {
      return { user: null, error: error.message };
    }

    if (!data.user) {
      return { user: null, error: "Sign in succeeded but no user data returned." };
    }

    const localUser: LocalUser = {
      id: data.user.id,
      email: data.user.email || cleanEmail,
      displayName: data.user.user_metadata?.displayName || cleanEmail.split("@")[0],
    };

    currentSessionUser = localUser;
    notifySubscribers();
    return { user: localUser, error: null };
  } catch (err: any) {
    return { user: null, error: err.message || "An error occurred during sign-in." };
  }
}

/**
 * Sign out the current user session.
 */
export async function signOut(): Promise<{ error: string | null }> {
  if (!isSupabaseConfigured()) {
    localStorage.removeItem("csc101_currentUser");
    currentSessionUser = null;
    notifySubscribers();
    return { error: null };
  }

  try {
    const supabase = getSupabase();
    const { error } = await supabase.auth.signOut();
    if (error) {
      return { error: error.message };
    }
    currentSessionUser = null;
    notifySubscribers();
    return { error: null };
  } catch (err: any) {
    localStorage.removeItem("csc101_currentUser");
    currentSessionUser = null;
    notifySubscribers();
    return { error: err.message || "An error occurred during sign out." };
  }
}
