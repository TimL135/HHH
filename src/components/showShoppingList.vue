<template>
  <Modal title="hinzufügen">
    <addShoppingItem :group="group" :user="user"></addShoppingItem>
    <template #button>
      <div class="m-1">
        <Button class="btn btn-success w-100">hinzufügen</Button>
      </div>
    </template>
  </Modal>
  <Modal title=" Einkaufsliste leeren?" v-if="Object.entries(group.shoppingList.shoppingItems || {}).length > 0">
    <div>
      <Button class="me-2 btn btn-primary" @click="clear">ja</Button>
      <Button @click="closeModal">nein</Button>
    </div>
    <template #button>
      <div class="m-1">
        <Button class="btn btn-danger w-100">leeren</Button>
      </div>
    </template>
  </Modal>
  <div v-for="shoppingItem of Object.entries(group.shoppingList.shoppingItems || {})">
    <Modal>
      <showShoppingItem :group="group" :user="user" :item="shoppingItem[1]" :itemKey="shoppingItem[0]"></showShoppingItem>
      <template #button>
        <div class="m-1">
          <Button class="w-100 btn btn-primary">{{ shoppingItem[0] }} ({{ shoppingItem[1].amount }})</Button>
        </div>
      </template>
    </Modal>
  </div>
</template>
<script setup lang="ts">
import { toRefs } from 'vue';
import * as type from '../types';
import { Button, Modal } from 'custom-mbd-components';
import { clearShoppingList } from '../Api';
import addShoppingItem from './addShoppingItem.vue';
import showShoppingItem from './showShoppingItem.vue';

function clear() {
  clearShoppingList(group.value.id)
  closeModal()
}

function closeModal() {
  document.getElementsByClassName(" btn-close")[0]?.click()
}
const props = withDefaults(
  defineProps<{
    group: type.Group;
    user: type.User;
  }>(),
  {}
);
const { group, user } = toRefs(props);
</script>
<style scoped></style>
