import { User } from "~/misc/types";
import { getTestUsers } from "~/misc/test_users";

export function getUsers(): User[] {
  return getTestUsers();
}

export function getUserById(id: number): User | undefined {
  const allUsers = getTestUsers();
  const searchedUser = allUsers.find((user) => user.id == id);
  return searchedUser;
}
