const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const gameSchema = new Schema({
	bggId: { type: Number, required: true },
	title: { type: String, required: true },
	coverImage: { type: String, required: true },
	thumbnail: { type: String, required: true },
	description: { type: String, required: true },
	minPlayers: { type: Number, required: true },
	maxPlayers: { type: Number, required: true },
	yearPublished: { type: Number, required: true },
});

module.exports = mongoose.model('Game', gameSchema);
