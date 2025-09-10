import { saveUser } from "~/server/data/save_user_sqlite";

export default defineEventHandler(async (event) => {
  const body = await readBody(event);
  return await saveUser(body);
});
