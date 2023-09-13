const express = require('express');
const fetch = require('fetch');
const xml2js = require('xml2js');
const bodyParser = require('body-parser');

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get('/search/:gameTitle', async (req, res) => {
	try {
		const gameTitle = req.params.gameTitle;
		const response = await axios.get(`https://api.geekdo.com/xmlapi2/search?type=boardgame&query=${gameTitle}`);
		const xmlData = response.data;

		// Parse XML data using xml2js
		const parser = new xml2js.Parser();
		const jsonData = await parser.parseStringPromise(xmlData);

		// Extract relevant game information from jsonData
		// Populate a tile with the game's image and information

		// Send the game information as JSON response to the client
		res.json({ gameInfo: relevantInfo });
	} catch (error) {
		console.error(error);
		res.status(500).json({ error: 'An error occurred while fetching game data' });
	}
});

app.listen(port, () => {
	console.log(`Server is running on port ${port}`);
});
