// backend/routes/blogRoutes.js
const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/authMiddleware');
const multer = require('multer'); // <-- 1. IMPORTA multer
const path = require('path');

const {
  getAllPosts,
  getPostById,
  createPost,
  updatePost,
  deletePost
} = require('../controllers/blogController');

// --- 2. CONFIGURA multer PARA LAS IMÁGENES DEL BLOG ---
const storage = multer.diskStorage({
  destination(req, file, cb) {
    cb(null, 'uploads/'); // Las guardaremos en la misma carpeta que las de productos
  },
  filename(req, file, cb) {
    cb(null, `blog-${Date.now()}${path.extname(file.originalname)}`);
  }
});
const upload = multer({ storage });


// Rutas Públicas - Cualquiera puede leer las publicaciones
router.get('/', getAllPosts);
router.get('/:id', getPostById);

// --- 3. APLICA EL MIDDLEWARE 'upload' A LAS RUTAS PROTEGIDAS ---
// Espera un solo archivo con el nombre de campo 'image'
router.post('/', protect, upload.single('image'), createPost);
router.put('/:id', protect, upload.single('image'), updatePost);

router.delete('/:id', protect, deletePost);

module.exports = router;