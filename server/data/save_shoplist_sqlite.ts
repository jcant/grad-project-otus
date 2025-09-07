import constants from "~/misc/constants";
import { dateToStringYYYYMMDD } from "~/misc/date_utils";
import { ShoppingList } from "~/misc/types";

export async function saveShoppingList(
  shopList: ShoppingList
): Promise<Number> {
  const db = useDatabase();

  // console.log("SERVER: ", shopList);

  //USE SQLite UPSERT functionality...
  //("id" INTEGER PRIMARY KEY, "user_id" INT, "name" TEXT, "created_at" TEXT, "is_completed" INT, "completed_at" TEXT)
  const query_start = "INSERT INTO shop_lists(";
  let query_mid1 = `
  ${shopList.id ? "id, " : ""}
  ${shopList.user_id ? "user_id, " : ""}
  ${shopList.name ? "name, " : ""}
  ${shopList.createdAt ? "created_at, " : ""}
  ${shopList.isCompleted != undefined ? "is_completed, " : ""}
  ${shopList.completedAt ? "completed_at, " : ""}`;
  const query_mid2 = ") VALUES(";
  let query_mid3 = `
  ${shopList.id ? `${Number(shopList.id)}, ` : ""}
  ${shopList.user_id ? `${Number(shopList.user_id)}, ` : ""}
  ${shopList.name ? `'${String(shopList.name)}', ` : ""}
  ${
    shopList.createdAt
      ? `'${String(dateToStringYYYYMMDD(new Date(shopList.createdAt!)))}', `
      : ""
  }
  ${
    shopList.isCompleted != undefined ? `${Number(shopList.isCompleted)}, ` : ""
  }
  ${
    shopList.completedAt
      ? `'${String(dateToStringYYYYMMDD(new Date(shopList.completedAt!)))}', `
      : ""
  }`;
  const query_mid4 = ") ON CONFLICT(id) DO UPDATE SET ";
  let query_end = `
  ${shopList.user_id ? `user_id = ${Number(shopList.user_id)}, ` : ""}
  ${shopList.name ? `name = '${String(shopList.name)}', ` : ""}
  ${
    shopList.createdAt
      ? `created_at = '${String(
          dateToStringYYYYMMDD(new Date(shopList.createdAt!))
        )}', `
      : ""
  }
  ${
    shopList.isCompleted
      ? `is_completed = ${Number(shopList.isCompleted)}, `
      : ""
  }
  ${
    shopList.completedAt
      ? `completed_at = '${String(
          dateToStringYYYYMMDD(new Date(shopList.completedAt!))
        )}', `
      : ""
  }`;

  query_mid1 = query_mid1.substring(0, query_mid1.lastIndexOf(","));
  query_mid3 = query_mid3.substring(0, query_mid3.lastIndexOf(","));
  query_end = query_end.substring(0, query_end.lastIndexOf(","));

  const query =
    query_start + query_mid1 + query_mid2 + query_mid3 + query_mid4 + query_end;

  await db.exec(query);

  // if (constants.config.DEBUG) {
  //   console.log("SERVER: ", query);
  // }

  let res = await db.sql`SELECT last_insert_rowid() as lastId`;
  const lastId = Number(res.rows![0].lastId);

  // if (constants.config.DEBUG) {
  //   console.log("SERVER: ", lastId);
  // }

  return lastId;
}
