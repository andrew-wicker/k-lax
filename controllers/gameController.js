const Game = require('../models/gameModel');

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

module.exports = gameController;
