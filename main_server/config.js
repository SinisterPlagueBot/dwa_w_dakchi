const mongoose = require("mongoose");
const express = require("express");
const path = require("path");
// routers :
const AuthRouter = require("./routes/authRoutes.js");
const MySpaceRouter = require("./routes/mySpaceRoutes.js");
const MedicsRouter = require("./routes/medicsRoutes.js");
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
  // app.use(express.static(path.join(__dirname, "views")));
  app.use(express.static("views"));
  app.use(express.urlencoded({ extended: false }));
};
const setupRoutes = (app) => {
  app.get("/", (req, res) => {
    res.render("index", { name: "mehdi" });
  });
  app.use("/auth", AuthRouter);
  app.use("/medics", MedicsRouter);
  app.use("/mySpace", MySpaceRouter);
  app.get("*", (req, res) => {
    res.render("notFoundPage/notFound.ejs");
  });
};
module.exports = {
  connectDb,
  setupApp,
  setupRoutes,
};
