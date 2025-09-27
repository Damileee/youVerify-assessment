import { signInFirebase } from "@/services/auth.service";
import { useRouter } from "vue-router";
import { useSWR } from "@/composables/common/useSWR";
import type { authPayload } from "~/models/requests/auth";
import { useErrorHandler } from "../common/useErrorHandler";
import { useToast } from "vue-toastification";

export function useSignIn() {
  const router = useRouter();
  const toast = useToast();

  const { data, error, loading, action } = useSWR(
    async (payload: authPayload) => {
      const { token, email } = await signInFirebase(
        payload.email,
        payload.password,
      );
      // Store token in sessionStorage
      sessionStorage.setItem("firebaseToken", token);
      sessionStorage.setItem("firebaseEmail", email || "");
      return { token, email };
    },
    {
      autoExecute: false,
      onSuccess: ({ token, email }) => {
        toast.success("Logged in successfully!");
        router.push("/");
      },
      onError: (error: any) => {
        useErrorHandler(error);
      },
    },
  );

  return { data, error, loading, action };
}
