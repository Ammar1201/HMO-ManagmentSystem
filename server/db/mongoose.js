import mongoose from 'mongoose';
import dotenv from 'dotenv';
dotenv.config();

mongoose.set('strictQuery', false);

const DB_URL = process.env.DATABASE_URL;

mongoose.connect(DB_URL, (error, mongoDbInstance) => {
  if (error) {
    throw Error('MongoDB connection error: ' + error);
  }
  const { host, port, name } = mongoDbInstance;
  console.log({ host, port, name });
});