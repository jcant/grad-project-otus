import type { ShoppingList } from "./types";

export function getTestShoppingLists(): ShoppingList[] {
  return [
    {
      id: 1,
      user_id: 1,
      items: [
        { id: 1, name: "Хлеб", count: 1, measure: "шт.", isBought: false },
        { id: 2, name: "молоко", count: 1, measure: "л.", isBought: false },
        { id: 3, name: "кофе", count: 1, measure: "шт.", isBought: false },
      ],
      isCompleted: false,
    },
    {
      id: 2,
      user_id: 2,
      items: [
        { id: 4, name: "масло", count: 1, measure: "пачка", isBought: false },
        { id: 5, name: "гречка", count: 1, measure: "кг.", isBought: false },
        { id: 6, name: "печенье", count: 2, measure: "пачки", isBought: false },
      ],
      isCompleted: false,
    },
    {
      id: 3,
      user_id: 3,
      items: [
        {
          id: 7,
          name: "горчица",
          count: 1,
          measure: "баночка",
          isBought: false,
        },
        {
          id: 8,
          name: "майонез",
          count: 2,
          measure: "пакета",
          isBought: false,
        },
        { id: 9, name: "кетчуп", count: 3, measure: "пакета", isBought: false },
      ],
      isCompleted: false,
    },
    {
      id: 4,
      user_id: 4,
      items: [
        { id: 10, name: "мёд", count: 3, measure: "л.", isBought: false },
        {
          id: 11,
          name: "вермишель",
          count: 1,
          measure: "кг.",
          isBought: false,
        },
        {
          id: 12,
          name: "свинина",
          count: 1.5,
          measure: "кг.",
          isBought: false,
        },
      ],
      isCompleted: false,
    },
    {
      id: 5,
      user_id: 5,
      items: [
        { id: 13, name: "помидоры", count: 2, measure: "кг.", isBought: false },
        { id: 14, name: "морковь", count: 1, measure: "кг.", isBought: false },
        {
          id: 15,
          name: "картофель",
          count: 5,
          measure: "кг.",
          isBought: false,
        },
        { id: 16, name: "чеснок", count: 3, measure: "шт.", isBought: false },
      ],
      isCompleted: false,
    },
  ];
}
