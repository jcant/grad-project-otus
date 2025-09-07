<script setup lang="ts">
import type { ShoppingItem } from "~/misc/types";

const props = defineProps<{ shopItem: ShoppingItem }>();

const rules = {
  required: (value: string) => !!value || "The field id required!",
};
</script>

<template>
  <v-sheet class="pa-3 w-100 bg-lime-lighten-5" border rounded>
    <v-form @submit.prevent>
      <v-row>
        <v-col cols="4" md="4">
          <v-text-field
            v-model="shopItem.name"
            :rules="[rules.required]"
            label="Name"
          ></v-text-field>
        </v-col>
        <v-col md="4">
          <v-text-field v-model="shopItem.count" label="count"></v-text-field
        ></v-col>
        <v-col md="4"
          ><v-text-field
            v-model="shopItem.measure"
            label="Measure"
          ></v-text-field
        ></v-col>
      </v-row>
    </v-form>
  </v-sheet>
</template>

<style scoped></style>
