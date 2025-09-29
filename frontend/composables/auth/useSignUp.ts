import { signUpFirebase } from "@/services/auth.service";
import { useSWR } from "@/composables/common/useSWR";
import type { authPayload } from "~/models/requests/auth";
import { useErrorHandler } from "../common/useErrorHandler";
import { useToast } from "vue-toastification";
import { useAuthCookies } from "./useAuthCookies";

export function useSignUp() {
  const toast = useToast();
  const { token, email } = useAuthCookies();

  const { data, error, loading, action } = useSWR(
    async (payload: authPayload) => {
      const { token: firebaseToken, email: firebaseEmail } = await signUpFirebase(
        payload.email,
        payload.password,
      );
      // store token in cookies
      token.value = firebaseToken;
      email.value = firebaseEmail
      return { token, email };
    },
    {
      autoExecute: false,
      onSuccess: () => {
        toast.success("Account created successfully!");
        navigateTo("/invoice");
      },
      onError: (error: any) => {
        useErrorHandler(error);
      },
    },
  );

  return { data, error, loading, action };
}
