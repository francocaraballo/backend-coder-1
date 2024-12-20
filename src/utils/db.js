import mongoose from "mongoose";
import { config } from './config.js'

export const connectDB = async () => {
  try {
    await mongoose.connect(config().DB_URL);
    console.log('MongoDB Connect');
  } catch (error) {
    console.error('Connection DB failed:', error.message);
    process.exit(1);
  }
};
