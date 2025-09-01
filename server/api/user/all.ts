import type { User } from "~/misc/types";
import { getUsers } from "../../data/get_users_sqlite";

export default defineEventHandler(async () => {
  const users: User[] = await getUsers();
  return users;
});
