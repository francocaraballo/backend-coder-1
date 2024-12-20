import mongoose from "mongoose";
import { config } from './config.js'

export const connectDB = async () => {
  try {
    const { DB_URL } = config()
    if (!DB_URL) {
        console.error('DB_URI no está definido. Verifica tu archivo .env');
        process.exit(1);
    }
    await mongoose.connect(DB_URL);
    console.log('MongoDB Connect');
  } catch (error) {
    console.error('Connection DB failed:', error.message);
    process.exit(1);
  }
};
