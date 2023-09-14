import * as types from '../constants/actionTypes';

const initialState = {
  bggId: null,
  title: '',
  coverImage: '',
  thumbnail: '',
  description: '',
  minPlayers: 0,
  maxPlayers: 0,
  yearPublished: 0,
  options: [],
};

const displayReducer = (state = initialState, action) => {
  let new_bggId,
    new_title,
    new_coverImage,
    new_thumbnail,
    new_description,
    new_minPlayers,
    new_maxPlayers,
    new_yearPublished;

  // switch (action.type) {
  //   default:
  return state;
};

export default displayReducer;
