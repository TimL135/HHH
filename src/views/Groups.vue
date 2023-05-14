<template>
  <div v-if="user.groups.length == 0">
    <h4>Du hast noch keine Gruppe</h4>
    <div>
      <Button class="me-2 btn btn-primary" @click="view = 'search'">Gruppe Suche</Button>
      <Button class="btn btn-primary" @click="view = 'create'">Gruppe erstellen</Button>
    </div>
    <div>
      <createGroup v-if="view == 'create'" v-model="view" :user="user"></createGroup>
      <searchGroup :user="user" v-if="view == 'search'"></searchGroup>
    </div>
  </div>
  <div v-else>
    <h4 v-for="e of user.groups" @click="loadGroup(e)"
      :class="group?.name == e.name ? 'text-decoration-underline text-primary' : ''">
      {{ e.name }}
    </h4>
    <showGroup :group="group" :groupUser="groupUsers" :user="user"></showGroup>
    <div class="mt-2">
      <h3>weitere Gruppe finden</h3>
      <searchGroup :user="user"></searchGroup>
    </div>
    <div class="mt-2">
      <h3>neue Gruppe erstellen</h3>
      <createGroup :user="user" v-model="view"></createGroup>
    </div>

  </div>
</template>
<script setup lang="ts">
import { ref, toRefs } from 'vue';
import * as type from '../types';
import createGroup from '../components/createGroup.vue';
import showGroup from '../components/showGroup.vue';
import searchGroup from '../components/searchGroup.vue';
import { Button } from 'custom-mbd-components';
import { getGroupUsers } from '../Api';

const props = withDefaults(defineProps<{ user: type.User }>(), {});
const { user } = toRefs(props);

const view = ref('');


const group = ref({} as type.Group);
if (user.value.groups.length == 1) loadGroup(user.value.groups[0])
const groupUsers = ref([] as type.GroupUser[]);
async function loadGroup(e: type.Group) {
  try {
    [group.value, groupUsers.value] = [e, await getGroupUsers(e.users)];
  } catch {
    group.value = e
    groupUsers.value = []
  }
}
</script>
<style scoped></style>
