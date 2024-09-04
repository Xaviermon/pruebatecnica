import mongoose from "mongoose";
import dotenv from "dotenv";
import { dataInit } from "../controllers/dbInit.controller";

dotenv.config();

const connectDb = async () => {
  try {
    mongoose.set("strictQuery", false);

    const uri = process.env.MONGODB_URI;
    if (!uri) {
      throw new Error(
        "MONGODB_URI no está definido en las variables de entorno."
      );
    }

    const conn = await mongoose.connect(uri, {
      serverSelectionTimeoutMS: 1000,
    });
    await dataInit()
    console.log(`DataBase connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`Error al conectar a MongoDB: ${(error as Error).message}`);
    process.exit(1);
  }
};

export default connectDb;
