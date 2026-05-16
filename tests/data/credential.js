import dotenv from 'dotenv';

dotenv.config();
export const credential = {
  username: process.env.USERNAME,
  password: process.env.PASSWORD
};