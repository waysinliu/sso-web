<script setup lang="ts">
import { inject, ref } from "vue";
import { useRouter } from "vue-router";
import { FormInst, FormItemRule, FormRules, NAlert, NButton, NForm, NFormItem, NInput } from "naive-ui";
import { User } from "../ts/interface";
import { trimSpace } from "../ts/utils";
import Title from "../components/Title.vue";
import "../assets/styles/form.css";

const user = inject("user") as User;

const formRef = ref<FormInst | null>(null);
const rules: FormRules = {
  name: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("Enter your username.");
        } else if (!/^([a-zA-z0-9]+[\-\_])*[a-zA-z0-9]+$/.test(value)) {
          return new Error(
            "Username may only contain alphanumeric or single hyphen characters, and cannot begin or end with a hyphen."
          );
        } else {
          return true;
        }
      },
      trigger: "blur"
    }
  ],
  email: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("Enter your email address.");
        } else if (!/^([a-zA-Z0-9]+[\.\-\_])*[a-zA-Z0-9]+@([a-zA-Z0-9]+\.)+[a-zA-Z0-9]+$/.test(value)) {
          return new Error("Email address is invalid.");
        } else {
          return true;
        }
      },
      trigger: "blur"
    }
  ],
  password: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("Enter your password.");
        } else if (value.length < 6 || value.length > 32) {
          return new Error("Password must be between 6 and 32 characters.");
        } else if (!/^[\w\,\<\.\>\/\?\;\:\'\"\[\{\]\}\\\|\!\@\#\$\%\^\&\*\(\)\-\=\+\`\~$]+$/.test(value)) {
          return new Error("Password contains invalid characters.");
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

const handleSignUp = (e: MouseEvent) => {
  formRef.value?.validate((errors) => {
    if (!errors) {
      console.log("Success");
    } else {
      console.log("Fail");
    }
  });
};
</script>

<template>
  <Title title="Sign up to FiLog" />
  <NAlert type="error" closable v-if="false">Incorrect email address or password.</NAlert>
  <NForm ref="formRef" :show-require-mark="false" :model="user" :rules="rules">
    <NFormItem path="name" label="Username">
      <NInput placeholder="" v-model:value="user.name" :allow-input="trimSpace" />
    </NFormItem>
    <NFormItem path="email" label="Email address">
      <NInput placeholder="" v-model:value="user.email" :allow-input="trimSpace" />
    </NFormItem>
    <NFormItem path="password" label="Password">
      <NInput
        type="password"
        show-password-on="click"
        placeholder=""
        v-model:value="user.password"
        :allow-input="trimSpace"
      />
    </NFormItem>
    <NButton class="submit" type="primary" @click="handleSignUp">Sign up</NButton>
  </NForm>
  <p class="footer">Already have an account? <NButton text type="info" @click="toSignIn">Sign in</NButton>.</p>
</template>
