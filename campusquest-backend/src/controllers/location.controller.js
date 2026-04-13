// Maneja las consultas de estaciones del campus.

const Location = require('../models/Location');

/**
 * GET /api/locations
 * Devuelve todas las estaciones del campus.
 * El cliente las usa para mostrar los marcadores en el mapa.
 */
const getAllLocations = async (req, res) => {
  try {
    const locations = await Location.find({});
    res.status(200).json({ success: true, count: locations.length, data: locations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * GET /api/locations/:locId
 * Devuelve una estación específica por su loc_id.
 */
const getLocationById = async (req, res) => {
  try {
    const location = await Location.findOne({ loc_id: req.params.locId });
    if (!location) {
      return res.status(404).json({ success: false, message: 'Estación no encontrada' });
    }
    res.status(200).json({ success: true, data: location });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getAllLocations, getLocationById };