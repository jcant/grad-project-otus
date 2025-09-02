<script setup lang="ts">
import type { ShoppingItem } from "~/misc/types";
const props = defineProps<{ shopItem: ShoppingItem }>();
</script>

<template>
  <v-container>
    <v-row>
      {{ shopItem.name }} {{ shopItem.count }} {{ shopItem.measure }}
    </v-row>
  </v-container>
</template>

<style scoped></style>
