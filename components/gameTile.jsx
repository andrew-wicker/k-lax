import React from 'react';
import { gameDetailLookUpActionCreator } from '../actions/gameActions';
import { useDispatch } from 'react-redux';

const GameTile = ({ game }) => {
  const dispatch = useDispatch();
  const handleSubmit = () => {
    dispatch(gameDetailLookUpActionCreator(game.id));
  };

  return (
    <div className="game-tile">
      <h3>{game.title}</h3>
      <p> {game.yearPublished}</p>
      <button
        id="addToCollection"
        onClick={handleSubmit}
      >
        Add To Collection
      </button>
    </div>
  );
};

export default GameTile;
