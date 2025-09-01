import { User } from "~/misc/types";
import { getTestUsers } from "~/misc/test_users";

export async function getUsers(): Promise<User[]> {
  const db = useDatabase();
  const { rows } = await db.sql`SELECT * FROM users`;

  let users: User[] = [];
  rows?.forEach((row) =>
    users.push({
      id: Number(row.id),
      name: String(row.name),
      login: String(row.login),
    })
  );

  return users;
}

export async function getUserById(id: number): Promise<User | undefined> {
  const db = useDatabase();
  const { rows } = await db.sql`SELECT * FROM users WHERE id = ${id}`;
  let user: User | undefined = undefined;
  if (rows?.length == 1) {
    user = {
      id: Number(rows[0].id),
      login: String(rows[0].login),
      name: String(rows[0].name),
    };
  }
  return user;
}
