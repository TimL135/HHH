<template>
  <div>
    <SelectInput placeholder="gegenstand" @select-item="e => shopItem = e" :options="standartShoppingItems"></SelectInput>
    <NumberInput placeholder="anzahl" v-model="amount"></NumberInput>
    <TextInput placeholder="beschreibung" v-model="description"></TextInput>
    <Button @click="add()" class="mt-2 btn btn-primary">hinzufügen</Button>
  </div>
</template>
<script setup lang="ts">
import { ref, toRefs, } from 'vue';
import * as type from '../types';
import { TextInput, SelectInput, Button, NumberInput } from 'custom-mbd-components';
import { standartShoppingItems } from '../global';
import { addShoppingItem } from '../Api';

const props = withDefaults(
  defineProps<{
    group: type.Group;
    user: type.User;
  }>(),
  {}
);
const shopItem = ref("")
const amount = ref("")
const description = ref("")
const { group, user } = toRefs(props);

async function add() {
  const item = {
    amount: amount.value,
    done: false,
    description: description.value,
    creator: user.value.id
  } as type.ShoppingItem
  try {
    await addShoppingItem(group.value.id, shopItem.value, item);
  } catch {
    console.log("error")
  }
  document.getElementsByClassName("btn-close")[0]?.click()
}
</script>
<style scoped></style>
