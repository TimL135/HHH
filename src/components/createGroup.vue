<template>
  <div>
    <TextInput placeholder="name" v-model="name"></TextInput>
    <TextInput placeholder="password" v-model="password"></TextInput>
    <!-- <CheckboxInput v-model="isPublic">private Gruppe</CheckboxInput> -->
    <Button class="btn btn-primary w-100 mt-2" @click="create">erstellen</Button>
  </div>
</template>
<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';
import * as type from '../types';
import { TextInput, CheckboxInput, Button } from 'custom-mbd-components';
import { addGroup } from '../Api';

const props = withDefaults(defineProps<{ modelValue: string; user: type.User }>(), {});
const { modelValue, user } = toRefs(props);

const emit = defineEmits(['update:modelValue']);

const name = ref('');
const password = ref('');
const isPublic = ref(true);
async function create() {
  try {
    const group = {
      name: name.value,
      isPublic: isPublic.value,
      users: [user.value.id] as type.Id[],
      tasks: {} as type.Tasks,
      shoppingList: {},
    } as type.Group;
    const id = await addGroup(group);

    emit('update:modelValue', '');
  } catch { }
}
</script>
<style scoped></style>
