import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

export const signInFirebase = async (email: string, password: string) => {
  const { $auth } = useNuxtApp();
  const userCredential = await signInWithEmailAndPassword(
    $auth,
    email,
    password,
  );
  const token = await userCredential.user.getIdToken();
  return { token, email: userCredential.user.email };
};

export const signUpFirebase = async (email: string, password: string) => {
  const { $auth } = useNuxtApp();
  const userCredential = await createUserWithEmailAndPassword(
    $auth,
    email,
    password,
  );
  const token = await userCredential.user.getIdToken();
  return { token, email: userCredential.user.email };
};
