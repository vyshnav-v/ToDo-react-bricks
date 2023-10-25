// Import the 'mongoose' library for MongoDB interaction.
import dotenv from "dotenv";
import mongoose from "mongoose";

// Load configuration from environment variables (not included here) using 'dotenv'.
// const dotenv = require("dotenv");
dotenv.config();

// Define the MongoDB connection URI using the provided environment variable.
// If not available, default to a local MongoDB instance at "mongodb://localhost:27017".
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost:27017";

// Define an asynchronous function to establish a connection to the MongoDB database.
const connectDB = async () => {
  try {
    // Configure Mongoose to enable strict mode for queries.
    mongoose.set("strictQuery", true);

    // Establish a connection to the MongoDB database using the provided URI.
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true, // Parse connection string using new URL parser.
      useUnifiedTopology: true, // Use new server discovery and monitoring engine.
    });

    // Log a success message with the connected host information.
    console.log(`MongoDB Connected :  ${conn.connection.host}`);
  } catch (error) {
    // Handle errors by logging the error message and exiting the process.
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

// Export the 'connectDB' function to make it accessible to other modules.
export default connectDB;
