<template>
  <div v-if="group">
    <Accordion :items="accordionItems" v-if="groupUser.length" style="width: 90vw;">
      <template #users>
        <div v-for="user of groupUser">
          {{ user.name }}
        </div>
      </template>
      <template #addTask>
        <Modal title="Aufgabe hinzufügen" v-model="addModal">
          <createTask :group="group" :groupUser="groupUser" :user="user" v-model="addModal"></createTask>
          <template #button>
            <div style="height: 1px;"></div>
            <div class="m-1 ">
              <Button class="py-2 btn btn-success w-100">Aufgabe hinzufügen</Button>
            </div>
          </template>
        </Modal>
      </template>
      <template #myTasks>
        <div v-for=" done of [true, false]">
          <div>{{ (!done ? 'nicht ' : '') + 'erledigt' }}</div>
          <div
            v-for="task of Object.entries(group.tasks).filter(e => e[1].worker == user.id).filter(e => e[1].done == done).sort((a, b) => +(a[1].appointment || a[1].createAt) - +(b[1].appointment || b[1].createAt))"
            class="mb-1">
            <Modal :title="task[1].title">
              <showTask :task="task[1]" :group="group" :groupUser="groupUser" :user="user" :task-id="task[0]"
                v-model="showModal"></showTask>
              <template #button>
                <div class="m-1">
                  <Button class="btn btn-primary w-100">{{ task[1].title }} ({{ new
                    Date(task[1].appointment || task[1].createAt).toLocaleDateString() }})</Button>
                </div>
              </template>
            </Modal>
          </div>
        </div>
      </template>
      <template #tasks>
        <div v-for=" done of [true, false]">
          <div>{{ (!done ? 'nicht ' : '') + 'erledigt' }}</div>
          <div
            v-for="task of Object.entries(group.tasks).filter(e => e[1].done == done).filter(e => e[1].worker || e[1].done == true).sort((a, b) => +(a[1].appointment || a[1].createAt) - +(b[1].appointment || b[1].createAt))"
            class="mb-1">
            <Modal :title="task[1].title">
              <showTask :task="task[1]" :group="group" :groupUser="groupUser" :user="user" :task-id="task[0]"
                v-model="showModal"></showTask>
              <template #button>
                <div class="m-1">
                  <Button class="btn btn-primary w-100">{{ task[1].title }} ({{ new
                    Date(task[1].appointment || task[1].createAt).toLocaleDateString() }})</Button>
                </div>
              </template>
            </Modal>
          </div>
        </div>
        <div>
          <div>nicht zugewiesen</div>
          <div
            v-for="task of Object.entries(group.tasks).filter(e => !e[1].worker && !e[1].done).sort((a, b) => +(a[1].appointment || a[1].createAt) - +(b[1].appointment || b[1].createAt))"
            class="mb-1">
            <Modal :title="task[1].title">
              <showTask :task="task[1]" :group="group" :groupUser="groupUser" :user="user" :task-id="task[0]"
                v-model="showModal"></showTask>
              <template #button>
                <div class="m-1">
                  <Button class="btn btn-primary w-100">{{ task[1].title }} ({{ new
                    Date(task[1].appointment || task[1].createAt).toLocaleDateString() }})</Button>
                </div>
              </template>
            </Modal>
          </div>
        </div>
      </template>
      <template #shoppingList>
        <showShoppingList :group="group" :user="user"></showShoppingList>
      </template>
    </Accordion>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue';
import * as type from '../types';
import { Modal, Accordion, Button } from 'custom-mbd-components';
import createTask from './createTask.vue';
import showTask from './showTask.vue';
import showShoppingList from './showShoppingList.vue';

const props = withDefaults(
  defineProps<{
    group: type.Group;
    groupUser: type.GroupUser[];
    user: type.User;
  }>(),
  {}
);
const { group, groupUser, user } = toRefs(props);

const addModal = ref(false);
const showModal = ref(false);

const accordionItems = computed(() => {
  const array = [];
  array.push({ title: 'Mitglieder', hash: 'users' });
  array.push({
    title: 'Aufgabe hinzufügen',
    hash: 'addTask',
    noAccordion: true,
  });
  array.push({ title: 'Meine Aufgaben', hash: 'myTasks' });
  array.push({ title: 'Aufgaben', hash: 'tasks' });
  array.push({ title: 'Einkaufsliste', hash: 'shoppingList' });
  return array;
});
</script>
<style scoped></style>
