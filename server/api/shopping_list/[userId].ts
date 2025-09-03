import { getShoppingListByUserId } from "../../data/get_shoplists_sqlite";

export default defineEventHandler((event) => {
  const userId = getRouterParam(event, "userId");
  const shoppingLists = getShoppingListByUserId(Number(userId));
  return shoppingLists;
});
