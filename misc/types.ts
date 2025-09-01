export type User = {
  id: number;
  login: string;
  name: string;
};

export type ShoppingItem = {
  id: number;
  name: string;
  count?: number;
  measure?: string;
  isBought: boolean;
};

export type ShoppingList = {
  id: number;
  user_id: number;
  items: ShoppingItem[];
  isCompleted: boolean;
};
