<script setup lang="ts">
const { title } = defineProps<{ title: string }>();
</script>

<template>
  <div id="wrapper">
    <img id="logo" src="../assets/images/logo.png" alt="logo" />
    <h1 id="title">{{ title }}</h1>
  </div>
</template>

<style scoped>
#wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 60px;
  margin-bottom: 15px;
}

#logo {
  display: block;
  width: 90px;
  height: 90px;
  border: 1px solid var(--border-color);
  border-radius: 50%;
}

#title {
  margin-top: 15px;
  font-family: serif;
  font-weight: normal;
}
</style>
