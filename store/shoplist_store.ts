import { ref } from "vue";
import { defineStore } from "pinia";
import type { ShoppingList } from "~/misc/types";
import { getShoppingListsByUserId } from "~/components/data/api";
import { useAuthStore } from "./auth_store";

export const useShopListStore = defineStore("shop_list", () => {
  const currentShopList = ref<ShoppingList>();
  const activeShopLists = ref<ShoppingList[]>();
  const shopListsInArchive = ref<ShoppingList[]>();

  const authStore = useAuthStore();
  const { isAuthorized } = storeToRefs(authStore);

  function setCurrentShopList(shopList: ShoppingList) {
    currentShopList.value = shopList;
  }

  function $reset() {
    currentShopList.value = undefined;
    activeShopLists.value = undefined;
    shopListsInArchive.value = undefined;
  }

  async function refreshShopLists() {
    activeShopLists.value = await getActiveShopLists();
    shopListsInArchive.value = await getShopListsInArchive();

    if (currentShopList.value != undefined) {
      let allLists: ShoppingList[] = [];
      if (activeShopLists.value != undefined) {
        allLists.push(...activeShopLists.value);
      }
      if (shopListsInArchive.value != undefined) {
        allLists.push(...shopListsInArchive.value);
      }

      currentShopList.value = allLists.find(
        (list) => list.id == currentShopList.value?.id
      );
    } else if (activeShopLists.value != undefined) {
      currentShopList.value = activeShopLists.value[0];
    }
  }

  async function getActiveShopLists() {
    if (isAuthorized) {
      return await getShoppingListsByUserId(authStore.user!.id!, false);
    }
  }

  async function getShopListsInArchive() {
    if (isAuthorized) {
      return await getShoppingListsByUserId(authStore.user!.id!, true);
    }
  }

  return {
    refreshShopLists,
    currentShopList,
    activeShopLists,
    shopListsInArchive,
    setCurrentShopList,
    $reset,
  };
});
