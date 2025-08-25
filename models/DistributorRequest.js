const mongoose = require('mongoose');

const distributorRequestSchema = new mongoose.Schema({
  companyName: { type: String, required: true },
  nit: { type: String, required: true },
  city: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true }
}, {
  timestamps: true
});

const DistributorRequest = mongoose.model('DistributorRequest', distributorRequestSchema);
module.exports = DistributorRequest;