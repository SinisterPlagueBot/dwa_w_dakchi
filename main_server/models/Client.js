const mongoose = require("mongoose");

const ClientSchema = new mongoose.Schema({
  username: {
    type: String,
  },
  email: {
    type: String,
  },
  password: {
    type: String,
  },
});
const ClientModel = mongoose.model("Client", ClientSchema);
module.exports = { ClientModel };
