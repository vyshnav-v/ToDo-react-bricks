import jwt from "jsonwebtoken";


const verifyToken = async (req, res, next) => {
  let token;

  // Check if the Authorization header is present and starts with 'Bearer'
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith("Bearer")
  ) {
    try {
      // Extract the token from the Authorization header
      token = req.headers.authorization.split(" ")[1];

      // Verify the token using the secret key from environment variables
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      // Attach the decoded username to the request object
      req.user = decoded.id;

      // Check if the user is not null
      if (req.user != null) {
        next(); // Call the next middleware or route handler
      } else {
        throw new Error("Not Authorized");
      }

    } catch (error) {
      // Handle errors and send a response with the error message
      res.status(401).json({ message: error.message });
    }
  }

  // If no token is found in the Authorization header
  if (!token) {
    res.status(401);
    throw new Error("Not authorized, no token");
  }
};

export default verifyToken;
