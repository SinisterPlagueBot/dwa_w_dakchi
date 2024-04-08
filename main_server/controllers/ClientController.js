const clientServices = require("../services/clientServices");
const { ClientModel } = require("../models/Client");
const getUsers = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Fetch all clients (users) from the database
    const users = await ClientModel.find();

    // Check if any user matches the provided credentials
    const authorizedUser = users.find((user) => {
      return user.email === email && user.password === password;
    });

    if (authorizedUser) {
      // User authenticated successfully
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
  try {
    let authorized = true;
    let { username, email, password } = req.body;
    const users = await clientServices.getAllClients();
    for (i = 0; i < users.length; i++) {
      if (username === users[i].username || email === users[i].email) {
        authorized = false;
        break;
      }
    }
    if (authorized) {
      clientServices.addClient(username, email, password);
      res.status(200).render("index");
    } else {
      res.status(500).json("The userName or the email is already used");
    }
  } catch (err) {
    res.status(500).json("something went wrong");
  }
};

module.exports = {
  registerUser,
  getUsers,
};
