<template>
    <div>
        <NumberInput placeholder="anzahl" v-model="amount"></NumberInput>
        <TextInput placeholder="beschreibung" v-model="description"></TextInput>
        <Button @click="edit()" class="mt-2 me-2 btn btn-primary">bearbeiten</Button>
        <Button @click="deleteShoppingItem(group.id, itemKey)" class="mt-2 btn btn-danger">löschen</Button>
    </div>
</template>
<script setup lang="ts">
import { ref, toRefs } from 'vue';
import * as type from '../types';
import { TextInput, Button, NumberInput } from 'custom-mbd-components';
import { closeModal } from '../global';
import { addShoppingItem, deleteShoppingItem } from '../Api';

const props = withDefaults(
    defineProps<{
        group: type.Group;
        user: type.User;
        item: type.ShoppingItem
        itemKey: type.ShoppingKey
    }>(),
    {}
);
const { group, user, item, itemKey } = toRefs(props);
const shopItem = ref(itemKey.value)
const amount = ref(item.value.amount)
const description = ref(item.value.description)
async function edit() {
    const item = {
        amount: amount.value,
        done: false,
        description: description.value,
        creator: user.value.id
    } as type.ShoppingItem
    await addShoppingItem(group.value.id, shopItem.value, item);
    closeModal()
}
</script>
<style scoped></style>
  