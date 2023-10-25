// Import necessary libraries and modules
import express from "express"; // Import the Express framework
import verifyToken from "../Middleware/authenticate.js"; // Import authentication middleware
import {
  CreateNote,
  DeleteNote,
  EditNote,
  GetSingleNote,
  ViewAllNotes,
  searchNotes,
} from "../Controllers/NotesController.js"; // Import Notes controller functions

// Create an instance of an Express router
const router = express.Router();

// Define a POST route for creating a new note
router.post("/create", verifyToken, CreateNote);

// Define a GET route for viewing all notes
router.get("/view", verifyToken, ViewAllNotes);

// Define a GET route for viewing a note by its ID
router.get("/:id", verifyToken, GetSingleNote);

// Define a PUT route for editing a note by its ID
router.put("/:id", verifyToken, EditNote);

// Define a DELETE route for deleting a note by its ID
router.delete("/:id", verifyToken, DeleteNote);

// Create a route for searching notes
router.get("/search",verifyToken, searchNotes);
// Export the router for use in other parts of the application
export default router;
