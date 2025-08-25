// backend/models/Product.js
const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
  sku: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  category: { type: String, required: true },
  description: { type: String },
  specifications: { type: String },
  image: { type: String }
});

const Product = mongoose.model('Product', productSchema);

module.exports = Product;