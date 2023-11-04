const gameController = require('../controllers/gameController');
const express = require('express');
const mongoRouter = express.Router();
const cors = require('cors');

mongoRouter.use(cors());
mongoRouter.get('/', gameController.getCollection);

module.exports = mongoRouter;
