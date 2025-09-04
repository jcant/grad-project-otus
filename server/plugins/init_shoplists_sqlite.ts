import { getTestShoppingLists } from "~/misc/test_shopping_lists";
import type { ShoppingList } from "~/misc/types";
import { dateToStringYYYYMMDD } from "~/misc/date_utils";
import { config } from "~/misc/constants";

export default defineNitroPlugin(async (nitroApp) => {
  if (config.INIT_DB_ON_START) {
    console.log("Initializing SHOPLISTS SQLite tables...");
    initDB();
    console.log("Initializing SHOPLISTS SQLite tables done!");
  }
});

async function initDB(): Promise<void> {
  const db = useDatabase();
  await db.sql`DROP TABLE IF EXISTS shop_lists`;
  await db.sql`DROP TABLE IF EXISTS shop_list_items`;
  await db.sql`CREATE TABLE IF NOT EXISTS shop_lists ("id" INTEGER PRIMARY KEY, "user_id" INT, "name" TEXT, "created_at" TEXT, "is_completed" INT, "completed_at" TEXT)`;
  await db.sql`CREATE TABLE IF NOT EXISTS shop_list_items ("id" INTEGER PRIMARY KEY, "shop_list_id" INT, "name" TEXT, "count" INT, "measure" TEXT, "is_bought" INT)`;

  const testShopLists: ShoppingList[] = getTestShoppingLists();

  testShopLists.forEach(async (testShopList) => {
    await db.sql`INSERT INTO shop_lists(user_id, name, created_at, is_completed) VALUES (
    ${Number(testShopList.user_id)}, 
    ${String(testShopList.name)}, 
    ${String(dateToStringYYYYMMDD(testShopList.createdAt))}, 
    ${Number(testShopList.isCompleted)})`;

    testShopList.items.forEach(async (shopItem) => {
      await db.sql`INSERT INTO shop_list_items(shop_list_id, name, count, measure, is_bought) VALUES (
      ${Number(testShopList.id)}, 
      ${String(shopItem.name)}, 
      ${Number(shopItem.count)}, 
      ${String(shopItem.measure)}, 
      ${Number(shopItem.isBought)})`;
    });
  });
}
