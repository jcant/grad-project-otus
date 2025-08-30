import type { ShoppingList } from "~/misc/types";
import { getShoppingLists } from "~/server/data/get_shopping_lists";

const shoppingLists: Array<ShoppingList> = getShoppingLists();

export default defineEventHandler(() => {
  return shoppingLists;
});
