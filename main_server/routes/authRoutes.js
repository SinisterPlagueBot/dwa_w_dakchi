const express = require("express");
const router = express.Router();
const ClientController = require("../controllers/ClientController");
const { ClientModel } = require("../models/Client");
router.get("/signup", (req, res) => {
  res.render("front_end/signup.ejs");
});

router.post("/signup", (req, res) => {
  ClientController.getUsers(req, res);
});

router.get("/signin", (req, res) => {
  res.render("signin/signin.ejs");
});
router.post("/signin", async (req, res) => {
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
});
module.exports = router;
