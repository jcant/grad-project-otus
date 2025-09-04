import { dateToStringYYYYMMDD } from "~/misc/date_utils";
import { ShoppingList } from "~/misc/types";

export async function saveShoppingList(shopList: ShoppingList): Promise<void> {
  const db = useDatabase();

  //USE SQLite UPSERT functionality...
  //("id" INTEGER PRIMARY KEY, "user_id" INT, "name" TEXT, "created_at" TEXT, "is_completed" INT, "completed_at" TEXT)
  const query = `INSERT INTO shop_lists(id, user_id, name, created_at, is_completed, completed_at) VALUES (
  ${Number(shopList.id)},
  ${Number(shopList.user_id)},
  '${String(shopList.name)}',
  ${String(dateToStringYYYYMMDD(new Date(shopList.createdAt)))},
  ${Number(shopList.isCompleted)},
  '${String(dateToStringYYYYMMDD(new Date(shopList.completedAt!)))}'
  ) ON CONFLICT(id) DO UPDATE SET
  user_id = ${Number(shopList.user_id)},
  name = '${String(shopList.name)}',
  created_at = '${String(dateToStringYYYYMMDD(new Date(shopList.createdAt)))}',
  is_completed = ${Number(shopList.isCompleted)},
  completed_at = '${String(
    dateToStringYYYYMMDD(new Date(shopList.completedAt!))
  )}'`;

  await db.exec(query);
}
