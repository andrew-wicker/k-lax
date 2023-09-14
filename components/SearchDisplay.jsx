import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchGameActionCreator } from '../actions/gameActions';
import GameTile from './gameTile';
import CollectionDisplay from './CollectionDisplay';
const xml2js = require('xml2js');

const SearchDisplay = () => {
  const [gameTitle, setGameTitle] = useState('');
  const [titleSelection, setTitleSelection] = useState([]);
  const isLoading = useSelector((state) => state.search.isLoading);
  const dispatch = useDispatch();
  const [gameAdded, setGameAdded] = useState(false);

  const handleAddToCollection = () => {
    setGameAdded(true);
    setTitleSelection([]);
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setGameTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gameTitle.trim() !== '') {
      dispatch(searchGameActionCreator(gameTitle))
        .then((results) => {
          setTitleSelection(results);
        })
        .catch((error) => {
          console.error(error);
          setTitleSelection([]);
        });
    }
  };

  return (
    <div className="search-display">
      {gameAdded ? (
        <CollectionDisplay />
      ) : (
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
          {titleSelection && titleSelection.length > 0 && (
            <div className="search-results">
              <h4>Search Results:</h4>
              <ul>
                {titleSelection.map((game) => (
                  <li key={game.id}>
                    <GameTile
                      game={game}
                      onAddToCollection={handleAddToCollection}
                    />
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDisplay;
