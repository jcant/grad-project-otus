<script setup lang="ts">
import Header from "~/components/Header.vue";
import { onBeforeMount } from "vue";
import { useAuthStore } from "~/store/auth_store";
import type { ShoppingList } from "~/misc/types";
import { getShoppingListsByUserId } from "~/components/data/api";
import ShopList from "~/components/shoplists/ShopList.vue";

const authStore = useAuthStore();
const shoppingLists = ref<ShoppingList[] | undefined>();
const { isAuthorized } = storeToRefs(authStore);

authStore.$subscribe(async (mutation, state) => {
  console.log("in subscribe: isAuthorized: ", isAuthorized.value);
  if (isAuthorized.value) {
    shoppingLists.value = await getShoppingListsByUserId(authStore.user!.id);
    console.log("shoplists111: ", shoppingLists.value);
  }
});
</script>
<template>
  <v-container>
    <v-row>
      <Header class="mx-auto"></Header>
    </v-row>
    <v-row class="text-center">
      <v-col cols="4" class="bg-amber text-center">
        <v-row> USER ACTIVE SHOPLISTS </v-row>
        <v-row v-for="shopList in shoppingLists"
          ><ShopList :shop-list="shopList"></ShopList
        ></v-row>
        <v-row> USER SHOPLISTS ARCHIVE</v-row>
      </v-col>
      <v-col class="bg-amber text-center">
        <v-row> USER ACTIVE SHOPLISTS </v-row>
        <v-row> USER SHOPLISTS ARCHIVE</v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
h1 {
  color: red;
}
</style>
