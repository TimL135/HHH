<template>
  <TextInput placeholder="kurz Beschreibung" v-model="title"></TextInput>
  <SelectInput placeholder="zuweisen" v-model="searchSelect" :options="groupUser" :option-projection="e => e.name"
    @select-item="e => (worker = e.id)"></SelectInput>
  <RadioGroup class="mt-2" v-model="repeat" :options="repeatOptions"></RadioGroup>
  <DateInput placeholder="nächster Termin" v-model="appointment" v-if="repeat >= 1"></DateInput>
  <TextareaInput placeholder="Notizen (optinoal)" v-model="notes"></TextareaInput>
  <Button class="btn btn-primary w-100 mt-2" @click="createTask">erstellen</Button>
</template>
<script setup lang="ts">
import { ref, toRefs, watch } from 'vue';
import * as type from '../types';
import { TextInput, TextareaInput, SelectInput, Button, RadioGroup, CheckboxInput, DateInput } from 'custom-mbd-components';
import { addTask } from '../Api';
import { repeatOptions } from '../global';

const emit = defineEmits(['update:modelValue']);

const props = withDefaults(
  defineProps<{
    group: type.Group;
    groupUser: type.GroupUser[];
    user: type.User;
    modelValue: boolean;
  }>(),
  {}
);
const { group, groupUser, user } = toRefs(props);

const searchSelect = ref('');
const worker = ref('');
const appointment = ref('');
const title = ref('');
const notes = ref('');
const repeat = ref(0);

async function createTask() {
  const task = {
    title: title.value,
    notes: notes.value,
    done: false,
    creator: user.value.id,
    createAt: new Date() + '',
    repeat: repeat.value,
    worker: worker.value,
    appointment: appointment.value,
  };
  try {
    await addTask(group.value.id, JSON.stringify(Math.random()).slice(2), task);
    document.getElementsByClassName("btn-close")[0]?.click()
  } catch { }
}
</script>
<style scoped></style>
