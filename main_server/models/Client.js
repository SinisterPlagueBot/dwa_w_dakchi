const mongoose = require('mongoose');

const ClientSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique:true
  },
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