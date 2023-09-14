import { SEARCH_GAME, SET_SEARCH_RESULTS } from '../constants/actionTypes';

const initialState = {
  isLoading: false,
  titleSelection: [],
};

const searchReducer = (state = initialState, action) => {
  switch (action.type) {
    case SEARCH_GAME:
      return {
        ...state,
        isLoading: true,
      };
    case SET_SEARCH_RESULTS:
      return {
        ...state,
        isLoading: false,
        titleSelection: action.payload,
      };
    default:
      return state;
  }
};

export default searchReducer;
