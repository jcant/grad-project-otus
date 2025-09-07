import constants from "~/misc/constants";
import { ShoppingItem } from "~/misc/types";

export async function saveShoppingItem(shopItem: ShoppingItem): Promise<void> {
  const db = useDatabase();

  // console.log("SERVER: ", shopItem);

  //USE SQLite UPSERT functionality...

  const query_start = "INSERT INTO shop_list_items(";
  let query_mid1 = `
  ${shopItem.id ? "id, " : ""}
  ${shopItem.shop_list_id ? "shop_list_id, " : ""}
  ${shopItem.name ? "name, " : ""}
  ${shopItem.count ? "count, " : ""}
  ${shopItem.measure ? "measure, " : ""}
  ${shopItem.isBought != undefined ? "is_bought, " : ""}`;
  const query_mid2 = ") VALUES(";
  let query_mid3 = `
  ${shopItem.id ? `${Number(shopItem.id)}, ` : ""}
  ${shopItem.shop_list_id ? `${Number(shopItem.shop_list_id)}, ` : ""}
  ${shopItem.name ? `'${String(shopItem.name)}', ` : ""}
  ${shopItem.count ? `${Number(shopItem.count)}, ` : ""}
  ${shopItem.measure ? `'${String(shopItem.measure)}', ` : ""}
  ${shopItem.isBought != undefined ? `${Number(shopItem.isBought)}, ` : ""}`;
  const query_mid4 = ") ON CONFLICT(id) DO UPDATE SET ";
  let query_end = `
  ${
    shopItem.shop_list_id
      ? `shop_list_id = ${Number(shopItem.shop_list_id)}, `
      : ""
  }
  ${shopItem.name ? `name = '${String(shopItem.name)}', ` : ""}
  ${shopItem.count ? `count = ${Number(shopItem.count)}, ` : ""}
  ${shopItem.measure ? `measure = '${String(shopItem.measure)}', ` : ""}
  ${
    shopItem.isBought != undefined
      ? `is_bought = ${Number(shopItem.isBought)}, `
      : ""
  }`;

  query_mid1 = query_mid1.substring(0, query_mid1.lastIndexOf(","));
  query_mid3 = query_mid3.substring(0, query_mid3.lastIndexOf(","));
  query_end = query_end.substring(0, query_end.lastIndexOf(","));

  const query =
    query_start + query_mid1 + query_mid2 + query_mid3 + query_mid4 + query_end;

  // if (constants.config.DEBUG) {
  //   console.log("SERVER: ", query);
  // }

  await db.exec(query);
}
