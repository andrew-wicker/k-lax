import { ADD_GAME_SUCCESSFUL } from '../constants/actionTypes';

const initialState = {
  games: [],
  addedGame: null,
};

const collectionReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_GAME_SUCCESSFUL:
      console.log('add game was successful');
      console.log(action.payload);
      return {
        ...state,
        addedGame: action.payload,
        games: [...state.games, action.payload],
      };

    default:
      return state;
  }
};

export default collectionReducer;
