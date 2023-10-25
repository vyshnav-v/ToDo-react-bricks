import Note from "../Models/NoteModel.js"; // Import the Note model

// Function to view all notes for an authorized user
export const ViewAllNotes = async (req, res) => {
  try {
    // Check if the user is authenticated
    if (!req.user) {
      res.status(401);
      throw new Error("You must be logged in to view notes");
    }
console.log(req.user);
    // Retrieve all notes for the authenticated user from the database
    const notes = await Note.find({ user: req.user });

    res.json(notes); // Send the retrieved notes as a JSON response
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Server error" });
  }
};

// Function to create a new note
export const CreateNote = async (req, res) => {
  try {
    const { title, content, userId } = req.body;

    if (!title || !content || !userId) {
      res.status(400);
      throw new Error("Please fill in all the fields");
      return;
    } else {
      // Create a new Note instance
      const note = new Note({
        user: userId, // Associate the note with the user using req.user._id
        title,
        content,
      });

      // Save the new note to the database
      const createdNote = await note.save();

      res.status(201).json(createdNote); // Send the created note as a JSON response
    }
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Server error" });
  }
};

// Function to edit an existing note
export const EditNote = async (req, res) => {
  try {
    const { title, content } = req.body;

    // Find the note by its ID
    const note = await Note.findById(req.params.id);

    // Check if the note belongs to the user
    if (note.user.toString() !== req.user.toString()) {
      res.status(401);
      throw new Error("You can't perform this action");
    }

    if (note) {
      note.title = title;
      note.content = content;

      // Save the updated note to the database
      const updatedNote = await note.save();
      res.json(updatedNote); // Send the updated note as a JSON response
    } else {
      res.status(404);
      throw new Error("Note not found");
    }
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Server error" });
  }
};

// Function to delete an existing note
export const DeleteNote = async (req, res) => {
  try {
    // Find the note by its ID
    const note = await Note.findById(req.params.id);

    // Check if the note belongs to the user
    if (note.user.toString() !== req.user.toString()) {
      res.status(401);
      throw new Error("You can't perform this action");
    }
  

    if (note) {
      // Remove the note from the database
      await note.deleteOne();
      res.json({ message: "Note Removed" });
    } else {
      res.status(404);
      throw new Error("Note not Found");
    }
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Server error" });
  }
};

// Function to get details of a single note by its ID
export const GetSingleNote = async (req, res) => {
  try {
    // Find the note by its ID
    const note = await Note.findById(req.params.id);

    // Check if the note exists
    if (!note) {
      res.status(404);
      throw new Error("Note not found");
    }

    // Check if the note belongs to the user (if applicable)
    if (note.user.toString() !== req.user.toString()) {
      res.status(401);
      throw new Error("You don't have permission to access this note");
    }

    res.json(note); // Send the retrieved note as a JSON response
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Server error" });
  }
};

export const searchNotes = async (req, res) => {
  try {
    // Check if the user is authenticated
    if (!req.user) {
      res.status(401);
      throw new Error("You must be logged in to search notes");
    }

    const searchQuery = req.query.q;

    // Use a MongoDB query to perform the search
    const searchResults = await Note.find({
      user: req.user,
      $text: { $search: searchQuery },
    });

    res.json(searchResults); // Send the search results as a JSON response
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Server error" });
  }
};