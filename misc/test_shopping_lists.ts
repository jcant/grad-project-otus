import type { ShoppingList } from "./types";

export function getTestShoppingLists(): ShoppingList[] {
  return [
    {
      id: 1,
      user_id: 1,
      items: [
        { name: "Хлеб", count: 1, measure: "шт.", isBought: false },
        { name: "молоко", count: 1, measure: "л.", isBought: false },
        { name: "кофе", count: 1, measure: "шт.", isBought: false },
      ],
    },
    {
      id: 2,
      user_id: 2,
      items: [
        { name: "масло", count: 1, measure: "пачка", isBought: false },
        { name: "гречка", count: 1, measure: "кг.", isBought: false },
        { name: "печенье", count: 2, measure: "пачки", isBought: false },
      ],
    },
    {
      id: 3,
      user_id: 3,
      items: [
        { name: "горчица", count: 1, measure: "баночка", isBought: false },
        { name: "майонез", count: 2, measure: "пакета", isBought: false },
        { name: "кетчуп", count: 3, measure: "пакета", isBought: false },
      ],
    },
    {
      id: 4,
      user_id: 4,
      items: [
        { name: "мёд", count: 3, measure: "л.", isBought: false },
        { name: "вермишель", count: 1, measure: "кг.", isBought: false },
        { name: "свинина", count: 1.5, measure: "кг.", isBought: false },
      ],
    },
    {
      id: 5,
      user_id: 5,
      items: [
        { name: "помидоры", count: 2, measure: "кг.", isBought: false },
        { name: "морковь", count: 1, measure: "кг.", isBought: false },
        { name: "картофель", count: 5, measure: "кг.", isBought: false },
        { name: "чеснок", count: 3, measure: "шт.", isBought: false },
      ],
    },
  ];
}
