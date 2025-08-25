// backend/models/BlogPost.js
const mongoose = require('mongoose');

const blogPostSchema = new mongoose.Schema({
  title: { type: String, required: true },
  summary: { type: String, required: true },
  content: { type: String, required: true },
  image: { type: String }
}, {
  timestamps: true // Esto ya añade los campos 'createdAt' y 'updatedAt'
});

const BlogPost = mongoose.model('BlogPost', blogPostSchema);

module.exports = BlogPost;