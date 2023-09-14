import React from 'react';
import { gameDetailLookUpActionCreator } from '../actions/gameActions';
import { useDispatch } from 'react-redux';

const GameTile = ({ game, onAddToCollection }) => {
  const dispatch = useDispatch();
  const handleAddToCollection = () => {
    dispatch(gameDetailLookUpActionCreator(game.id));
    onAddToCollection();
  };

  return (
    <div className="game-tile">
      <h3>{game.title}</h3>
      <p> {game.yearPublished}</p>
      <button
        id="addToCollection"
        onClick={handleAddToCollection}
      >
        Add To Collection
      </button>
    </div>
  );
};

export default GameTile;
