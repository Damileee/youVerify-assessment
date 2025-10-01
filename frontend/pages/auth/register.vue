<template>
  <AuthForm
    title="Create your account"
    buttonText="Sign up"
    :onSubmit="signup"
    :loading="signUpSWR.loading.value"
    footerText="Already a member?"
    footerAction="Sign In"
    footerLink="/auth/login"
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
      <label for="password" class="block text-sm font-medium text-gray-900"
        >Password</label
      >
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
import { useSignUp } from "@/composables/auth";

//Define SWR
const signUpSWR = useSignUp();

//Define reactive state
const form = reactive({
  email: "",
  password: "",
});

// Async Function
async function signup() {
  await signUpSWR.action(form);
}

definePageMeta({
  layout: false,
});
</script>
