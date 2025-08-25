// backend/routes/productRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer'); // Importa multer
const path = require('path');

// Importamos las funciones del controlador
const {
    getAllProducts,
    getProductBySku,
    createProduct, // Importa las nuevas funciones
    updateProduct,
    deleteProduct
} = require('../controllers/productController');

const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/');
  },
  filename(req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage });

// Definimos las rutas de la API
router.get('/products', getAllProducts);
router.get('/products/:sku', getProductBySku);

router.post('/products', protect, upload.single('image'), createProduct);
router.put('/products/:id', protect, upload.single('image'), updateProduct);
router.delete('/products/:id', protect, deleteProduct);



module.exports = router;