const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique:true
  },
  password: {
    type: String,
    required: true
  }
});
const Client = mongoose.model('Client', ClientSchema);
module.exports = Client;