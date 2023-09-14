import { useDispatch } from 'react-redux';
import * as types from '../constants/actionTypes';
import bggController from '../controllers/bggController';
const xml2js = require('xml2js');

export const searchGameActionCreator = (gameTitle) => async (dispatch) => {
  try {
    dispatch({ type: types.SEARCH_GAME });

    const requestPath = `https://boardgamegeek.com/xmlapi2/search?query=${gameTitle}&type=boardgame`;

    const response = await fetch(requestPath);

    if (!response.ok) {
      throw new Error('Network response was not ok!');
    }

    const xmlData = await response.text();

    const parser = new xml2js.Parser({
      mergeAttrs: true,
      normalizeTags: true,
      normalize: true,
      explicitArray: false,
    });

    const jsonData = await parser.parseStringPromise(xmlData);
    const searchResults = jsonData.items.item;
    console.log(searchResults);

    const titleSelection = [];
    searchResults.forEach((game) => {
      const gameObj = {
        id: game.id,
        title: game.name ? game.name.value : 'Unknown',
        yearPublished: game.yearpublished
          ? game.yearpublished.value
          : 'Unknown',
      };
      titleSelection.push(gameObj);
    });
    // console.log(searchResults);
    // console.log(titleSelection);

    dispatch(setSearchResultsActionCreator(titleSelection));
  } catch (error) {
    console.error(error);
  }
};

export const setSearchResultsActionCreator = (titleSelection) => ({
  type: types.SET_SEARCH_RESULTS,
  payload: titleSelection,
});

export const gameDetailLookUpActionCreator = (gameId) => async (dispatch) => {
  try {
    const detailUrl = `https://boardgamegeek.com/xmlapi2/thing?id=${gameId}`;

    const response = await fetch(detailUrl);
    if (!response.ok) {
      throw new Error(`Network response was not ok on id query`);
    }
    const parser = new xml2js.Parser({
      mergeAttrs: true,
      normalizeTags: true,
      normalize: true,
      explicitArray: false,
    });

    const reqGameData = await response.text();

    const reqGameDataJson = await parser.parseStringPromise(reqGameData);
    // console.log(reqGameDataJson);

    const boardGameTitle = reqGameDataJson.items.item.name.value;
    const boardGameCoverImage = reqGameDataJson.items.item.image;
    const boardGameThumbnail = reqGameDataJson.items.item.thumbnail;
    const boardGameDescription = reqGameDataJson.items.item.description;
    const boardGameMinPlayers = reqGameDataJson.items.item.minplayers.value;
    const boardGameMaxPlayers = reqGameDataJson.items.item.maxplayers.value;
    const boardGameYearPublished =
      reqGameDataJson.items.item.yearpublished.value;

    const boardgame = {
      boardGameTitle,
      boardGameCoverImage,
      boardGameThumbnail,
      boardGameDescription,
      boardGameMinPlayers,
      boardGameMaxPlayers,
      boardGameYearPublished,
    };

    dispatch({
      type: types.GAME_DETAIL_LOOKUP,
      payload: gameId,
    });
  } catch (error) {
    console.error(error);
  }
};
