// Contiene la lógica de negocio para el login.
// Separar controladores de rutas mejora la legibilidad y testabilidad.

const jwt = require('jsonwebtoken');
const User = require('../models/User');

/**
 * POST /api/auth/login
 * Body: { username, password }
 * Response: { token, user: { username, team_id, role } }
 */
const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    // Validación básica: ambos campos son requeridos
    if (!username || !password) {
      return res.status(400).json({
        success: false,
        message: 'Usuario y contraseña son requeridos',
      });
    }

    // Busca el usuario en la BD. Si no existe, devuelve 401
    // para no revelar si el usuario existe o no (seguridad)
    const user = await User.findOne({ username: username.toLowerCase() });
    if (!user) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas',
      });
    }

    // Compara la contraseña ingresada con el hash almacenado
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(401).json({
        success: false,
        message: 'Credenciales inválidas',
      });
    }

    // Genera el token JWT.
    // El payload contiene datos mínimos del usuario (no la contraseña).
    // El token expira según JWT_EXPIRES_IN del .env.
    const token = jwt.sign(
      { id: user._id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );

    res.status(200).json({
      success: true,
      token,
      user: {
        username: user.username,
        team_id: user.team_id,
        role: user.role,
      },
    });

  } catch (error) {
    console.error('Error en login:', error);
    res.status(500).json({ success: false, message: 'Error interno del servidor' });
  }
};

module.exports = { login };