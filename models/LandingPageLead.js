// backend/models/LandingPageLead.js
const mongoose = require('mongoose');

const landingPageLeadSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email: { type: String, required: true },
  companyName: { type: String, required: true }
}, {
  timestamps: true // Para saber cuándo se registraron
});

const LandingPageLead = mongoose.model('LandingPageLead', landingPageLeadSchema);
module.exports = LandingPageLead;