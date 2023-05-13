<template>
  <div>
    <SearchInput placeholder="Gruppe" v-model="groupSearch">
      <template #button><Button :sideButton="true" @click="getGroups">suche</Button></template>
    </SearchInput>
    <div v-for="group of searchGroups" class="d-flex justify-content-between mt-2">
      {{ group.name }}<Button @click="joinGroup(group.id, user.id)">join</Button>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';
import * as type from '../types';
import { SearchInput, Button } from 'custom-mbd-components';
import { searchGroup, joinGroup } from "../Api"
const props = withDefaults(defineProps<{ user: type.User }>(), {});
const { user } = toRefs(props);
const searchGroups = ref<type.Group[]>([])
const groupSearch = ref('');
async function getGroups() {
  try {
    searchGroups.value = await searchGroup(groupSearch.value)
  } catch {
    console.log("fail")
  }
}
</script>
<style scoped></style>
