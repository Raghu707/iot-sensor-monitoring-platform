import { MongoClient } from "mongodb";

const MONGO_URL = "mongodb://127.0.0.1:27017";
const DB_NAME = "soil_monitor";

let client;
let db;

export async function connectDB() {
  if (db) return db;

  client = new MongoClient(MONGO_URL);
  await client.connect();

  db = client.db(DB_NAME);
  console.log("✅ MongoDB connected");

  return db;
}