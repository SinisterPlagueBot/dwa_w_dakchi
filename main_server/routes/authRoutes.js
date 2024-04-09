const express = require("express");
const router = express.Router();
const ClientController = require("../controllers/ClientController");
const { ClientModel } = require("../models/Client");
router.get("/signup", (req, res) => {
  res.render("signup/signup.ejs");
});

router.post("/signup", ClientController.signup);

router.get("/signin", (req, res) => {
  res.render("signin/signin.ejs");
});
router.post("/signin", ClientController.registerUser);
module.exports = router;
