import { saveShoppingList } from "~/server/data/save_shoplist_sqlite";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  await saveShoppingList(body);
});
