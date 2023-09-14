const express = require('express');
const cors = require('cors');
const router = express.Router();
const bggController = require('../controllers/bggController');
const gameController = require('../controllers/gameController');

router.use(cors());

router.use(
  '/:gameTitle',
  bggController.gameLookup,
  bggController.gameDetailLookup,
  (req, res) => {
    return res.status(200).json(res.locals.boardgame);
  }
);

router.post('/', gameController.createGame);

module.exports = router;
