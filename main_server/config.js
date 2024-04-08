const mongoose = require("mongoose");
const express = require("express");
const router = require("./routes/authRoutes.js");

// routers :
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
  app.use(express.static("public"));
};
const setupRoutes = (app,db) => {
  app.get("/", (req, res) => {
    res.render("index", { name: "mehdi" });
  });
  app.get("/auth",(req,res) => {
    res.render("home");
  })
  app.use("/auth", router);
};
module.exports = {
  setupApp,
  setupRoutes,
  connectDb
};
