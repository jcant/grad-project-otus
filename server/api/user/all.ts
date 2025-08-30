import type { User } from "~/misc/types";
import { getUsers } from "../../data/get_users";

const users: User[] = getUsers();

export default defineEventHandler(() => {
  return users;
});
