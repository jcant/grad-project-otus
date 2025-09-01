import { ShoppingList } from "~/misc/types";
import { getTestShoppingLists } from "~/misc/test_shopping_lists";

export function getShoppingLists(): ShoppingList[] {
  return getTestShoppingLists();
}

export function getShoppingListById(id: number): ShoppingList | undefined {
  const allLists = getTestShoppingLists();
  const searchedList = allLists.find((list) => list.id == id);
  return searchedList;
}
