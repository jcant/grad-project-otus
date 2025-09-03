<script setup lang="ts">
import Header from "~/components/Header.vue";
import ShopList from "~/components/shoplists/ShopList.vue";
import { useAuthStore } from "~/store/auth_store";
import type { ShoppingList } from "~/misc/types";
import { getShoppingListsByUserId } from "~/components/data/api";
import ShopListLabel from "~/components/shoplists/ShopListLabel.vue";
import { useShopListStore } from "~/store/shoplist_store";

const authStore = useAuthStore();
const { isAuthorized } = storeToRefs(authStore);

const shopListStore = useShopListStore();
const shoppingLists = ref<ShoppingList[] | undefined>();

authStore.$subscribe(async (mutation, state) => {
  if (isAuthorized.value) {
    shoppingLists.value = await getShoppingListsByUserId(authStore.user!.id);
    if (shoppingLists.value.length > 0)
      shopListStore.setCurrentShopList(shoppingLists.value[0]!);
  }
});
</script>
<template>
  <v-container>
    <v-row>
      <Header class="mx-auto"></Header>
    </v-row>
    <v-row class="text-center">
      <v-col cols="4" class="text-center">
        <v-chip color="amber" variant="elevated" class="mb-6 pl-8 pr-8">
          <div>USER ACTIVE SHOPLISTS</div>
        </v-chip>
        <v-row v-for="shopList in shoppingLists">
          <ShopListLabel :shop-list="shopList"></ShopListLabel>
        </v-row>
        <v-chip color="amber" variant="elevated" class="mb-4 mt-6 pl-8 pr-8">
          USER SHOPLISTS ARCHIVE
        </v-chip>
      </v-col>
      <v-col class="text-center">
        <ShopList :shopList="shopListStore.currentShopList!"></ShopList>
      </v-col>
    </v-row>
  </v-container>
</template>
<style scoped>
h1 {
  color: red;
}
</style>
