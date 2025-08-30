import { getShoppingListById } from "../../data/get_shopping_lists";

export default defineEventHandler((event) => {
  const shoppingListId = getRouterParam(event, "id");
  const shoppingList = getShoppingListById(Number(shoppingListId));

  if (typeof shoppingList == "undefined") {
    throw createError({
      statusCode: 400,
      statusMessage: "Not found Shopping List with such ID!",
    });
  } else {
    return shoppingList;
  }
});
