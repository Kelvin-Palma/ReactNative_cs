const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
	loc_id: {
		type: String,
		required: true,
		unique: true,
	},
	name: {
		type: String,
		required: true,
		trim: true,
	},
	description: {
		type: String,
		default: '',
	},
	radius_m: {
		type: Number,
		default: 30,
		min: 1,
	},
	// GeoJSON Point: coordinates = [longitud, latitud]
	location: {
		type: {
			type: String,
			enum: ['Point'],
			default: 'Point',
			required: true,
		},
		coordinates: {
			type: [Number],
			required: true,
			validate: {
				validator: (arr) => Array.isArray(arr) && arr.length === 2,
				message: 'coordinates debe tener [longitud, latitud]',
			},
		},
	},
}, { timestamps: true });

// Requerido para consultas geoespaciales ($near, $geoWithin)
LocationSchema.index({ location: '2dsphere' });

module.exports = mongoose.model('Location', LocationSchema);
