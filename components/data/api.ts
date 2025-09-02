import { serverApi } from "~/misc/constants";
import type { ShoppingList, User } from "~/misc/types";

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

export async function getShoppingListsByUserId(userId: Number) {
  let shopLists: ShoppingList[] = [];

  const result = await useFetch(serverApi.GET_SHOPPING_LIST + String(userId), {
    key: Date.now().toString(), // Unique key disables cache reuse
  });

  if (result.error.value != undefined) {
    throw new Error(String(result.error.value));
  }

  shopLists = <ShoppingList[]>result.data.value;
  return shopLists;
}
