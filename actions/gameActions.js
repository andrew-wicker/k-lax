import { useDispatch } from 'react-redux';
import * as types from '../constants/actionTypes';
import bggController from '../controllers/bggController';
const xml2js = require('xml2js');

const createErr = (errInfo) => {
  const { method, type, err } = errInfo;
  return {
    log: `gameActions.${method} ${type}: ERROR: ${
      typeof err === 'object' ? JSON.stringify(err) : err
    }`,
    message: {
      err: `Error occurred in gameActions.${method}. Check server logs for more details.`,
    },
  };
};

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
      // mergeAttrs: true,
      // normalizeTags: true,
      // normalize: true,
      // explicitArray: false,
    });

    const jsonData = await parser.parseStringPromise(xmlData);
    console.log(jsonData);
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
    console.log(reqGameDataJson);

    const bggId = gameId;
    const title = reqGameDataJson.items.item.name[0].value;
    const coverImage = reqGameDataJson.items.item.image;
    const thumbnail = reqGameDataJson.items.item.thumbnail;
    const description = reqGameDataJson.items.item.description;
    const minPlayers = reqGameDataJson.items.item.minplayers.value;
    const maxPlayers = reqGameDataJson.items.item.maxplayers.value;
    const yearPublished = reqGameDataJson.items.item.yearpublished.value;

    const boardgame = {
      bggId,
      title,
      coverImage,
      thumbnail,
      description,
      minPlayers,
      maxPlayers,
      yearPublished,
    };

    console.log(boardgame);

    dispatch({
      type: types.GAME_DETAIL_LOOKUP,
      payload: gameId,
    });

    dispatch(addGameToCollectionActionCreator(boardgame));
  } catch (error) {
    console.error(error);
  }
};

export const addGameToCollectionActionCreator =
  (boardgame) => async (dispatch) => {
    try {
      const addGameAPI = 'http://localhost:3000/add-game';
      dispatch({ type: types.ADD_GAME_TO_COLLECTION });

      const response = await fetch(addGameAPI, {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },

        body: JSON.stringify(boardgame),
      });

      if (!response.ok) {
        throw new Error('Network response was not ok!');
      }

      dispatch({
        type: types.ADD_GAME_SUCCESSFUL,
        payload: boardgame,
      });
    } catch (err) {
      console.error(err);
    }
  };

export const addGameSuccessfulActionCreator = (boardgame) => {
  return {
    type: types.ADD_GAME_SUCCESSFUL,
    payload: boardgame,
  };
};
