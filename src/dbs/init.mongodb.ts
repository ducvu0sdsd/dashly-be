import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

class Database {
  private static instance: Database;

  private constructor() {
    this.connect();
  }

  private async connect(): Promise<void> {
    if (process.env.MONGODB) {
      try {
        await mongoose.connect(process.env.MONGODB, {
          maxPoolSize: 50
        });
        console.log('Connect to MongoDB successfully')
      } catch (error) {
        console.error("MongoDB connection error:", error);
      }
    } else {
      console.error("Missing MONGODB connection string in .env file");
    }
  }

  public static getInstance(): Database {
    if (!Database.instance) {
      Database.instance = new Database();
    }
    return Database.instance;
  }
}

// Khởi tạo singleton instance
const instanceMongodb = Database.getInstance();
export default instanceMongodb;
