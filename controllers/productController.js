// backend/controllers/productController.js
const Product = require('../models/Product');


// Controlador para obtener todos los productos desde la DB
const getAllProducts = async (req, res) => {
  const PAGE_SIZE = 8; // Productos a mostrar por página
  const page = parseInt(req.query.page || "1"); // La página actual, por defecto 1

  try {
    const filter = {};
    if (req.query.category) {
      filter.category = req.query.category;
    }

    const total = await Product.countDocuments(filter);
    const products = await Product.find(filter)
      .limit(PAGE_SIZE)
      .skip(PAGE_SIZE * (page - 1));
    
    res.json({
      products,
      totalPages: Math.ceil(total / PAGE_SIZE),
      currentPage: page,
    });
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los productos' });
  }
};

// Controlador para obtener un producto por SKU desde la DB
const getProductBySku = async (req, res) => {
  try {
    const product = await Product.findOne({ sku: req.params.sku });
    if (product) {
      res.json(product);
    } else {
      res.status(404).json({ message: 'Producto no encontrado' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener el producto' });
  }
};

const createProduct = async (req, res) => {
  const { sku, name, category, description, specifications } = req.body;
  const image = req.file ? req.file.path : '/images/sample.jpg'; // Obtiene la ruta del archivo

  const product = new Product({
    sku, name, category, description, specifications, image
  });
  try {
    const createdProduct = await product.save();
    res.status(201).json(createdProduct);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear el producto', error });
  }
};

const updateProduct = async (req, res) => {
  const { sku, name, category, description, specifications } = req.body;
  const product = await Product.findById(req.params.id);

  if(product) {
    product.sku = sku;
    product.name = name;
    // ... (actualiza los otros campos)
    if (req.file) {
      product.image = req.file.path;
    }
    const updatedProduct = await product.save();
    res.json(updatedProduct);
  } else {
    res.status(404).json({ message: 'Producto no encontrado' });
  }
};

const deleteProduct = async (req, res) => {
  try {
    await Product.findByIdAndDelete(req.params.id);
    res.json({ message: 'Producto eliminado' });
  } catch (error) {
    res.status(500).json({ message: 'Error al eliminar el producto', error });
  }
};

// Los otros controladores los actualizaremos después...
const handleQuoteRequest = (req, res) => {
  // ...lógica actual...
  console.log('✅ Solicitud de cotización recibida');
  res.status(200).json({ message: `Solicitud recibida.` });
};

const handleDistributorRequest = (req, res) => {
  // ...lógica actual...
  console.log('✅ Solicitud de Distribuidor recibida:');
  res.status(200).json({ message: `Solicitud recibida.` });
};

module.exports = {
  getAllProducts,
  getProductBySku,
  createProduct,
  updateProduct,
  deleteProduct,
  handleQuoteRequest,
  handleDistributorRequest
};