import sqlite3 from "sqlite3";
import { open } from "sqlite";

export async function openDb() {
  return open({
    filename: "./data/database.sqlite",
    driver: sqlite3.Database,
  });
}

async function initializeDatabase() {
  const db = await openDb();
  await db.exec(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      email TEXT UNIQUE NOT NULL,
      password TEXT NOT NULL,
      role TEXT NOT NULL
    )
  `);
}
initializeDatabase();