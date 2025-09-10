<script setup lang="ts">
import { postShoppingList } from "~/components/data/api";
import { useShopListStore } from "~/store/shoplist_store";
import { pages } from "~/misc/constants";

const shopListStore = useShopListStore();
const { currentShopList } = storeToRefs(shopListStore);

function saveArchiveState() {
  currentShopList.value!.isCompleted = true;
  currentShopList.value!.completedAt = new Date();
  postShoppingList(currentShopList.value!);
  shopListStore.refreshShopLists();
}

function saveActiveState() {
  currentShopList.value!.isCompleted = false;
  currentShopList.value!.completedAt = undefined;
  postShoppingList(currentShopList.value!);
  shopListStore.refreshShopLists();
}

function goToNewShopList() {
  navigateTo(pages.NEW_SHOPPING_LIST + "/new");
}

function goToRepeatShopList() {
  navigateTo(pages.NEW_SHOPPING_LIST + "/repeat");
}
</script>

<template>
  <v-card-actions>
    <v-btn
      v-if="(currentShopList) && (!currentShopList!.isCompleted)"
      variant="outlined"
      @click="saveArchiveState"
      >Archive List</v-btn
    >
    <v-btn
      v-if="(currentShopList) && (currentShopList!.isCompleted)"
      variant="outlined"
      @click="saveActiveState"
      >Get Back Active List</v-btn
    >
    <v-btn v-if="currentShopList" variant="outlined" @click="goToRepeatShopList"
      >Repeat List</v-btn
    >
    <v-btn variant="outlined" @click="goToNewShopList"
      >Create New Empty List</v-btn
    >
  </v-card-actions>
</template>

<style scoped></style>
