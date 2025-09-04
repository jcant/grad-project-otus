<script setup lang="ts">
import type { ShoppingList } from "~/misc/types";
import { dateToString } from "~/misc/date_utils";
import { useShopListStore } from "~/store/shoplist_store";

const props = defineProps<{ shopList: ShoppingList }>();
const shopListStore = useShopListStore();
const isSelected = computed(
  () => props.shopList.id == shopListStore.currentShopList?.id
);
const progress = computed(() => {
  const countItems = props.shopList.items.length;
  const countBoughtItems = props.shopList.items.filter(
    (item) => item.isBought
  ).length;
  return Math.round(100 * (countBoughtItems / countItems));
});

function selectItem() {
  shopListStore.setCurrentShopList(props.shopList);
}
</script>

<template>
  <v-container class="pt-1 pb-1 cursor-pointer">
    <v-row>
      <v-col cols="9">
        <v-sheet
          @click="selectItem"
          elevation="3"
          rounded
          :color="isSelected ? 'yellow-lighten-3' : ''"
        >
          <div>{{ shopList.name }}</div>
          <div>{{ dateToString(new Date(shopList.createdAt)) }}</div>
        </v-sheet>
      </v-col>
      <v-col>
        <v-progress-circular
          :model-value="progress"
          :rotate="360"
          :size="50"
          :width="6"
          color="amber"
        >
          {{ progress }}
        </v-progress-circular>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
