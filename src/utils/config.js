import dotenv from 'dotenv';

dotenv.config();

const { DB_URL } = process.env;

export const config = () => ({
  DB_URL
});