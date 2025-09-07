import { serverApi } from "~/misc/constants";
import type { ShoppingItem, ShoppingList, User } from "~/misc/types";

export async function getUsers() {
  let users: User[] = [];
  const result = await useFetch(serverApi.GET_ALL_USERS, {
    key: Date.now().toString(), // Unique key disables cache reuse
  });

  if (result.error.value != undefined) {
    throw new Error(String(result.error.value));
  }

  users = <User[]>result.data.value;
  return users;
}

export async function getShoppingListsByUserId(
  userId: Number,
  isCompleted: boolean
): Promise<ShoppingList[]> {
  const result: ShoppingList[] = await $fetch(
    serverApi.GET_SHOPPING_LIST + String(userId),
    {
      method: "post",
      body: { mode: isCompleted },
      key: Date.now().toString(), // Unique key disables cache reuse
    }
  );

  return result;
}

export async function postShoppingItem(shopItem: ShoppingItem) {
  const result = await $fetch(serverApi.POST_SHOPPING_ITEM, {
    method: "post",
    body: shopItem,
  });
}

export async function postShoppingList(
  shopList: ShoppingList
): Promise<number> {
  const result = await $fetch(serverApi.POST_SHOPPING_LIST, {
    method: "post",
    body: shopList,
  });
  return Number(result);
}
