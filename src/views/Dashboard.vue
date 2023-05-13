<template>
  <div v-if="user">Moin, {{ user.name }}</div>
</template>
<script setup lang="ts">
import { toRefs } from "vue";
import * as type from "../types";
const props = withDefaults(
  defineProps<{ user: type.User }>(),
  {}
);


</script>
<style scoped></style>
