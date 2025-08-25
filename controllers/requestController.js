// backend/controllers/requestController.js
const QuoteRequest = require('../models/QuoteRequest');
const DistributorRequest = require('../models/DistributorRequest');
const LandingPageLead = require('../models/LandingPageLead');

// Guardar una nueva solicitud de cotización
const createQuoteRequest = async (req, res) => {
  try {
    const newQuote = new QuoteRequest(req.body);
    await newQuote.save();
    res.status(201).json({ message: 'Solicitud de cotización guardada' });
  } catch (error) {
    res.status(400).json({ message: 'Error al guardar la solicitud de cotización', error });
  }
};

// Guardar una nueva solicitud de distribuidor
const createDistributorRequest = async (req, res) => {
  try {
    const newDistributorRequest = new DistributorRequest(req.body);
    await newDistributorRequest.save();
    res.status(201).json({ message: 'Solicitud de distribuidor guardada' });
  } catch (error) {
    res.status(400).json({ message: 'Error al guardar la solicitud de distribuidor', error });
  }
};

// --- Funciones para que el Admin lea las solicitudes ---

// Obtener todas las solicitudes de cotización
const getQuoteRequests = async (req, res) => {
  try {
    const requests = await QuoteRequest.find({}).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las solicitudes' });
  }
};

// Obtener todas las solicitudes de distribuidor
const getDistributorRequests = async (req, res) => {
  try {
    const requests = await DistributorRequest.find({}).sort({ createdAt: -1 });
    res.json(requests);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las solicitudes' });
  }
};

const createLandingPageLead = async (req, res) => {
  try {
    const newLead = new LandingPageLead(req.body);
    await newLead.save();
    res.status(201).json({ message: 'Prospecto guardado con éxito' });
  } catch (error) {
    res.status(400).json({ message: 'Error al guardar el prospecto', error });
  }
};

// Obtener todos los prospectos (para el admin)
const getLandingPageLeads = async (req, res) => {
  try {
    const leads = await LandingPageLead.find({}).sort({ createdAt: -1 });
    res.json(leads);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los prospectos' });
  }
};

module.exports = {
  createQuoteRequest,
  createDistributorRequest,
  getQuoteRequests,
  getDistributorRequests,
  createLandingPageLead,
  getLandingPageLeads
};