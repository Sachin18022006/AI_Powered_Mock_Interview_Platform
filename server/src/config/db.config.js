// ============================================
// db.config.js - MongoDB Connection
// ============================================
// Connects to MongoDB Atlas using Mongoose.
// Reference: mongoose.connect() - reference-mongodb.md
// ============================================

import mongoose from 'mongoose';

const connectDB = async () => {
  try {
    const mongoURI = process.env.MONGODB_URI;

    if (!mongoURI) {
      throw new Error('MONGODB_URI is not defined in your environment variables.');
    }

    const trimmedURI = mongoURI.trim();

    if (!trimmedURI.startsWith('mongodb://') && !trimmedURI.startsWith('mongodb+srv://')) {
      throw new Error(
        `Invalid MONGODB_URI format. The connection string must start with "mongodb://" or "mongodb+srv://". You provided: "${trimmedURI.slice(0, 20)}..."`
      );
    }

    const conn = await mongoose.connect(trimmedURI);

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    if (error.message.includes('EBADNAME')) {
      console.error(
        '👉 Tip: EBADNAME means the MongoDB hostname or cluster domain in MONGODB_URI is invalid. Check Render Dashboard -> Environment Variables to make sure the full connection string is set (e.g. mongodb+srv://username:password@cluster.mongodb.net/dbname).'
      );
    }
    process.exit(1);
  }
};

export default connectDB;
