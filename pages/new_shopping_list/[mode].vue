<script setup lang="ts">
import { ref } from "vue";
import { type ShoppingItem, type ShoppingList } from "~/misc/types";
import { useAuthStore } from "~/store/auth_store";
import { useShopListStore } from "~/store/shoplist_store";

const authStore = useAuthStore();
const shopListStore = useShopListStore();
const { isAuthorized } = storeToRefs(authStore);
const params = useRoute().params;

const newShopList = ref<ShoppingList>();

authStore.$subscribe(async (mutation, state) => {
  if (isAuthorized.value) {
    let newList: ShoppingList;
    if (params.mode == "new") {
      newList = {
        id: undefined,
        user_id: authStore.user?.id,
        isCompleted: false,
        createdAt: new Date(),
        items: new Array<ShoppingItem>(),
      };
    } else {
      newList = shopListStore.currentShopList!;
      newList.id = undefined;
      newList.isCompleted = false;
      newList.items?.forEach((item) => {
        item.id = undefined;
        item.isBought = false;
      });
    }

    newShopList.value = newList;
  }
});
</script>

<template>
  <v-container>
    <v-row>
      <Header class="mx-auto"></Header>
    </v-row>
    <v-row class="text-center">
      <v-col class="text-center">
        <v-container>
          <v-row justify="center">
            <div class="text-center w-100 text-h5">New Shopping List</div>
            <ShoplistsNewShopListForm
              v-if="newShopList != undefined"
              :shop-list="newShopList"
            ></ShoplistsNewShopListForm>
          </v-row>
        </v-container>
      </v-col>
    </v-row>
  </v-container>
</template>

<style scoped></style>
