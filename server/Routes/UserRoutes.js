// Import necessary libraries and functions
import express from "express"; // Import the Express framework
import { login, Register } from "../Controllers/UserController.js"; // Import user controller functions

// Create an instance of an Express router
const router = express.Router();

// Define a POST route for user registration
router.post("/register", Register);

// Define a POST route for user login
router.post("/login", login);

// Export the router for use in other parts of the application
export default router;
