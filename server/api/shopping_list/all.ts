import type { ShoppingList } from "~/misc/types";
import { getShoppingLists } from "~/server/data/get_shoplists_sqlite";

export default defineEventHandler(async () => {
  const shoppingLists: Array<ShoppingList> = await getShoppingLists();
  return shoppingLists;
});
