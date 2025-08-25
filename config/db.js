const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // 1. Lee la cadena de conexión desde tus variables de entorno (.env)
    const conn = await mongoose.connect(process.env.MONGO_URI);

    // 2. Si la conexión es exitosa, muestra un mensaje en la consola
    console.log(`MongoDB Conectado: ${conn.connection.host} 🚀`);

  } catch (error) {
    // 3. Si hay un error, muestra el mensaje y detiene la aplicación
    console.error(`Error de conexión a la base de datos: ${error.message}`);
    process.exit(1); // Detiene la app si no se puede conectar a la DB
  }
};

module.exports = connectDB;