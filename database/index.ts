import { getConnection } from "./connection";
import { createTables } from "./createTables";

export async function main() {
  const connection = getConnection();
  const DB = await createTables(connection);
  return DB;
}

export type DB = Awaited<ReturnType<typeof main>>;
