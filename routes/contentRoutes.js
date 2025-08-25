// backend/routes/contentRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const { getOfferContent, updateOfferContent } = require('../controllers/contentController');

router.get('/offer', getOfferContent);
router.put('/offer', protect, updateOfferContent);

module.exports = router;