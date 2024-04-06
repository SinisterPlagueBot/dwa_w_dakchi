const express = require("express");
require("dotenv").config();

const app = express();
const { setupApp, setupRoutes, connectDb } = require("./config");
// Set EJS as the templating engine
app.set("view engine", "ejs");

// setup
connectDb(process.env.MONGODB_URI);
setupApp(app);
setupRoutes(app);
// publish app
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
