import { useToast } from "vue-toastification";

export function useErrorHandler(error: any) {
  const toast = useToast();
  if (!error) return;

  // 1. Network errors
  if (
    error.code === "ERR_NETWORK" ||
    error.code === "ECONNABORTED" ||
    error.message?.includes("Network Error") ||
    error.message?.includes("timeout")
  ) {
    toast.error("Network error, please check your connection.");
    return;
  }

  // 2. Firebase REST API error mapping
  const firebaseRestErrorMap: Record<string, string> = {
    INVALID_LOGIN_CREDENTIALS: "Email or password is incorrect.",
    INVALID_API_KEY: "Invalid Firebase API key.",
    INVALID_EMAIL: "Your email address appears to be malformed.",
    USER_DISABLED: "This account has been disabled.",
    TOO_MANY_ATTEMPTS_TRY_LATER: "Too many attempts. Please try again later.",
  };
  const firebaseRestCode = error.response?.data?.error?.message;
  if (firebaseRestCode && firebaseRestErrorMap[firebaseRestCode]) {
    toast.error(firebaseRestErrorMap[firebaseRestCode]);
    return;
  }

  // 3. Firebase JS SDK error mapping (e.g. "auth/invalid-credential")
  const firebaseSdkErrorMap: Record<string, string> = {
    "auth/invalid-credential": "Email or password is incorrect.",
    "auth/invalid-email": "Email or password is incorrect.",
    "auth/user-disabled": "This account has been disabled.",
    "auth/user-not-found": "No account found with this email.",
    "auth/wrong-password": "Email or password is incorrect.",
  };
  if (error.code && firebaseSdkErrorMap[error.code]) {
    toast.error(firebaseSdkErrorMap[error.code]);
    return;
  }

  // 4. Axios error with response
  if (error.response?.data) {
    const msg =
      error.response.data.message ||
      error.response.data.error?.message ||
      "Something went wrong. Please try again.";
    toast.error(msg);
    return;
  }

  // 5. Fallback
  toast.error("An unexpected error occurred. Please try again.");
  console.error("🔥 Unhandled error:", error);
}
