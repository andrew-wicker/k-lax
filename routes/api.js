const express = require('express');
const router = express.Router();
const bggController = require('../controllers/bggController');

router.use('/:gameTitle', bggController.gameLookup, bggController.gameDetailLookup, (req, res) => {
	return res.status(200).json(res.locals.boardgame);
});

module.exports = router;
