import { configureStore } from '@reduxjs/toolkit';
import displayReducer from '../reducers/displayReducer';
import collectionReducer from '../reducers/collectionReducer';
import searchReducer from '../reducers/searchReducer';

export const store = configureStore({
  reducer: {
    display: displayReducer,
    collection: collectionReducer,
    search: searchReducer,
  },
});

export default store;
