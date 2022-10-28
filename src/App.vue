<script setup lang="ts">
import { provide, reactive } from "vue";
import { RouterView } from "vue-router";
import SignInForm from "./views/SignInForm.vue";
import SignUpForm from "./views/SignUpForm.vue";
import ResetPassword from "./views/ResetPassword.vue";
import "./assets/styles/reset.css";

interface User {
  name: string;
  email: string;
  password: string;
}

const user: User = reactive({
  name: "",
  email: "",
  password: ""
});

provide<User>("user", user);
</script>

<template>
  <main id="main">
    <RouterView />
    <!-- <SignInForm />
    <SignUpForm />
    <ResetPassword /> -->
  </main>
  {{ user.email }}
</template>

<style>
:root {
  --light-fg-color: #2e3440;
  --light-bg-color: #eceff4;
  --border-color: #d8dee9;
  --primary-color: #88c0d0;
  --secondary-color: #81a1c1;
  --warning-color: #ebcb8b;
  --error-color: #bf616a;
}

body {
  color: var(--light-fg-color);
  font-family: sans-serif;
}

#main {
  display: flex;
  flex-direction: column;
  width: 360px;
  margin: 0 auto;
  padding: 0 15px;
}
</style>
