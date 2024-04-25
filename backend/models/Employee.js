const mongoose = require('mongoose');

// Employee Schema
const employeeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  department: { type: String, required: true },
  email: { type: String, required: true }
});

module.exports = mongoose.model('Employee', employeeSchema);

