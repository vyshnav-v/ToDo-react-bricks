import bcrypt from "bcrypt"; // Import the bcrypt library for password hashing
import User from "../Models/UserModel.js"; // Import the User model
import generateToken from "../Middleware/generateTokens.js"; // Import a function to generate authentication tokens

// Function to handle user registration
export const Register = async (req, res) => {
  try {
    const { username, email, password } = req.body; // Destructure user data from the request body

    // Check if a user with the same email already exists
    const userExists = await User.findOne({ email: email });

    if (userExists) {
      res.status(400).json({ message: "User already exists" });
      return;
    }

    // Password validation rules using a regular expression
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;

    if (!password.match(passwordRegex)) {
      return res.status(400).json({
        message:
          "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one digit, and one special character.",
      });
    }

    // Generate a salt and hash the password
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);

    // Create a new User instance with the hashed password
    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    // Save the new user to the database
    const savedUser = await newUser.save();

    if (savedUser) {
      res
        .status(201)
        .json({ message: "User registered successfully", savedUser });
    } else {
      res.status(400).json({ message: "Error occurred while saving user" });
    }
  } catch (error) {
    res
      .status(error.status || 500)
      .json({ message: error.message || "Server error" });
  }
};

// Function to handle user login
export const login = async (req, res) => {
  try {
    const { email, password } = req.body; // Destructure user login data from the request body

    // Find a user with the provided email
    const user = await User.findOne({ email: email });

    if (user) {
      // Compare the provided password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);

      if (isMatch) {
        // If the password is correct, generate an authentication token
        res.status(200).json({
          token: generateToken(user._id),
          user,
        });
      } else {
        res.status(401).json({ message: "Invalid credentials" });
      }
    } else {
      res.status(401).json({ message: "User not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Server error" });
  }
};
