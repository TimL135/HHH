<template>
  <div v-if="user">Moin, {{ user.name }}</div>
</template>
<script setup lang="ts">
import { ref, toRefs, watch } from "vue";
import * as type from "../types";
const props = withDefaults(
  defineProps<{ modelValue: string; user: type.User }>(),
  {}
);
const { modelValue } = toRefs(props);
const emit = defineEmits(["update:modelValue"]);
function switchRoute(route: string) {
  emit("update:modelValue", route);
}
</script>
<style scoped></style>
