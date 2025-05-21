// server/src/config/connection.ts
import dotenv from 'dotenv';
dotenv.config();

import mongoose from 'mongoose';

if (!process.env.MONGODB_URI) {
  throw new Error('❌ MONGODB_URI not set in environment variables.');
}

mongoose.connect(process.env.MONGODB_URI);

export default mongoose.connection;
