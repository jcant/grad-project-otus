<script setup lang="ts">
import { ref } from "vue";
import type { ShoppingItem, ShoppingList } from "~/misc/types";
import NewShopItemForm from "./NewShopItemForm.vue";
import { postShoppingItem, postShoppingList } from "../data/api";
import { pages } from "~/misc/constants";

const props = defineProps<{ shopList: ShoppingList }>();

const shopItems = ref<ShoppingItem[] | undefined>(props.shopList.items);

const rules = {
  required: (value: string) => !!value || "The field id required!",
};

function addNewItem() {
  const newShopItem: ShoppingItem = {
    name: "",
    count: 1,
    measure: "item",
    isBought: false,
  };
  shopItems.value?.push(newShopItem);

  props.shopList.items = shopItems.value;
}
async function saveNewList() {
  const newListId = await postShoppingList(props.shopList);
  props.shopList.items?.forEach(async (item) => {
    item.shop_list_id = newListId;
    await postShoppingItem(item);
  });
  navigateTo(pages.SHOPPING_LISTS);
}
</script>

<template>
  <v-form @submit.prevent class="w-100">
    <v-container>
      <v-row>
        <v-text-field
          v-model="shopList.name"
          :rules="[rules.required]"
          label="Name"
        ></v-text-field>
      </v-row>
      <v-row>
        <v-text-field
          v-model="shopList.createdAt"
          :rules="[rules.required]"
          type="date"
          label="Created At"
        ></v-text-field>
      </v-row>
      <v-row class="align-center">
        <v-col>ITEMS:</v-col>
        <v-col>
          <v-btn class="w-10" @click="addNewItem">ADD NEW ITEM</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <NewShopItemForm
          v-for="item in shopItems"
          :shop-item="item"
        ></NewShopItemForm>
      </v-row>
      <v-row>
        <v-btn class="mt-2" type="submit" block @click="saveNewList">
          Create new Shopping List
        </v-btn>
      </v-row>
    </v-container>
  </v-form>
</template>

<style scoped></style>
