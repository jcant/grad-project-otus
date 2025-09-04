<script setup lang="ts">
import type { ShoppingItem } from "~/misc/types";
import { postShoppingItem } from "../data/api";
const props = defineProps<{ shopItem: ShoppingItem }>();
const checkedClass: String = "text-decoration-line-through text-disabled";

function saveState() {
  postShoppingItem(props.shopItem);
}
</script>

<template>
  <v-row align="center">
    <v-col :class="shopItem.isBought ? checkedClass : ''">
      {{ shopItem.name }}
    </v-col>
    <v-col :class="shopItem.isBought ? checkedClass : ''">
      {{ shopItem.count }} {{ shopItem.measure }}
    </v-col>
    <v-col class="mt-0 mb-0 pt-0 pb-0">
      <v-checkbox
        color="success"
        label="got"
        hide-details
        v-model="shopItem.isBought"
        @change="saveState"
      ></v-checkbox>
    </v-col>
  </v-row>
</template>

<style scoped></style>
