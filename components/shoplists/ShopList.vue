<script setup lang="ts">
import type { ShoppingList } from "~/misc/types";
import ShopItem from "./ShopItem.vue";

const props = defineProps<{ shopList: ShoppingList }>();
</script>

<template>
  <v-container>
    <v-row> List № {{ shopList.id }} created: {{ shopList.createdAt }} </v-row>
    <v-row v-for="item in shopList.items">
      <ShopItem :shopItem="item"></ShopItem>
    </v-row>
  </v-container>
</template>

<style scoped></style>
