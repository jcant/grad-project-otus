import { ShoppingItem, ShoppingList } from "~/misc/types";

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
        shop_list_id: Number(item.shop_list_id),
        name: String(item.name),
        count: Number(item.count),
        measure: String(item.measure),
        isBought: Boolean(item.is_bought),
      })
    );

    shopLists.push({
      id: Number(list.id),
      user_id: Number(list.user_id),
      name: String(list.name),
      createdAt: new Date(String(list.created_at)),
      isCompleted: Boolean(list.is_completed),
      completedAt: new Date(String(list.completed_at)),
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
        shop_list_id: Number(item.shop_list_id),
        name: String(item.name),
        count: Number(item.count),
        measure: String(item.measure),
        isBought: Boolean(item.is_bought),
      })
    );

    shopList = {
      id: Number(list.rows[0].id),
      user_id: Number(list.rows[0].user_id),
      name: String(list.rows[0].name),
      isCompleted: Boolean(list.rows[0].is_completed),
      createdAt: new Date(String(list.rows[0].created_at)),
      items: shopItems,
    };
  }

  return shopList;
}

export async function getShoppingListByUserId(
  userId: number,
  isCompleted: boolean
): Promise<ShoppingList[] | undefined> {
  const db = useDatabase();

  const lists =
    await db.sql`SELECT * FROM shop_lists WHERE user_id = ${userId} and is_completed = ${Number(
      isCompleted
    )}`;

  let shopLists: ShoppingList[] = [];

  lists.rows?.forEach(async (list) => {
    let shopItems: ShoppingItem[] = [];
    const items =
      await db.sql`SELECT * FROM shop_list_items WHERE shop_list_id = ${list.id}`;
    items.rows?.forEach((item) =>
      shopItems.push({
        id: Number(item.id),
        shop_list_id: Number(item.shop_list_id),
        name: String(item.name),
        count: Number(item.count),
        measure: String(item.measure),
        isBought: Boolean(item.is_bought),
      })
    );

    shopLists.push({
      id: Number(list.id),
      user_id: Number(list.user_id),
      name: String(list.name),
      createdAt: new Date(String(list.created_at)),
      isCompleted: Boolean(list.is_completed),
      items: shopItems,
    });
  });

  return shopLists;
}
