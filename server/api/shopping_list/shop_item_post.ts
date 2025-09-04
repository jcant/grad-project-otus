import { saveShoppingItem } from "~/server/data/save_shopitem_sqlite";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  await saveShoppingItem(body);
});
