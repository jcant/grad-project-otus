<script setup lang="ts">
import type { ShoppingList } from "~/misc/types";
import { dateToString } from "~/misc/date_utils";
import { useShopListStore } from "~/store/shoplist_store";

const props = defineProps<{ shopList: ShoppingList }>();
const shopListStore = useShopListStore();
const isSelected = computed(
  () => props.shopList.id == shopListStore.currentShopList?.id
);

function selectItem() {
  shopListStore.setCurrentShopList(props.shopList);
}
</script>

<template>
  <v-container class="pt-1 pb-1" @click="selectItem">
    <v-sheet
      class="cursor-pointer"
      elevation="3"
      rounded
      :color="isSelected ? 'yellow-lighten-3' : ''"
      ><div>{{ shopList.name }}</div>
      <div>{{ dateToString(new Date(shopList.createdAt)) }}</div>
    </v-sheet>
  </v-container>
</template>

<style scoped></style>
