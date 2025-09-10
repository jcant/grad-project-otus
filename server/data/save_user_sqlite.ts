import { config } from "~/misc/constants";
import { User } from "~/misc/types";

export async function saveUser(user: User): Promise<Number> {
  const db = useDatabase();

  if (config.DEBUG) {
    console.log("SERVER: ", user);
  }

  //USE SQLite UPSERT functionality...
  //CREATE TABLE IF NOT EXISTS users ("id" INTEGER PRIMARY KEY, "login" TEXT, "name" TEXT)`
  const query_start = "INSERT INTO users(";
  let query_mid1 = `
  ${user.id ? "id, " : ""}
  ${user.login ? "login, " : ""}
  ${user.name ? "name, " : ""}`;
  const query_mid2 = ") VALUES(";
  let query_mid3 = `
  ${user.id ? `${Number(user.id)}, ` : ""}
  ${user.login ? `'${String(user.login)}', ` : ""}
  ${user.name ? `'${String(user.name)}', ` : ""}`;
  const query_mid4 = ") ON CONFLICT(id) DO UPDATE SET ";
  let query_end = `
  ${user.login ? `login = '${String(user.login)}', ` : ""}
  ${user.name ? `name = '${String(user.name)}', ` : ""}`;

  query_mid1 = query_mid1.substring(0, query_mid1.lastIndexOf(","));
  query_mid3 = query_mid3.substring(0, query_mid3.lastIndexOf(","));
  query_end = query_end.substring(0, query_end.lastIndexOf(","));

  const query =
    query_start + query_mid1 + query_mid2 + query_mid3 + query_mid4 + query_end;

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
