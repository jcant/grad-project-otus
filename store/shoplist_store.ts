import { ref } from "vue";
import { defineStore } from "pinia";
import type { ShoppingList } from "~/misc/types";

export const useShopListStore = defineStore("shop_list", () => {
  const currentShopList = ref<ShoppingList>();

  function setCurrentShopList(shopList: ShoppingList) {
    currentShopList.value = shopList;
  }

  function $reset() {
    currentShopList.value = undefined;
  }

  return {
    currentShopList,
    setCurrentShopList,
    $reset,
  };
});
