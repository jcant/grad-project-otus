import { getUserById } from "../../data/get_users";

export default defineEventHandler((event) => {
  const userId = getRouterParam(event, "id");
  const user = getUserById(Number(userId));

  if (typeof user == "undefined") {
    throw createError({
      statusCode: 400,
      statusMessage: "Not found User with such ID!",
    });
  } else {
    return user;
  }
});
