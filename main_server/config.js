const mongoose = require("mongoose");
const express = require("express");
// routers :
const router = require("./routes/authRoutes.js");
const connectDb = (uri) => {
  mongoose
    .connect(uri)
    .then(() => {
      console.log(`mongoDb server connected`);
    })
    .catch((e) => {
      console.log("unable to connect to mongodb", e);
    });
};
const setupApp = (app) => {
  app.use(express.urlencoded({ extended: false }));
};
const setupRoutes = (app) => {
  app.get("/", (req, res) => {
    res.render("index", { name: "mehdi" });
  });
  app.use("/auth", router);
};
module.exports = {
  connectDb,
  setupApp,
  setupRoutes,
};
