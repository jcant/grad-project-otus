import { getTestUsers } from "~/misc/test_users";
import type { User } from "~/misc/types";

export default defineNitroPlugin(async (nitroApp) => {
  console.log("Initializing USERS SQLite table...");

  const db = useDatabase();

  await db.sql`DROP TABLE IF EXISTS users`;
  await db.sql`CREATE TABLE IF NOT EXISTS users ("id" INT, "login" TEXT, "name" TEXT)`;

  const testUsers: User[] = getTestUsers();

  testUsers.forEach(async (testUser) => {
    await db.sql`INSERT INTO users VALUES (${testUser.id}, ${testUser.login}, ${testUser.name})`;
  });

  console.log("Initialization USER SQLite table done!");
});
