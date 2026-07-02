const mongoose = require("mongoose");

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = {
    conn: null,
    promise: null
  };
}

async function connectDB() {
  const uri = process.env.MONGO_URI;

  if (!uri) {
    const err = new Error("MONGO_URI environment variable is not set");
    console.error(err);
    throw err;
  }

  const readyState = mongoose.connection.readyState;

  if (readyState === 1) {
    console.log("Using existing MongoDB connection (readyState: 1)");
    return mongoose.connection;
  }

  if (readyState === 2) {
    console.log("MongoDB is connecting (readyState: 2), waiting for connection...");
    if (cached.promise) {
      await cached.promise;
      return mongoose.connection;
    }
  }

  console.log(`Connecting to MongoDB... (readyState: ${readyState})`);

  cached.promise = mongoose.connect(uri, {
    serverSelectionTimeoutMS: 10000,
    bufferCommands: false // Fail fast rather than buffering queries
  });

  try {
    await cached.promise;
    console.log("MongoDB Connected Successfully");
  } catch (err) {
    cached.promise = null;
    console.error("MongoDB Connection Error:", err);
    throw err;
  }

  return mongoose.connection;
}

module.exports = connectDB;