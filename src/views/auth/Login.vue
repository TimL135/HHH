<template>
  <div>
    <EmailInput placeholder="email" v-model="email"></EmailInput>
    <PasswordInput placeholder="passwort" v-model="password"></PasswordInput>
    <Button @click="login" class="w-100 btn btn-primary mt-2"> login</Button>
    <Button @click="switchRoute('register')" class="w-100 btn btn-primary mt-2">
      register</Button>
  </div>
</template>
<script setup lang="ts">
import { ref, watch } from "vue";
import * as API from "../../Api";
import { PasswordInput, EmailInput, Button } from "custom-mbd-components";
import { view } from "../../global";

const email = ref("");
const password = ref("");

watch(API.user, () => switchRoute("dashboard"))

async function login() {
  try {
    await API.login(email.value, password.value);
    switchRoute("dashboard");
  } catch { }
}

function switchRoute(route: string) {
  view.value = route;
}
</script>
<style scoped></style>
