import { MongoClient } from "mongodb";

let db; // singleton

export const connectDB = async () => {
  if (db) return db;

  const uri = process.env.MONGODB_URI;

  if (!uri) {
    throw new Error("MONGODB_URI is not defined");
  }

  const client = new MongoClient(uri);
  await client.connect();

  db = client.db(); // ✅ THIS IS THE KEY
  console.log("✅ MongoDB connected (native driver)");

  return db;
};
