<template>
  Ersteller: {{ creator?.name }}
  <TextInput placeholder="kurz Beschreibung" v-model="title"></TextInput>
  <SelectInput placeholder="zugewiesen" v-model="searchSelect" :options="groupUser" :option-projection="e => e.name"
    @select-item="e => (worker = e.id)"></SelectInput>
  <RadioGroup class="mt-2 p-0 py-2" v-model="repeat" :options="repeatOptions"></RadioGroup>
  <DateInput placeholder="nächster Termin" v-model="appointment" v-if="repeat >= 1"></DateInput>
  <TextareaInput placeholder="Notizen (optinoal)" v-model="notes"></TextareaInput>
  erstellt
  <div class="d-flex">
    <div class="w-50 me-2">
      <DateInput placeholder="am" v-model="createDate" disabled></DateInput>
    </div>
    <div class="w-50">
      <TimeInput placeholder="um" v-model="createTime" disabled></TimeInput>
    </div>
  </div>

  <div class="my-2">
    <CheckboxInput v-model="done">erledigt</CheckboxInput>
  </div>
  <div class="d-flex">
    <Button class="btn btn-primary me-2" @click="editTask(false)">speichern</Button>
    <Button class="btn btn-primary me-2" @click="editTask(true)" v-if="done && repeat != 0">neu anlegen</Button>
    <Button class="btn btn-danger " @click="deleteTask(group.id, taskId)">delete</Button>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue';
import * as type from '../types';
import { TextInput, TextareaInput, SelectInput, Button, RadioGroup, DateInput, TimeInput, CheckboxInput } from 'custom-mbd-components';
import { repeatOptions } from '../global';
import { addTask, deleteTask } from '../Api';

const props = withDefaults(
  defineProps<{
    group: type.Group;
    groupUser: type.GroupUser[];
    user: type.User;
    task: type.Task;
    taskId: type.Id;
  }>(),
  {}
);
const { group, groupUser, user, task, taskId } = toRefs(props);

const repeat = ref(task.value.repeat);
const title = ref(task.value.title);
const notes = ref(task.value.notes);
const createDate = ref(task.value.createAt);
const createTime = ref(task.value.createAt);
const searchSelect = ref(groupUser.value.find(e => e.id == task.value.worker)?.name || '');
const done = ref(task.value.done);
const worker = ref(task.value.worker);
const appointment = computed({
  get() {
    let newAppointment = new Date();
    const date = task.value.appointment ? new Date(task.value.appointment) : new Date();
    if (!done.value || repeat.value == 0) newAppointment = date;
    else {
      switch (repeat.value) {
        case 1:
          newAppointment = newDateValue(date, 1);
          break;
        case 7:
          newAppointment = newDateValue(date, 7);
          break;
        case 14:
          newAppointment = newDateValue(date, 14);
          break;
        case 31:
          newAppointment = newDateValue(date, 0, 1);
          break;
      }
    }
    return newAppointment.toISOString().substring(0, 10);
  },
  set() { },
});

function newDateValue(date: Date, day = 0, month = 0) {
  if (month) return new Date(new Date(date).setMonth(date.getMonth() + month));
  else return new Date(new Date(date).setDate(date.getDate() + day));
}

const creator = computed(() => {
  return groupUser.value.find(e => e.id == task.value.creator);
});

async function editTask(makeRepeat = false) {

  const editTask = {
    title: title.value,
    notes: notes.value,
    done: done.value,
    creator: user.value.id,
    createAt: task.value.createAt,
    repeat: repeat.value,
    worker: worker.value,
    appointment: appointment.value,
  };
  if (makeRepeat) {
    editTask.done = false;
    editTask.createAt = new Date() + '';
    editTask.appointment = appointment.value;
  }
  try {
    await addTask(group.value.id, taskId.value, editTask);
    document.getElementsByClassName("btn-close")[0]?.click()
  } catch { }
}
</script>
<style scoped></style>
