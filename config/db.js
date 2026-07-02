const mongoose = require("mongoose");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null
  };
}

async function connectDB() {

  if (cached.conn) {
    console.log("Using existing MongoDB connection");
    return cached.conn;
  }

  if (!cached.promise) {

    console.log("Connecting to MongoDB...");

    cached.promise = mongoose.connect(process.env.MONGO_URI, {
      serverSelectionTimeoutMS: 15000
    });

  }

  cached.conn = await cached.promise;

  console.log("MongoDB Connected Successfully");

  return cached.conn;
}

module.exports = connectDB;