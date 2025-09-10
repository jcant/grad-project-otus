<script setup lang="ts">
import ShopItem from "./ShopItem.vue";
import { dateToString } from "~/misc/date_utils";
import { useShopListStore } from "~/store/shoplist_store";

const shopListStore = useShopListStore();
const { currentShopList } = storeToRefs(shopListStore);
</script>

<template>
  <v-card
    :title="String(currentShopList?.name)"
    :subtitle="
      String(`created: ${dateToString(new Date(currentShopList?.createdAt!))}`)
    "
  >
    <v-card-text>
      <ShopItem
        v-for="item in currentShopList?.items"
        :shopItem="item"
        :shopListInArchive="currentShopList?.isCompleted!"
      ></ShopItem>
    </v-card-text>
  </v-card>
</template>

<style scoped></style>
