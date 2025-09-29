// types/nuxt.d.ts
import type { Auth } from 'firebase/auth'
import type { FirebaseApp } from 'firebase/app'

declare module '#app' {
  interface NuxtApp {
    $firebaseApp: FirebaseApp
    $auth: Auth
  }
}

declare module 'vue' {
  interface ComponentCustomProperties {
    $firebaseApp: FirebaseApp
    $auth: Auth
  }
}
