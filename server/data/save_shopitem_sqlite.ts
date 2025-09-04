import { ShoppingItem } from "~/misc/types";

export async function saveShoppingItem(shopItem: ShoppingItem): Promise<void> {
  const db = useDatabase();

  //USE SQLite UPSERT functionality...

  const query = `INSERT INTO shop_list_items(id, shop_list_id, name, count, measure, is_bought) VALUES (
  ${Number(shopItem.id)},
  ${Number(shopItem.shop_list_id)},
  '${String(shopItem.name)}',
  ${Number(shopItem.count)},
  '${String(shopItem.measure)}',
  ${Number(shopItem.isBought)}) ON CONFLICT(id) DO UPDATE SET
  shop_list_id = ${Number(shopItem.shop_list_id)},
  name = '${String(shopItem.name)}',
  count = ${Number(shopItem.count)},
  measure = '${String(shopItem.measure)}',
  is_bought = ${Number(shopItem.isBought)}`;

  await db.exec(query);
}
