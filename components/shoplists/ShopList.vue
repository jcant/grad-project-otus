<script setup lang="ts">
import type { ShoppingList } from "~/misc/types";
import ShopItem from "./ShopItem.vue";
import { dateToString } from "~/misc/date_utils";
import { postShoppingList } from "../data/api";
import { useShopListStore } from "~/store/shoplist_store";
import { pages } from "~/misc/constants";

const props = defineProps<{ shopList: ShoppingList }>();
const shopListStore = useShopListStore();

function saveArchiveState() {
  props.shopList.isCompleted = true;
  props.shopList.completedAt = new Date();
  postShoppingList(props.shopList);
  shopListStore.refreshShopLists();
}

function saveActiveState() {
  props.shopList.isCompleted = false;
  props.shopList.completedAt = undefined;
  postShoppingList(props.shopList);
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
  <v-card
    :title="String(shopList?.name)"
    :subtitle="
      String(`created: ${dateToString(new Date(shopList.createdAt!))}`)
    "
  >
    <v-card-text>
      <ShopItem
        v-for="item in shopList?.items"
        :shopItem="item"
        :shopListInArchive="shopList.isCompleted!"
      ></ShopItem>
    </v-card-text>
    <v-card-actions>
      <v-btn
        v-if="!shopList.isCompleted"
        variant="outlined"
        @click="saveArchiveState"
        >Archive List</v-btn
      >
      <v-btn
        v-if="shopList.isCompleted"
        variant="outlined"
        @click="saveActiveState"
        >Get Back Active List</v-btn
      >
      <v-btn variant="outlined" @click="goToRepeatShopList">Repeat List</v-btn>
      <v-btn variant="outlined" @click="goToNewShopList"
        >Create New Empty List</v-btn
      >
    </v-card-actions>
  </v-card>
</template>

<style scoped></style>
