require('dotenv').config();

const express    = require('express');
const cors       = require('cors');
const connectDB  = require('./config/db');
const authRoutes = require('./routes/auth.routes');
const locRoutes  = require('./routes/location.routes');

connectDB(); // Conectar a MongoDB Atlas

const app = express();

// ── Middlewares globales ─────────────────────────────
app.use(cors());          // Permite peticiones desde React Native
app.use(express.json());  // Parsea body JSON

// ── Rutas ────────────────────────────────────────────
app.use('/api/auth',      authRoutes);
app.use('/api/locations', locRoutes);

// ── Health check ─────────────────────────────────────
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', time: new Date() });
});

// ── Iniciar servidor ──────────────────────────────────
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
  console.log(`🚀 Servidor en http://localhost:${PORT}`)
);
