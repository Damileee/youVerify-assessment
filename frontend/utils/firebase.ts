// Imported functions needed from the SDKs
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Web app's Firebase configuration
const config = useRuntimeConfig();
const firebaseConfig = {
  apiKey: config.public.firebaseApiKey,
  authDomain: config.public.firebaseAuthDomain,
  projectId: config.public.firebaseProjectId,
  storageBucket: config.public.firebaseStorageBucket,
  messagingSenderId: config.public.firebaseMessagingSenderId,
  appId: config.public.firebaseAppId,
  measurementId: config.public.firebaseMeasurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
