const express = require('express');
const { protect } = require('../middleware/auth.middleware');
const {
	getAllLocations,
	getLocationById,
} = require('../controllers/location.controller');

const router = express.Router();

router.get('/', protect, getAllLocations);
router.get('/:locId', protect, getLocationById);

module.exports = router;
