import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { searchGameActionCreator } from '../actions/gameActions';
import GameTile from './gameTile';
import CollectionDisplay from './CollectionDisplay';
const xml2js = require('xml2js');
import { setSearchResultsActionCreator } from '../actions/gameActions';
import Modal from 'react-modal';

const SearchDisplay = () => {
  const [gameTitle, setGameTitle] = useState('');
  const [showModal, setShowModal] = useState(false);
  // const [titleSelection, setTitleSelection] = useState([]);
  const isLoading = useSelector((state) => state.search.isLoading);
  const titleSelection = useSelector((state) => state.search.titleSelection);
  const dispatch = useDispatch();
  // const [gameAdded, setGameAdded] = useState(false);

  const handleAddToCollection = () => {
    // setGameAdded(true);
    // setTitleSelection([]);
    dispatch(setSearchResultsActionCreator([]));
    setGameTitle('');
  };

  const handleInputChange = (e) => {
    e.preventDefault();
    setGameTitle(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (gameTitle.trim() !== '') {
      dispatch(searchGameActionCreator(gameTitle))
        // .then((results) => {
        //   setTitleSelection(results);
        // })
        .catch((error) => {
          console.error(error);
          // setTitleSelection([]);
        });
    }
  };

  const openModal = () => {
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <div className="search-display">
      <Modal
        className="modal"
        isOpen={showModal}
        onRequestClose={closeModal}
        contentLabel="Search Results"
      >
        <h2>Search Results</h2>
        <div className="search-results">
          {titleSelection.map((game) => (
            <div
              className="search-result-tile"
              key={game.id}
            >
              <GameTile
                game={game}
                onAddToCollection={handleAddToCollection}
              />
            </div>
          ))}
        </div>
        <button onClick={closeModal}>X</button>
      </Modal>

      {titleSelection && titleSelection.length > 0 ? (
        <div className="search-results">
          <button onClick={openModal}>Show results</button>
        </div>
      ) : (
        <form
          className="search-display-form"
          onSubmit={(e) => {
            e.preventDefault;
            handleSubmit(e);
            openModal();
          }}
        >
          <div className="enterGameTitle">
            {/* <form
            role="search"
            id="gameTitleInput"
            value={gameTitle}
            onChange={handleInputChange}
            onSubmit={handleSubmit}
          > */}
            <label htmlFor="search">Add a game to your Collection</label>
            <input
              id="search"
              type="search"
              placeholder="Game lookup..."
              autoFocus
              required
              value={gameTitle}
              onChange={handleInputChange}
            />
            <button type="submit">
              {isLoading ? 'Searching...' : 'Search'}
            </button>
            {/* </form> */}
          </div>
        </form>
      )}
    </div>
  );
  // return (
  //   <div className="search-display">
  //     <div className="enterGameTitle">
  //       <h3>Game Title: </h3>
  //       <input
  //         id="gameTitleInput"
  //         type="text"
  //         value={gameTitle}
  //         onChange={handleInputChange}
  //         placeholder=" Enter game title..."
  //       />
  //       <button
  //         id="searchGame"
  //         onClick={handleSubmit}
  //       >
  //         {isLoading ? 'Searching...' : 'Search'}
  //       </button>
  //       {titleSelection && titleSelection.length > 0 && (
  //         <div className="search-results">
  //           <h4>Search Results:</h4>
  //           <ul>
  //             {titleSelection.map((game) => (
  //               <li key={game.id}>
  //                 <GameTile
  //                   game={game}
  //                   onAddToCollection={handleAddToCollection}
  //                 />
  //               </li>
  //             ))}
  //           </ul>
  //         </div>
  //       )}
  //     </div>
  //   </div>
  // );
};

export default SearchDisplay;
