<template>
  <div v-if="user.groups.length == 0">
    Du hast noch keine Gruppe
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
    <div v-for="e of user.groups" @click="loadGroup(e)">
      {{ e.name }}
    </div>
    <showGroup :group="group" :groupUser="groupUsers" :user="user"></showGroup>
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


const group = ref({});
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
