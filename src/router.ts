import { createRouter, createWebHistory } from "vue-router";
import SignInForm from "./views/SignInForm.vue";
import SignUpForm from "./views/SignUpForm.vue";
import ResetPassword from "./views/ResetPassword.vue";

export default createRouter({
  history: createWebHistory(),
  routes: [
    { path: "/signin", component: SignInForm },
    { path: "/signup", component: SignUpForm },
    { path: "/reset", component: ResetPassword }
  ]
});
