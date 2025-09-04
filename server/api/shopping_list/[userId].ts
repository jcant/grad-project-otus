import { getShoppingListByUserId } from "../../data/get_shoplists_sqlite";

export default defineEventHandler(async (event) => {
  const userId = getRouterParam(event, "userId");
  const body = await readBody(event);
  const shoppingLists = getShoppingListByUserId(Number(userId), body.mode);
  return shoppingLists;
});
