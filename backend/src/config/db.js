// import mongoose from 'mongoose';
// import dotenv from 'dotenv';

// dotenv.config();

// const connectDB = async () => {
//   try {
//     const conn = await mongoose.connect(process.env.MONGODB_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//     });
//     console.log(`MongoDB Connected: ${conn.connection.host}`);
//   } catch (error) {
//     console.error('Database connection error:', error);
//     process.exit(1);
//   }
// };

// export default connectDB;
// backend/src/db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config(); // Make sure this loads first

const connectDB = async () => {
  try {
    console.log("Connecting to:", process.env.MONGODB_URI); // debug log

    if (!process.env.MONGODB_URI) {
      throw new Error("❌ Missing MONGODB_URI in .env file");
    }

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error("❌ Database connection error:", error.message);
    process.exit(1);
  }
};

export default connectDB;
