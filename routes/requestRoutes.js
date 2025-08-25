const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');

const {
  createQuoteRequest,
  createDistributorRequest,
  getQuoteRequests,
  getDistributorRequests,
  createLandingPageLead, // <-- 2. Exporta las nuevas funciones
  getLandingPageLeads
} = require('../controllers/requestController');

// Rutas públicas para que cualquiera envíe una solicitud
router.post('/quotes', createQuoteRequest);
router.post('/distributor-requests', createDistributorRequest);
router.post('/landing-leads', createLandingPageLead);

// Rutas protegidas para que solo los admins puedan leer las solicitudes
router.get('/quotes', protect, getQuoteRequests);
router.get('/distributor-requests', protect, getDistributorRequests);
router.get('/landing-leads', protect, getLandingPageLeads);

module.exports = router;