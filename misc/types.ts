export type User = {
  id: number;
  login: string;
  name: string;
  //   email: string;
};

export type ShoppingItem = {
  name: string;
  count?: number;
  measure?: string;
  isBought: boolean;
};

export type ShoppingList = {
  id: number;
  user_id: number;
  items: ShoppingItem[];
};
