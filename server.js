// backend/server.js
const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');
const connectDB = require('./config/db');

// Importamos el modelo y los datos para poblar la DB
const Product = require('./models/Product');
const initialProducts = require('./data/initialProducts');

// Importamos todas las rutas
const productRoutes = require('./routes/productRoutes');
const authRoutes = require('./routes/authRoutes');
const requestRoutes = require('./routes/requestRoutes');
const blogRoutes = require('./routes/blogRoutes');
const contentRoutes = require('./routes/contentRoutes');

// Cargar variables de entorno
dotenv.config();

const app = express();


// --- MIDDLEWARES ---

// ▼▼▼ ESTE ES EL BLOQUE MODIFICADO ▼▼▼
// Configuración de CORS para producción
const corsOptions = {
  // Aquí pones la URL de tu frontend de Vercel
  origin: ['https://vidaclean-frontend.vercel.app', 'http://localhost:3000'],
  optionsSuccessStatus: 200
};
app.use(cors(corsOptions));
// ▲▲▲ FIN DEL BLOQUE MODIFICADO ▲▲▲

app.use(express.json());


// --- Conexión de Rutas ---
app.use('/api', productRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/requests', requestRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/content', contentRoutes);

// Servir archivos estáticos (imágenes)
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));


// --- Función para poblar la DB ---
const seedDatabase = async () => {
  try {
    const productCount = await Product.countDocuments();
    if (productCount === 0) {
      await Product.insertMany(initialProducts);
      console.log("✅ Base de datos poblada con datos iniciales.");
    }
  } catch (error) {
    console.error("❌ Error al poblar la base de datos:", error);
  }
};


// --- Función para iniciar el servidor ---
const startServer = async () => {
  try {
    await connectDB();
    await seedDatabase();

    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => {
        console.log(`✅ Servidor corriendo en el puerto ${PORT} en Soacha, listo para trabajar.`);
    });

  } catch (error) {
    console.error("No se pudo iniciar el servidor", error);
  }
};

// Iniciar la aplicación
startServer();