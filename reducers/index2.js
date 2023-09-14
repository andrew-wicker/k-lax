import { combineReducers } from '@reduxjs/toolkit';
import displayReducer from './displayReducer.js';
import collectionReducer from './collectionReducer';
import searchReducer from './searchReducer.js';

const reducers = combineReducers({
  display: displayReducer,
  collection: collectionReducer,
  search: searchReducer,
});

export default reducers;
