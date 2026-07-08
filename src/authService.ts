// Local Client-Side Authentication Service using browser localStorage
export interface LocalUser {
  email: string;
  displayName?: string;
}

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

/**
 * Retrieve the currently logged-in user from localStorage.
 */
export function getCurrentUser(): LocalUser | null {
  try {
    const userStr = localStorage.getItem("csc101_currentUser");
    return userStr ? JSON.parse(userStr) : null;
  } catch (e) {
    console.error("Error reading current user from localStorage:", e);
    return null;
  }
}

// Active subscription list for auth state updates
let authChangeSubscribers: ((user: LocalUser | null) => void)[] = [];

/**
 * Subscribe to authentication state changes. 
 * Emulates the Firebase onAuthStateChanged observer pattern.
 */
export function subscribeToAuthChanges(callback: (user: LocalUser | null) => void): () => void {
  authChangeSubscribers.push(callback);
  // Trigger callback immediately with the current state on subscription
  callback(getCurrentUser());
  
  // Return an unsubscribe function
  return () => {
    authChangeSubscribers = authChangeSubscribers.filter(cb => cb !== callback);
  };
}

/**
 * Notify all subscribers of authentication state changes.
 */
function notifySubscribers() {
  const currentUser = getCurrentUser();
  authChangeSubscribers.forEach(cb => cb(currentUser));
}

/**
 * Sign up a new user using localStorage.
 */
export async function signUp(email: string, password: string): Promise<AuthResponse> {
  // Simulate network latency for a polished UX feel
  await new Promise(resolve => setTimeout(resolve, 800));

  const cleanEmail = email.trim().toLowerCase();

  if (!isValidEmail(cleanEmail)) {
    return { user: null, error: "Please enter a valid email address (e.g., user@example.com)." };
  }

  if (!password || password.length < 6) {
    return { user: null, error: "Password must be at least 6 characters long." };
  }

  try {
    const usersStr = localStorage.getItem("csc101_users") || "[]";
    const users = JSON.parse(usersStr);

    // Check if user already exists
    const userExists = users.some((u: any) => u.email === cleanEmail);
    if (userExists) {
      return { user: null, error: "An account with this email address already exists." };
    }

    // Auto-generate a friendly display name from the email
    const displayName = email.split("@")[0];
    const newUser = { email: cleanEmail, password, displayName };
    
    // Save new user
    users.push(newUser);
    localStorage.setItem("csc101_users", JSON.stringify(users));

    // Sign the user in automatically upon registration
    localStorage.setItem("csc101_currentUser", JSON.stringify({ email: cleanEmail, displayName }));
    notifySubscribers();

    return { user: { email: cleanEmail, displayName }, error: null };
  } catch (e) {
    console.error("Error during signUp:", e);
    return { user: null, error: "A local storage error occurred while saving your account." };
  }
}

/**
 * Sign in an existing user using credentials from localStorage.
 */
export async function signIn(email: string, password: string): Promise<AuthResponse> {
  // Simulate network latency for a polished UX feel
  await new Promise(resolve => setTimeout(resolve, 800));

  const cleanEmail = email.trim().toLowerCase();

  if (!cleanEmail || !password) {
    return { user: null, error: "Please fill in all fields." };
  }

  try {
    const usersStr = localStorage.getItem("csc101_users") || "[]";
    const users = JSON.parse(usersStr);

    const user = users.find((u: any) => u.email === cleanEmail && u.password === password);
    if (!user) {
      return { user: null, error: "Incorrect email or password. Please try again." };
    }

    const loggedInUser: LocalUser = {
      email: user.email,
      displayName: user.displayName || user.email.split("@")[0]
    };

    localStorage.setItem("csc101_currentUser", JSON.stringify(loggedInUser));
    notifySubscribers();

    return { user: loggedInUser, error: null };
  } catch (e) {
    console.error("Error during signIn:", e);
    return { user: null, error: "A local storage error occurred during sign-in." };
  }
}

/**
 * Sign out the currently logged in user.
 */
export async function signOut(): Promise<{ error: string | null }> {
  try {
    localStorage.removeItem("csc101_currentUser");
    notifySubscribers();
    return { error: null };
  } catch (e) {
    console.error("Error during signOut:", e);
    return { error: "An error occurred while signing out." };
  }
}
