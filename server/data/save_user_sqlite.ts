import { config } from "~/misc/constants";
import { User } from "~/misc/types";
import { createQueryFromObject } from "./get_query_object";

export async function saveUser(user: User): Promise<Number> {
  const db = useDatabase();

  if (config.DEBUG) {
    console.log("SERVER: ", user);
  }

  //CREATE TABLE IF NOT EXISTS users ("id" INTEGER PRIMARY KEY, "login" TEXT, "name" TEXT)`

  const query = createQueryFromObject(
    "users",
    ["id", "login", "name"],
    [user.id, user.login, user.name]
  );

  await db.exec(query);

  if (config.DEBUG) {
    console.log("SERVER: ", query);
  }

  let res = await db.sql`SELECT last_insert_rowid() as lastId`;
  const lastId = Number(res.rows![0].lastId);

  if (config.DEBUG) {
    console.log("SERVER: ", lastId);
  }

  return lastId;
}
