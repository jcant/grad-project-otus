import { config } from "~/misc/constants";
import { dateToStringYYYYMMDD } from "~/misc/date_utils";
import { ShoppingList } from "~/misc/types";
import { createQueryFromObject } from "./get_query_object";

export async function saveShoppingList(
  shopList: ShoppingList
): Promise<Number> {
  const db = useDatabase();

  if (config.DEBUG) {
    console.log("SERVER: ", shopList);
  }

  //shop_lists ("id" INTEGER PRIMARY KEY, "user_id" INT, "name" TEXT, "created_at" TEXT, "is_completed" INT, "completed_at" TEXT)

  const query = createQueryFromObject(
    "shop_lists",
    ["id", "user_id", "name", "created_at", "is_completed", "completed_at"],
    [
      shopList.id,
      shopList.user_id,
      shopList.name,
      dateToStringYYYYMMDD(
        shopList.createdAt ? new Date(shopList.createdAt) : undefined
      ),
      Number(shopList.isCompleted),
      dateToStringYYYYMMDD(
        shopList.completedAt ? new Date(shopList.completedAt) : undefined
      ),
    ]
  );

  if (config.DEBUG) {
    console.log("SERVER: ", query);
  }

  await db.exec(query);

  let res = await db.sql`SELECT last_insert_rowid() as lastId`;
  const lastId = Number(res.rows![0].lastId);

  if (config.DEBUG) {
    console.log("SERVER: ", lastId);
  }

  return lastId;
}
