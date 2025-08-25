// backend/models/QuoteRequest.js
const mongoose = require('mongoose');

const quoteRequestSchema = new mongoose.Schema({
  sku: { type: String, required: true },
  user: {
    name: { type: String, required: true },
    email: { type: String, required: true },
    company: { type: String }
  }
}, {
  timestamps: true // Añade automáticamente las fechas de creación y actualización
});

const QuoteRequest = mongoose.model('QuoteRequest', quoteRequestSchema);
module.exports = QuoteRequest;