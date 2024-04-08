const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");
const { MedicamentModel } = require("../models/medicModel"); // Assuming you have a Medic model

// GET route
router.get("/", async (req, res) => {
  try {
    // Fetch the medications from the database
    const defaultMedics = await MedicamentModel.find();

    const results = defaultMedics.map((medic) => {
      return {
        data: medic.info,
        imageUrl: medic.image_url,
      };
    });

    res.render("medics/medics.ejs", {
      results: results,
    });
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred"); // Send an error response to the client
  }
});

// POST route
router.post("/", async (req, res) => {
  const medicName = req.body.search; // Get the search query from the request body

  try {
    const medic = await MedicamentModel.findOne({ name: medicName }); // Assuming your Medic model has a name field

    if (!medic) {
      res.status(404).send("Medic not found");
      return;
    }

    const results = {
      imageUrl: medic.image_url,
      data: medic.info,
    };

    res.render("medics/medics.ejs", { results }); // Send the response data back to the client
  } catch (error) {
    console.error(error);
    res.status(500).send("An error occurred"); // Send an error response to the client
  }
});

module.exports = router;
