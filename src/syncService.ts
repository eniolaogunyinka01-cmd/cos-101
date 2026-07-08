import { getSupabase, isSupabaseConfigured } from "./supabase";

// Local storage keys to include in cloud sync
const KEYS_TO_SYNC = [
  "csc101_activeTab",
  "csc101_readChapters",
  "csc101_darkMode",
  "csc101_quiz_examMode",
  "csc101_quiz_activeSet",
  "csc101_quiz_currentQuestionIndex",
  "csc101_quiz_selectedOptionIndex",
  "csc101_quiz_isAnswerConfirmed",
  "csc101_quiz_correctAnswersCount",
  "csc101_quiz_quizFinished",
  "csc101_quiz_userAnswersHistory",
  "csc101_ai_messages"
];

export interface SyncStatus {
  status: "synced" | "syncing" | "offline" | "error" | "unconfigured";
  message: string;
}

// Global state for subscribers
let syncStatus: SyncStatus = { 
  status: isSupabaseConfigured() ? "synced" : "unconfigured", 
  message: isSupabaseConfigured() ? "All progress synced to cloud" : "Supabase credentials not configured yet" 
};

let statusSubscribers: ((status: SyncStatus) => void)[] = [];

/**
 * Subscribe to status updates of cloud sync operations.
 */
export function subscribeToSyncStatus(callback: (status: SyncStatus) => void): () => void {
  statusSubscribers.push(callback);
  callback(syncStatus);
  return () => {
    statusSubscribers = statusSubscribers.filter(cb => cb !== callback);
  };
}

function updateSyncStatus(status: SyncStatus) {
  syncStatus = status;
  statusSubscribers.forEach(cb => cb(status));
}

/**
 * Fetch student study progress, quiz states, and chat history from Supabase
 * and synchronize it with the local localStorage values.
 */
export async function fetchStateFromSupabase(userId: string): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    updateSyncStatus({ status: "unconfigured", message: "Supabase credentials not configured yet" });
    return false;
  }

  try {
    updateSyncStatus({ status: "syncing", message: "Fetching cloud progress..." });
    const supabase = getSupabase();
    
    const { data, error } = await supabase
      .from("student_progress")
      .select("data")
      .eq("id", userId)
      .maybeSingle();

    if (error) {
      console.error("Error fetching cloud state:", error);
      updateSyncStatus({ status: "offline", message: "Unable to sync with cloud. Operating offline." });
      return false;
    }

    if (data && data.data) {
      const payload = data.data;
      // Write fetched keys to localStorage
      KEYS_TO_SYNC.forEach(key => {
        if (payload[key] !== undefined) {
          if (typeof payload[key] === "object" && payload[key] !== null) {
            localStorage.setItem(key, JSON.stringify(payload[key]));
          } else if (payload[key] !== null) {
            localStorage.setItem(key, String(payload[key]));
          } else {
            localStorage.removeItem(key);
          }
        }
      });
      updateSyncStatus({ status: "synced", message: "Cloud progress synced successfully" });
      return true;
    }

    updateSyncStatus({ status: "synced", message: "Ready. No prior cloud save found." });
    return false;
  } catch (err) {
    console.error("Network error fetching state:", err);
    updateSyncStatus({ status: "offline", message: "Network connection error. Operating in offline mode." });
    return false;
  }
}

/**
 * Packs all local study state from localStorage and upserts it into the Supabase database.
 */
export async function saveStateToSupabase(userId: string): Promise<boolean> {
  if (!isSupabaseConfigured()) {
    return false;
  }

  try {
    updateSyncStatus({ status: "syncing", message: "Saving progress to cloud..." });
    const supabase = getSupabase();

    // Pack the data from localStorage
    const payload: Record<string, any> = {};
    KEYS_TO_SYNC.forEach(key => {
      const value = localStorage.getItem(key);
      if (value !== null) {
        try {
          payload[key] = JSON.parse(value);
        } catch {
          payload[key] = value;
        }
      } else {
        payload[key] = null;
      }
    });

    // Determine current user email
    const { data: { user } } = await supabase.auth.getUser();
    const email = user?.email || "student@domain.com";

    const { error } = await supabase
      .from("student_progress")
      .upsert({
        id: userId,
        email: email,
        data: payload,
        updated_at: new Date().toISOString()
      });

    if (error) {
      console.error("Error saving state to Supabase:", error);
      updateSyncStatus({ status: "error", message: "Could not save progress to cloud." });
      return false;
    }

    updateSyncStatus({ status: "synced", message: "All progress synced to cloud" });
    return true;
  } catch (err) {
    console.error("Network error saving state:", err);
    updateSyncStatus({ status: "offline", message: "Changes saved locally. Sync suspended." });
    return false;
  }
}

// Debounce timer for auto-syncing
let syncDebounceTimer: any = null;

/**
 * Triggers a debounced background sync of student progress to Supabase.
 */
export function triggerCloudSync() {
  if (!isSupabaseConfigured()) return;
  
  try {
    const supabase = getSupabase();
    supabase.auth.getSession().then(({ data: { session } }) => {
      const userId = session?.user?.id;
      if (!userId) return;

      if (syncDebounceTimer) {
        clearTimeout(syncDebounceTimer);
      }

      updateSyncStatus({ status: "syncing", message: "Progress updated..." });
      syncDebounceTimer = setTimeout(() => {
        saveStateToSupabase(userId);
      }, 1500); // 1.5 second debounce delay
    });
  } catch (e) {
    console.error("Error triggering cloud sync:", e);
  }
}
