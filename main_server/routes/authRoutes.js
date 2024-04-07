const express = require("express");
const router = express.Router();

router.get("/signup", (req, res) => {
  res.render("signup/signup.ejs");
});
router.post("/signup", (req, res) => {
  //   const { username, email, password } = req.body;
  console.log(req.body);
  res.render("index", { name: req.body.username });
});

router.get("/signin", (req, res) => {});
module.exports = router;
