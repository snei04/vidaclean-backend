// backend/models/OfferContent.js
const mongoose = require('mongoose');
const offerContentSchema = new mongoose.Schema({
  title: { type: String, default: 'Título de la Oferta por Defecto' },
  description: { type: String, default: 'Descripción de la oferta por defecto.' },
  bannerText: { type: String, default: '¿Quieres ser distribuidor en Soacha? ¡Tenemos beneficios exclusivos para ti!' }
});
const OfferContent = mongoose.model('OfferContent', offerContentSchema);
module.exports = OfferContent;