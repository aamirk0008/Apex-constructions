import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

let cached = global._mongoose;
if (!cached) cached = global._mongoose = { conn: null, promise: null };

// Add error handling for connection issues inside connectDB
export async function connectDB() {
  console.log("Attempting to connect to:", MONGODB_URI?.split('@')[1]); // Logs only the host for safety
  if (!MONGODB_URI) throw new Error('MONGODB_URI not set in .env.local');
  if (!MONGODB_URI) throw new Error('MONGODB_URI not set in .env.local');
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    try {
      cached.promise = mongoose.connect(MONGODB_URI, { bufferCommands: false });
    } catch (error) {
      console.error('MongoDB connection error:', error);
      delete cached.promise;
      throw new Error('Database connection failed. Please check your MONGODB_URI and network.');
    }
  }
  try {
    cached.conn = await cached.promise;
  } catch (error) {
    console.error('MongoDB connection error:', error);
    cached.promise = null;
    cached.conn = null;
    throw new Error('Database connection failed. Please check your MONGODB_URI and network.');
  }
  return cached.conn;
}
