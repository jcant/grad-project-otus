import { getShoppingListByUserId } from "../../data/get_shoplists_sqlite";

export default defineEventHandler((event) => {
  const userId = getRouterParam(event, "userId");
  const shoppingLists = getShoppingListByUserId(Number(userId));

  // if (typeof shoppingLists == "undefined") {
  //   throw createError({
  //     statusCode: 400,
  //     statusMessage: "Not found Shopping List with such ID!",
  //   });
  // } else {
  return shoppingLists;
});
