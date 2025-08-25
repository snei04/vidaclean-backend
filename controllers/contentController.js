// backend/controllers/contentController.js
const OfferContent = require('../models/OfferContent');

// Obtener el contenido de la oferta (público)
const getOfferContent = async (req, res) => {
  let content = await OfferContent.findOne();
  if (!content) {
    content = await OfferContent.create({}); // Crea uno por defecto si no existe
  }
  res.json(content);
};

// Actualizar el contenido de la oferta (protegido)
const updateOfferContent = async (req, res) => {
  const { title, description, bannerText } = req.body; // <-- AÑADE bannerText aquí
  let content = await OfferContent.findOne();
  if (content) {
    content.title = title;
    content.description = description;
    content.bannerText = bannerText; // <-- AÑADE esta línea para guardarlo
    await content.save();
    res.json(content);
  } else {
    // Si no existe, lo crea con todos los campos
    const newContent = await OfferContent.create({ title, description, bannerText });
    res.status(201).json(newContent);
  }
};
module.exports = { getOfferContent, updateOfferContent };