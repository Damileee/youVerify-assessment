<template>
  <AuthForm
    title="Sign in to your account"
    buttonText="Sign in"
    :onSubmit="login"
    footerText="Not a member?"
    footerAction="Sign Up"
    footerLink="/auth/register"
  >
    <div>
      <label for="email" class="block text-sm font-medium text-gray-900"
        >Email address</label
      >
      <div class="mt-2">
        <input
          v-model="form.email"
          type="email"
          id="email"
          required
          class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 sm:text-sm"
        />
      </div>
    </div>

    <div>
      <div class="flex items-center justify-between">
        <label for="password" class="block text-sm font-medium text-gray-900"
          >Password</label
        >
        <div class="text-sm font-semibold text-indigo-600 hover:text-indigo-500 cursor-pointer">
          Forgot password?
        </div>
      </div>
      <div class="mt-2">
        <input
          v-model="form.password"
          type="password"
          id="password"
          required
          class="block w-full rounded-md bg-white px-3 py-1.5 text-base text-gray-900 border border-gray-300 placeholder:text-gray-400 focus:border-indigo-600 focus:ring-1 focus:ring-indigo-600 sm:text-sm"
        />
      </div>
    </div>
  </AuthForm>
</template>

<script setup lang="ts">
import { useSignIn } from "@/composables/auth";

//Define SWR
const signInSWR = useSignIn();

//Define reactive state
const form = reactive({
  email: "",
  password: "",
});

async function login() {
  await signInSWR.action(form);
}
</script>
