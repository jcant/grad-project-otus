export const serverApi = {
  GET_ALL_USERS: "/api/user/all",
  GET_USER: "/api/user/",
  GET_ALL_SHOPPING_LISTS: "/api/shopping_list/all",
  GET_SHOPPING_LIST: "/api/shopping_list/",
  POST_SHOPPING_ITEM: "/api/shopping_list/shop_item_post",
  POST_SHOPPING_LIST: "/api/shopping_list/shop_list_post",
};

export const pages = {
  HOME: "/",
  SHOPPING_LISTS: "/shopping_lists",
  NEW_SHOPPING_LIST: "/new_shopping_list",
  USERS: "/users",
};

export const config = {
  INIT_DB_ON_START: true,
  DEBUG: false,
};

export default { serverApi, pages, config };
