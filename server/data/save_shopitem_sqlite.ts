import { config } from "~/misc/constants";
import { ShoppingItem } from "~/misc/types";
import { createQueryFromObject } from "./get_query_object";

export async function saveShoppingItem(shopItem: ShoppingItem): Promise<void> {
  const db = useDatabase();

  if (config.DEBUG) {
    console.log("SERVER: ", shopItem);
  }

  // shop_list_items ("id" INTEGER PRIMARY KEY, "shop_list_id" INT, "name" TEXT, "count" INT, "measure" TEXT, "is_bought" INT)`;

  const query = createQueryFromObject(
    "shop_list_items",
    ["id", "shop_list_id", "name", "count", "measure", "is_bought"],
    [
      shopItem.id,
      shopItem.shop_list_id,
      shopItem.name,
      shopItem.count,
      shopItem.measure,
      Number(shopItem.isBought),
    ]
  );

  if (config.DEBUG) {
    console.log("SERVER: ", query);
  }

  await db.exec(query);
}
