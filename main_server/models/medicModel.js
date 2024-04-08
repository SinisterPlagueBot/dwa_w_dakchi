const mongoose = require("mongoose");
// Define the MongoDB schema for storing medicament data
const MedicamentSchema = {
  name: { type: String, required: true },

  image_url: { type: String },
  info: { type: Object },
  // Add more fields as needed for other medicament data
};

// Create a MongoDB model using the defined schema
const MedicamentModel = mongoose.model("Medicament", MedicamentSchema);

// Export the model for use in your application
module.exports = { MedicamentModel };
