import { ShoppingItem, ShoppingList } from "~/misc/types";
import { getTestShoppingLists } from "~/misc/test_shopping_lists";

export async function getShoppingLists(): Promise<ShoppingList[]> {
  const db = useDatabase();
  const lists = await db.sql`SELECT * FROM shop_lists`;

  let shopLists: ShoppingList[] = [];
  lists.rows?.forEach(async (list) => {
    let shopItems: ShoppingItem[] = [];
    const items =
      await db.sql`SELECT * FROM shop_list_items WHERE shop_list_id = ${list.id}`;
    items.rows?.forEach((item) =>
      shopItems.push({
        id: Number(item.id),
        name: String(item.name),
        count: Number(item.count),
        measure: String(item.measure),
        isBought: Boolean(item.is_bought),
      })
    );

    shopLists.push({
      id: Number(list.id),
      user_id: Number(list.user_id),
      isCompleted: Boolean(list.is_completed),
      items: shopItems,
    });
  });

  return shopLists;
}

export async function getShoppingListById(
  id: number
): Promise<ShoppingList | undefined> {
  const db = useDatabase();
  const list = await db.sql`SELECT * FROM shop_lists WHERE id = ${id}`;

  let shopList: ShoppingList | undefined = undefined;
  if (list.rows?.length == 1) {
    let shopItems: ShoppingItem[] = [];
    const items =
      await db.sql`SELECT * FROM shop_list_items WHERE shop_list_id = ${list.rows[0].id}`;
    items.rows?.forEach((item) =>
      shopItems.push({
        id: Number(item.id),
        name: String(item.name),
        count: Number(item.count),
        measure: String(item.measure),
        isBought: Boolean(item.is_bought),
      })
    );

    shopList = {
      id: Number(list.rows[0].id),
      user_id: Number(list.rows[0].user_id),
      isCompleted: Boolean(list.rows[0].is_completed),
      items: shopItems,
    };
  }

  return shopList;
}
