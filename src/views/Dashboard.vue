<template>
  <h1 v-if="user">Moin, {{ user.name }}</h1>

  <div v-if="tasksToday.length > 0" class="mt-4">
    <h3 class="mb-2 ">
      Aufgaben für heute
    </h3>
    <div v-for="e of tasksToday">
      <h4 class="mb-2">{{ e.name }}</h4>
      <div v-for="task of Object.entries(e.tasks)">
        <Modal :title="task[1].title">
          <showTask dashboard :task="task[1]" :group="e" :groupUser="e.users" :user="user" :task-id="task[0]">
          </showTask>
          <template #button>
            <div class="m-1">
              <Button class="btn btn-primary w-100">{{ task[1].title }} ({{ new
                Date(task[1].appointment || task[1].createAt).toLocaleDateString() }})</Button>
            </div>
          </template>
        </Modal>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { ref, toRefs } from "vue";
import * as type from "../types";
import showTask from "../components/showTask.vue";
import { Modal, Button } from "custom-mbd-components";
const props = withDefaults(
  defineProps<{ user: type.User }>(),
  {}
);
const { user } = toRefs(props);
const tasksToday = ref<type.Group[]>([])

tasksToday.value = user.value.groups.map(group => ({
  ...group, tasks:
    Object.entries(group.tasks)
      .filter(e => new Date(e[1].appointment || e[1].createAt).toLocaleDateString() == new Date().toLocaleDateString())
      .filter(e => e[1].worker == user.value.id || e[1].worker == null)
      .filter(e => e[1].done == false)
      .reduce((a, b) => ({ ...a, [b[0]]: b[1] }), {})
}))


</script>
<style scoped></style>
