<script setup lang="ts">
import { inject, ref } from "vue";
import { useRouter } from "vue-router";
import { FormInst, FormItemRule, FormRules, NButton, NForm, NFormItem, NInput } from "naive-ui";
import { User } from "../ts/interface";
import { trimSpace } from "../ts/utils";
import Title from "../components/Title.vue";
import "../assets/styles/form.css";

const user = inject("user") as User;

const form = ref<FormInst | null>(null);
const rules: FormRules = {
  email: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("Enter your email address.");
        } else if (!/^([a-zA-Z\d]+[\.\-\_])*[a-zA-Z\d]+@([a-zA-Z\d]+\.)+[a-zA-Z\d]+$/.test(value)) {
          return new Error("Email address is invalid.");
        } else {
          return true;
        }
      },
      trigger: "blur"
    }
  ]
};

const router = useRouter();
const toSignIn = () => {
  router.push("/signin");
};

const handleReset = (e: MouseEvent) => {
  form.value?.validate((errors) => {
    if (!errors) {
      console.log("Success");
    } else {
      console.log("Fail");
    }
  });
};
</script>

<template>
  <Title title="Reset your password" />
  <NForm ref="form" :show-require-mark="false" :model="user" :rules="rules">
    <NFormItem path="email" label="Email address">
      <NInput placeholder="" v-model:value="user.email" :allow-input="trimSpace" />
    </NFormItem>
    <NButton class="submit" type="primary" @click="handleReset">Send password reset email</NButton>
  </NForm>
  <p class="footer">Recall the password? <NButton text type="info" @click="toSignIn">Back to sign in</NButton>.</p>
</template>
