<script setup lang="ts">
import type { ShoppingList } from "~/misc/types";
import ShopItem from "./ShopItem.vue";
import { dateToString } from "~/misc/date_utils";

const props = defineProps<{ shopList: ShoppingList }>();
</script>

<template>
  <v-card
    :title="String(shopList?.name)"
    :subtitle="
      String(`created: ${dateToString(new Date(shopList?.createdAt))}`)
    "
  >
    <v-card-text>
      <ShopItem v-for="item in shopList?.items" :shopItem="item"></ShopItem>
    </v-card-text>
  </v-card>
</template>

<style scoped></style>
