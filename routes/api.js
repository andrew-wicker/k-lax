const express = require('express');
const router = express.Router();
const bggController = require('../controllers/bggController');
const gameController = require('../controllers/gameController');

router.use(
  '/:gameTitle',
  bggController.gameLookup,
  bggController.gameDetailLookup,
  (req, res) => {
    return res.status(200).json(res.locals.boardgame);
  }
);

router.post('/add-game', gameController.createGame);

module.exports = router;
