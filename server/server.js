
// Import necessary libraries and modules
import express from "express";     // Import the Express framework
import cors from "cors";           // Import Cross-Origin Resource Sharing middleware
import dotenv from "dotenv";       // Import dotenv for environment variables
import UserRouter from "./Routes/UserRoutes.js";   // Import user route handlers
import connectDB from "./Config/db.js";            // Import database connection function
import NotesRouter from "./Routes/NotesRouters.js"; // Import notes route handlers

// Create an instance of the Express application
const app = express();

// Load environment variables from a .env file
dotenv.config();

// Configure Express to handle JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Enable CORS to allow cross-origin requests
app.use(cors());

// Connect to the database
connectDB();

// Define a route for the root URL ("/") that returns a JSON response
app.get("/", function (req, res) {
  res.json({
    name: "Hello Vaishnav",
  });
});

// Define routes for user-related endpoints
app.use("/api", UserRouter);

// Define routes for notes-related endpoints
app.use("/api/notes", NotesRouter);

// Set the port number for the server to listen on, using an environment variable if available
const PORT = process.env.PORT || 8000;

// Start the server and listen on the specified port
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));