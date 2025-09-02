import { getTestShoppingLists } from "~/misc/test_shopping_lists";
import type { ShoppingList } from "~/misc/types";
import { dateToStringYYYYMMDD } from "~/misc/date_utils";

export default defineNitroPlugin(async (nitroApp) => {
  console.log("Initializing SHOPLISTS SQLite tables...");

  const db = useDatabase();

  await db.sql`DROP TABLE IF EXISTS shop_lists`;
  await db.sql`DROP TABLE IF EXISTS shop_list_items`;
  await db.sql`CREATE TABLE IF NOT EXISTS shop_lists ("id" INT, "user_id" INT, "created_at" TEXT, "is_completed" INT, "completed_at" TEXT)`;
  await db.sql`CREATE TABLE IF NOT EXISTS shop_list_items ("id" INT, "shop_list_id" INT, "name" TEXT, "count" INT, "measure" TEXT, "is_bought" INT)`;

  const testShopLists: ShoppingList[] = getTestShoppingLists();

  testShopLists.forEach(async (testShopList) => {
    await db.sql`INSERT INTO shop_lists VALUES (${testShopList.id}, ${
      testShopList.user_id
    }, ${String(dateToStringYYYYMMDD(testShopList.createdAt))},  ${String(
      testShopList.isCompleted
    )}, null)`;
    testShopList.items.forEach(async (shopItem) => {
      await db.sql`INSERT INTO shop_list_items VALUES (${shopItem.id}, ${
        testShopList.id
      }, ${shopItem.name}, ${shopItem.count}, ${shopItem.measure}, ${String(
        shopItem.isBought
      )})`;
    });
  });

  console.log("Initializing SHOPLISTS SQLite tables done!");
});
