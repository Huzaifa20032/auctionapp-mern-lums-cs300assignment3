import mongoose from "mongoose"
import dotenv from "dotenv"

dotenv.config();

export const connect = async () => {
    try {
        console.log("Connecting to database...");
        const data = await mongoose.connect(process.env.MONGO_URI); // connect to your database on mongodb here

        console.log("Database connected successfully");
    }
    catch (error) {}
}