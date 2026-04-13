// Este módulo se encarga exclusivamente de establecer la conexión
// con MongoDB Atlas usando Mongoose.

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    // mongoose.connect() devuelve una promesa.
    // Usamos await para esperar a que la conexión sea exitosa.
    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      // Estas opciones son recomendadas para evitar warnings de deprecación
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB conectado: ${conn.connection.host}`);
  } catch (error) {
    // Si la conexión falla (URI incorrecta, sin internet, IP bloqueada),
    // mostramos el error y terminamos el proceso para no dejar el
    // servidor corriendo en un estado inválido.
    console.error(`❌ Error al conectar MongoDB: ${error.message}`);
    process.exit(1); // Código 1 indica salida con error
  }
};

module.exports = connectDB;
