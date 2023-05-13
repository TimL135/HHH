<template>
  <div class="container d-flex justify-content-center mt-5">
    <div>
      <Button v-if="newData" @click="forceRerender">load new Data</Button>
      <Register v-if="view == 'register'" v-model="view"></Register>
      <Login v-if="view == 'login'" v-model="view"></Login>
      <Dashboard v-if="view == 'dashboard'" v-model="view" :user="userData"></Dashboard>
      <Groups v-if="view == 'groups' && renderComponent" v-model="view" :user="userData"></Groups>
    </div>
  </div>
  <Navbar v-model="view" :user="userData"></Navbar>
</template>
<script setup lang="ts">
import { ref, toRefs, watch, nextTick } from 'vue';
import * as type from './types';
import Register from './views/auth/Register.vue';
import Dashboard from './views/Dashboard.vue';
import Groups from './views/Groups.vue';
import Login from './views/auth/Login.vue';
import Navbar from './components/Navbar.vue';
import { user, userData, reloads, rerender } from './Api';
import { Button } from 'custom-mbd-components';
const view = ref('login');

if (!user.value) view.value = 'login';
else view.value = 'dashboard';

watch(reloads, newValue => {
  if (newValue > 1) newData.value = true;
});
watch(rerender, newValue => {
  forceRerender()
})
const newData = ref(false);

const renderComponent = ref(true);
const forceRerender = async () => {
  // Remove MyComponent from the DOM
  renderComponent.value = false;
  // Wait for the change to get flushed to the DOM
  await nextTick();
  // Add the component back in
  renderComponent.value = true;
  newData.value = false;
};
</script>
<style scoped></style>
