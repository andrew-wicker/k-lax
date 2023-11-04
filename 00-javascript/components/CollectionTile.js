import React from 'react';

const CollectionTile = (props) => {
  const {
    title,
    coverImage,
    description,
    minPlayers,
    maxPlayers,
    yearPublished,
  } = props;
  return (
    <div className="collection-tile">
      <img src={coverImage} />
      <h3
        className="animate-text"
        id="title"
      >
        {title}
      </h3>{' '}
      <ul className="collection-data">
        <li id="playerCount">
          # of Players: {minPlayers} - {maxPlayers} | Published: {yearPublished}
        </li>
        {/* <li id="yearPublished">Published: {yearPublished}</li> */}
      </ul>
      <div className="description-container">
        <div
          className="animate-text"
          id="description"
        >
          {description}
        </div>
      </div>
    </div>
  );
};

export default CollectionTile;
