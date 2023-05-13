<template>
  <div class="container d-flex justify-content-center mt-5">
    <div>
      <Button v-if="newData" @click="forceRerender">neue daten laden</Button>
      <Register v-if="view == 'register'"></Register>
      <Login v-if="view == 'login'"></Login>
      <Dashboard v-if="view == 'dashboard'" :user="userData"></Dashboard>
      <Groups v-if="view == 'groups' && renderComponent" :user="userData"></Groups>
    </div>
  </div>
  <Navbar :user="userData"></Navbar>
</template>
<script setup lang="ts">
import { ref, watch, nextTick } from 'vue';
import Register from './views/auth/Register.vue';
import Dashboard from './views/Dashboard.vue';
import Groups from './views/Groups.vue';
import Login from './views/auth/Login.vue';
import Navbar from './components/Navbar.vue';
import { userData, reloads, rerender } from './Api';
import { Button } from 'custom-mbd-components';
import { view } from './global';

watch(reloads, newValue => {
  if (newValue > 1) newData.value = true;
});
watch(rerender, () => {
  forceRerender()
})
const newData = ref(false);

const renderComponent = ref(true);
const forceRerender = async () => {
  renderComponent.value = false;
  await nextTick();
  renderComponent.value = true;
  newData.value = false;
};
</script>
<style scoped></style>
