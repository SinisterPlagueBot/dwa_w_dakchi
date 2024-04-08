const express = require("express");
const router = express.Router();
const ClientController = require("../controllers/ClientController");

router.get("/signup", (req, res) => {
  res.render("front_end/signup.ejs");
});

router.post("/signup", ClientController.getUsers);

router.get("/signin", (req, res) => {});
module.exports = router;
