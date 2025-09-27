import { signUpFirebase } from "@/services/auth.service";
import { useRouter } from "vue-router";
import { useSWR } from "@/composables/common/useSWR";
import type { authPayload } from "~/models/requests/auth";
import { useErrorHandler } from "../common/useErrorHandler";
import { useToast } from "vue-toastification";

export function useSignUp() {
  const router = useRouter();
  const toast = useToast();

  const { data, error, loading, action } = useSWR(
    async (payload: authPayload) => {
      const { token, email } = await signUpFirebase(
        payload.email,
        payload.password,
      );
      // Store token and user email in sessionStorage
      sessionStorage.setItem("firebaseToken", token);
      sessionStorage.setItem("firebaseEmail", email || "");
      return { token, email };
    },
    {
      autoExecute: false,
      onSuccess: ({ token, email }) => {
        toast.success("Account created successfully!");
        router.push("/");
      },
      onError: (error: any) => {
        useErrorHandler(error);
      },
    },
  );

  return { data, error, loading, action };
}
