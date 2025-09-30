export function useAuthCookies() {
  const token = useCookie<string | null>("firebaseToken", {
    path: "/",
    sameSite: "lax",
    secure: import.meta.env.PROD, // secure only in prod
  });

  const email = useCookie<string | null>("firebaseEmail", {
    path: "/",
    sameSite: "lax",
    secure: import.meta.env.PROD,
  });

  const logout = () => {
    token.value = null;
    email.value = null;
    return navigateTo("/auth/login");
  };

  return {
    token,
    email,
    logout,
  };
}
