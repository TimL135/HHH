<template>
  <div>
    <EmailInput placeholder="email" v-model="email"></EmailInput>
    <PasswordInput placeholder="passwort" v-model="password"></PasswordInput>
    <Button @click="login" class="w-100 btn btn-primary mt-2"> login</Button>
    <Button @click="switchRoute('register')" class="w-100 btn btn-primary mt-2">
      register</Button
    >
  </div>
</template>
<script setup lang="ts">
import { ref, toRefs, watch } from "vue";
import * as type from "../../types";
import * as API from "../../Api";
import { PasswordInput, EmailInput, Button } from "custom-mbd-components";

const props = withDefaults(defineProps<{ modelValue: string }>(), {});
const { modelValue } = toRefs(props);
const emit = defineEmits(["update:modelValue"]);

const email = ref("");
const password = ref("");

async function login() {
  try {
    await API.login(email.value, password.value);
    switchRoute("dashboard");
  } catch {}
}

function switchRoute(route: string) {
  emit("update:modelValue", route);
}
</script>
<style scoped></style>
