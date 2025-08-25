// backend/controllers/blogController.js
const BlogPost = require('../models/BlogPost');

const getAllPosts = async (req, res) => {
  try {
    const posts = await BlogPost.find({}).sort({ createdAt: -1 });
    res.json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener las publicaciones' });
  }
};

const getPostById = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id);
    if (post) {
      res.json(post);
    } else {
      res.status(404).json({ message: 'Publicación no encontrada' });
    }
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener la publicación' });
  }
};

const createPost = async (req, res) => {
  const { title, summary, content } = req.body;

  // Verifica que se haya subido un archivo
  if (!req.file) {
    return res.status(400).json({ message: 'No se subió ninguna imagen.' });
  }
  const image = req.file.path; // Obtiene la ruta del archivo subido

  try {
    const post = new BlogPost({ title, summary, content, image });
    const createdPost = await post.save();
    res.status(201).json(createdPost);
  } catch (error) {
    res.status(400).json({ message: 'Error al crear la publicación', error });
  }
};

const updatePost = async (req, res) => {
  const { title, summary, content } = req.body;
  
  try {
    const post = await BlogPost.findById(req.params.id);
    if (!post) {
      return res.status(404).json({ message: 'Publicación no encontrada' });
    }

    post.title = title || post.title;
    post.summary = summary || post.summary;
    post.content = content || post.content;
    
    // Si se sube un nuevo archivo, actualiza la ruta de la imagen
    if (req.file) {
      post.image = req.file.path;
    }

    const updatedPost = await post.save();
    res.json(updatedPost);
  } catch (error) {
    res.status(400).json({ message: 'Error al actualizar la publicación', error });
  }
};

const deletePost = async (req, res) => {
    try {
        const post = await BlogPost.findByIdAndDelete(req.params.id);
        if (!post) {
            return res.status(404).json({ message: 'Publicación no encontrada' });
        }
        res.json({ message: 'Publicación eliminada' });
    } catch (error) {
        res.status(500).json({ message: 'Error al eliminar la publicación' });
    }
};

module.exports = { getAllPosts, getPostById, createPost, updatePost, deletePost };