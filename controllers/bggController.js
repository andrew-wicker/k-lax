const { request } = require('http');
const xml2js = require('xml2js');
const path = require('path');

// Helper function to create error objects
const createErr = (errInfo) => {
	const { method, type, err } = errInfo;
	return {
		log: `fileController.${method} ${type}: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
		message: {
			err: `Error occurred in fileController.${method}. Check server logs for more details.`,
		},
	};
};

const bggController = {};

// Middleware to conduct a name search from input field and retrive the BGG id

bggController.gameLookup = async (req, res, next) => {
	try {
		// Declare and initialize a variable to the value of the request parameter
		const gameTitle = req.params.gameTitle;
		// Declare a variable for the request url and pass in the value of the request parameter as a template literal
		const requestPath = `https://boardgamegeek.com/xmlapi2/search?query=${gameTitle}&type=boardgame`;

		const response = await fetch(requestPath);
		if (!response.ok) {
			throw new Error('Network response was not ok!');
		}
		const xmlData = await response.text();
		// Parse XML data using xml2js
		const parser = new xml2js.Parser({
			mergeAttrs: true,
			normalizeTags: true,
			normalize: true,
		});

		const jsonData = await parser.parseStringPromise(xmlData);
		const queryId = jsonData.items.item[0].id;
		res.locals.gameId = [...queryId];
		next();
	} catch (err) {
		return next({
			log: `bggController.gameLookup: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
			message: {
				err: 'Error occured in bggController.gameLookup. Check server logs for details.',
			},
		});
	}
};

// Middleware to do detailed API call and structure output using the id retrieved in `bggController.gameLookup`
bggController.gameDetailLookup = async (req, res, next) => {
	try {
		const queryId = res.locals.gameId;

		const detailUrl = `https://boardgamegeek.com/xmlapi2/thing?id=${queryId}`;

		const response = await fetch(detailUrl);
		if (!response.ok) {
			throw new Error(`Network response was not ok on id query`);
		}
		const parser = new xml2js.Parser({
			mergeAttrs: true,
			normalizeTags: true,
			normalize: true,
		});

		const reqGameData = await response.text();

		const reqGameDataJson = await parser.parseStringPromise(reqGameData);

		const boardGameTitle = reqGameDataJson.items.item[0].name[0].value[0];
		const boardGameCoverImage = reqGameDataJson.items.item[0].image[0];
		const boardGameThumbnail = reqGameDataJson.items.item[0].thumbnail[0];
		const boardGameDescription = reqGameDataJson.items.item[0].description[0];
		const boardGameMinPlayers = reqGameDataJson.items.item[0].minplayers[0].value[0];
		const boardGameMaxPlayers = reqGameDataJson.items.item[0].maxplayers[0].value[0];
		const boardGameYearPublished = reqGameDataJson.items.item[0].yearpublished[0].value[0];
		const boardgame = {
			boardGameTitle,
			boardGameCoverImage,
			boardGameThumbnail,
			boardGameDescription,
			boardGameMinPlayers,
			boardGameMaxPlayers,
			boardGameYearPublished,
		};

		res.locals.boardgame = boardgame;
		return next();
	} catch (err) {
		return next({
			log: `bggController.gameLookup: ERROR: ${typeof err === 'object' ? JSON.stringify(err) : err}`,
			message: {
				err: 'Error occured in bggController.gameLookup. Check server logs for details.',
			},
		});
	}
};

module.exports = bggController;
