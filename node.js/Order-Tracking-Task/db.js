// // db.js
require('dotenv').config();
const { MongoClient } = require("mongodb");

const uri = process.env.MONGO_URL;
const client = new MongoClient(uri);

let db;

async function connectDB() {
  if (db) return db; // Return existing connection if already connected
  await client.connect();
  db = client.db("OrderTrackingDB"); // Create/use a DB named 'OrderTrackingDB'
  console.log("✅ Connected to MongoDB Atlas");
  return db;
}

async function getDB() {
  if (!db) await connectDB();
  return db;
}

module.exports = { getDB, connectDB};
