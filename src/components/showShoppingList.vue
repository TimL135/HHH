<template>
  <Modal title="hinzufügen">
    <addShoppingItem :group="group" :user="user"></addShoppingItem>
    <template #button>
      <div class="m-1">
        <Button class="btn btn-primary w-100">add</Button>
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
        <Button class="btn btn-danger w-100">clear</Button>
      </div>
    </template>
  </Modal>
  <div v-for="shoppingItem of Object.entries(group.shoppingList.shoppingItems || {})">
    <Modal>
      <showShoppingItem :group="group" :user="user" :item="shoppingItem[1]" :itemKey="shoppingItem[0]"></showShoppingItem>
      <template #button>{{ shoppingItem[0] }}({{ shoppingItem[1].amount }})</template>
    </Modal>
  </div>
</template>
<script setup lang="ts">
import { computed, ref, toRefs, watch } from 'vue';
import * as type from '../types';
import { TextInput, TextareaInput, SelectInput, Button, RadioGroup, DateInput, TimeInput, CheckboxInput, Modal } from 'custom-mbd-components';
import { repeatOptions } from '../global';
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
    groupUser: type.GroupUser[];
    user: type.User;
  }>(),
  {}
);
const { group, groupUser, user } = toRefs(props);
</script>
<style scoped></style>
