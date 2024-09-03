import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config()

const connectDb = async () => {
    try {
        mongoose.set("strictQuery", false)
        const conn = await mongoose.connect(process.env.MONGODB_URI || "");
        console.log(`DataBase connect ${conn.connect}`);

    } catch (error) {
        console.error((error as Error).message);
        process.exit(1);    
    }
}

export default connectDb;