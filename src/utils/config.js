import dotenv from 'dotenv';

dotenv.config();

const { DB_URL, PORT } = process.env;

export const config = () => ({
  DB_URL,
  PORT,
});