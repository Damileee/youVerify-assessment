import { signInFirebase } from "@/services/auth.service";
import { useSWR } from "@/composables/common/useSWR";
import type { authPayload } from "~/models/requests/auth";
import { useErrorHandler } from "../common/useErrorHandler";
import { useToast } from "vue-toastification";
import { useAuthCookies } from "./useAuthCookies";

export function useSignIn() {
  const toast = useToast();
  const { token, email } = useAuthCookies();

  const { data, error, loading, action } = useSWR(
    async (payload: authPayload) => {
      const { token: firebaseToken, email: firebaseEmail } =
        await signInFirebase(payload.email, payload.password);

      token.value = firebaseToken;
      email.value = firebaseEmail;

      return { token: firebaseToken, email: firebaseEmail };
    },
    {
      autoExecute: false,
      onSuccess: () => {
        toast.success("Logged in successfully!");
        navigateTo("/invoice");
      },
      onError: (error: any) => {
        useErrorHandler(error);
      },
    },
  );

  return { data, error, loading, action };
}
