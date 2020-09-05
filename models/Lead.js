const mongoose = require('mongoose');
// Create Schema
const LeadSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  phone: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now
  }
});
const Lead = mongoose.model("leads", LeadSchema);
module.exports = Lead;