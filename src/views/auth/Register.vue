<template>
  <div>
    <TextInput placeholder="name" v-model="name" name="name"></TextInput>
    <EmailInput placeholder="email" v-model="email" name="email"></EmailInput>
    <PasswordInput placeholder="passwort" v-model="password" name="password"></PasswordInput>
    <PasswordInput placeholder="passwort bestätigen" v-model="confirmPassword" name="confirmPassword"></PasswordInput>
    <Button @click="register" class="btn btn-primary w-100 mt-3">registrieren</Button>
  </div>
</template>
<script setup lang="ts">
import { ref } from "vue";
import * as type from "../../types";
import * as API from "../../Api";
import {
  TextInput,
  PasswordInput,
  EmailInput,
  Button,
} from "custom-mbd-components";
import { view } from "../../global";
const name = ref("");
const email = ref("");
const password = ref("");
const confirmPassword = ref("");
const errors = ref({} as type.Errors);
async function register() {
  errors.value = {};
  if (password.value != confirmPassword.value)
    for (let e of ["password", "confirmPassword"])
      errors.value[e] = "Die Passwörter stimmen nicht überein";
  if (!name.value) errors.value["name"] = "Du musst einen Namen angeben";
  if (!name.value) errors.value["email"] = "Du musst eine Email angeben";
  if (!password.value)
    errors.value["password"] = "Du musst ein Passwort angeben";
  if (!confirmPassword.value)
    errors.value["confirmPassword"] = "Du musst dein Passwort bestätigen";
  if (Object.keys(errors.value).length > 0) return;
  try {
    await API.register(name.value, email.value, password.value);
    view.value = "dashboard";
  } catch { }
}
</script>
<style scoped></style>
