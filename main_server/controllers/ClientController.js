const { ClientModel } = require("../models/Client");
const signup = async (req, res) => {
  try {
    const { email, password } = req.body;

    const authorizedUser = await ClientModel.findOne({
      email: email,
      password: password,
    });

    if (authorizedUser) {
      // User authenticated successfully
      req.session.authenticated = true;
      req.session.user = {
        username: authorizedUser.username,
        email: email,
        password: password,
      };
      res.redirect("/medics");
    } else {
      // Unauthorized: Incorrect credentials
      res.status(401).json({ error: "Invalid credentials" });
    }
  } catch (err) {
    console.error("Error in getUsers:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

const registerUser = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await ClientModel.findOne({ username });
    if (existingUser) {
      return res.status(400).json({ error: "Username already taken" });
    }

    // Hash the password

    // Create new user
    const user = new ClientModel({
      username: username,
      password: password,
      email: email,
    });
    await user.save();

    // Send success response
    res.status(200).json({ message: "User registered successfully" });
  } catch (err) {
    console.error("Error in /signup:", err);
    res.status(500).json({ error: "Something went wrong" });
  }
};

module.exports = {
  registerUser,
  signup,
};
