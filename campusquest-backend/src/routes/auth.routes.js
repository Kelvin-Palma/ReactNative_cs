// Define los endpoints de autenticación y los conecta con los controladores.

const express = require('express');
const router = express.Router();
const { login } = require('../controllers/auth.controller');

// POST /api/auth/login
router.post('/login', login);

module.exports = router;