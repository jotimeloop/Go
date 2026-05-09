const mongoose = require("mongoose");
let cached = global._mongoose;
if (!cached) cached = global._mongoose = { conn: null, promise: null };
async function connectDB() {
  if (cached.conn) return cached.conn;
  if (!process.env.MONGODB_URI) throw new Error("MONGODB_URI missing");
  if (!cached.promise) cached.promise = mongoose.connect(process.env.MONGODB_URI, { dbName: "rentigo" });
  cached.conn = await cached.promise;
  return cached.conn;
}
module.exports = { connectDB };
