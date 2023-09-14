import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchGameActionCreator } from '../actions/gameActions';
import GameTile from './gameTile';
const xml2js = require('xml2js');

const SearchDisplay = () => {
  const [gameTitle, setGameTitle] = useState('');
  const titleSelection = useSelector((state) => state.search.titleSelection);
  const isLoading = useSelector((state) => state.search.isLoading);
  const dispatch = useDispatch();

  const handleInputChange = (e) => {
    e.preventDefault();
    setGameTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gameTitle.trim() !== '') {
      dispatch(searchGameActionCreator(gameTitle));
    }
  };

  return (
    <div className="enterGameTitle">
      <h3>Game Title: </h3>
      <input
        id="gameTitleInput"
        type="text"
        value={gameTitle}
        onChange={handleInputChange}
        placeholder=" Enter game title..."
      />
      <button
        id="searchGame"
        onClick={handleSubmit}
      >
        {isLoading ? 'Searching...' : 'Search'}
      </button>
      {titleSelection.length > 0 && (
        <div>
          <h4>Search Results:</h4>
          <ul>
            {titleSelection.map((game) => (
              <li key={game.id}>
                <GameTile game={game} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default SearchDisplay;
