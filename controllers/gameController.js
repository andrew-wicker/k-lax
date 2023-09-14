const Game = require('../models/gameModel');
const mongoose = require('mongoose');
const { gameSearch } = require('./bggController');
const mongoURI =
  'mongodb+srv://klax-server:klax@k-lax-mongodb-dev.qgsi6rb.mongodb.net/';
// const gameModel = require('../models/gameModel');
// const Game = mongoose.model('Game', gameSchema);
mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const klax = mongoose.connection;

const gameController = {};

gameController.createGame = async (req, res, next) => {
  try {
    const {
      bggId,
      title,
      coverImage,
      thumbnail,
      description,
      minPlayers,
      maxPlayers,
      yearPublished,
    } = req.body;
    const newGame = new Game({
      bggId,
      title,
      coverImage,
      thumbnail,
      description,
      minPlayers,
      maxPlayers,
      yearPublished,
    });

    await newGame.save();
    res.status(201).json({ message: 'Game added to collection' });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      error: 'An error occured while adding the game to the collection',
    });
  }
};

gameController.getCollection = async (req, res, next) => {
  try {
    const games = await Game.find({});
    // console.log(games);
    return res.status(200).json(games);
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'An error occured while fetching the collection',
    });
  }
};

module.exports = gameController;
