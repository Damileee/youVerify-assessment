export default defineNuxtRouteMiddleware((to) => {
  const publicRoutes = ["/auth/login", "/auth/register"];
  const authCookie = useCookie<string | null>("firebaseToken");

  // If logged in and trying to access login/register → redirect to home
  if (authCookie.value && publicRoutes.includes(to.path)) {
    return navigateTo("/invoice");
  }

  if (authCookie.value && to.path === "/") {
    return navigateTo("/invoice");
  }

  // If not logged in and trying to access private routes → redirect to login
  if (!authCookie.value && !publicRoutes.includes(to.path)) {
    return navigateTo("/auth/login");
  }
});
