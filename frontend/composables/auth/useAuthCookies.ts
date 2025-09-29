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

  return {
    token,
    email,
  };
}
