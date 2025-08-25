// backend/seeder.js
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

// Cargar los modelos
const Product = require('./models/Product');
const BlogPost = require('./models/BlogPost');
const QuoteRequest = require('./models/QuoteRequest');
const DistributorRequest = require('./models/DistributorRequest');
const LandingPageLead = require('./models/LandingPageLead');
const OfferContent = require('./models/OfferContent');
const User = require('./models/User');

dotenv.config();

connectDB();

const destroyData = async () => {
  try {
    // Limpiamos todas las colecciones
    await Product.deleteMany();
    await BlogPost.deleteMany();
    await QuoteRequest.deleteMany();
    await DistributorRequest.deleteMany();
    await LandingPageLead.deleteMany();
    await OfferContent.deleteMany();
    // Opcional: Si quieres borrar también a los usuarios administradores
    // await User.deleteMany();

    console.log('✅ Datos eliminados exitosamente.');
    process.exit();
  } catch (error)
  {
    console.error(`❌ Error al eliminar los datos: ${error}`);
    process.exit(1);
  }
};

// Revisa si se pasó el argumento "-d" en la línea de comandos
if (process.argv[2] === '-d') {
  destroyData();
}