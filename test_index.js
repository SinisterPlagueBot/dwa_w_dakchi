const express = require("express");
const app = express();

// Set EJS as the templating engine
app.set("view engine", "ejs");

// setup

app.use(express.static("public"));
app.get("/", (req, res) => {
  res.render("index.ejs");
});
// publish app
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
