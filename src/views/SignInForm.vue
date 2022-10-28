<script setup lang="ts">
import { inject, ref } from "vue";
import { useRouter } from "vue-router";
import { FormInst, FormItemRule, FormRules, NAlert, NButton, NForm, NFormItem, NInput } from "naive-ui";
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
  ],
  password: [
    {
      required: true,
      validator(rule: FormItemRule, value: string) {
        if (!value) {
          return new Error("Enter your password.");
        } else {
          return true;
        }
      },
      trigger: "blur"
    }
  ]
};

const router = useRouter();
router.beforeEach((to, form) => {
  user.password = "";
});

const toResetPassword = () => {
  router.push("/reset");
};

const toSignUp = () => {
  router.push("/signup");
};

const handleSignIn = (e: MouseEvent) => {
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
  <Title title="Sign in to FiLog" />
  <NAlert type="error" closable v-if="false">Incorrect email address or password.</NAlert>
  <NForm ref="form" :show-require-mark="false" :model="user" :rules="rules">
    <i id="qrcode"></i>
    <NFormItem path="email" label="Email address">
      <NInput placeholder="" v-model:value="user.email" :allow-input="trimSpace" />
    </NFormItem>
    <NFormItem path="password" label="Password">
      <NButton id="forgot" text type="info" @click="toResetPassword">Forgot password?</NButton>
      <NInput
        type="password"
        show-password-on="click"
        placeholder=""
        v-model:value="user.password"
        :allow-input="trimSpace"
      />
    </NFormItem>
    <NButton class="submit" type="primary" @click="handleSignIn">Sign in</NButton>
  </NForm>
  <p class="footer">New to FiLog? <NButton text type="info" @click="toSignUp">Create an account</NButton>.</p>
</template>

<style scoped>
#qrcode {
  display: block;
  width: 24px;
  height: 24px;
  position: absolute;
  top: 10px;
  right: 10px;
  background-color: var(--light-fg-color);
  mask: url("../assets/icons/qrcode.svg");
  transition: filter 0.3s;
}

#qrcode:hover {
  filter: brightness(2);
}

#forgot {
  position: absolute;
  top: -22px;
  right: 0;
  font-size: 0.9em;
}
</style>
