import React, { useState, useEffect } from 'react';
import CollectionTile from './CollectionTile';
import { useSelector } from 'react-redux';

const CollectionDisplay = () => {
  const [collection, setCollection] = useState([]);
  const addedGame = useSelector((state) => state.collection.addedGame);

  const fetchCollection = async () => {
    const collectionApi = 'http://localhost:3000/get-collection';
    try {
      const response = await fetch(collectionApi);
      if (!response.ok) {
        throw new Error(
          'fetchCollection in CollectionDisplay: network response was not ok!'
        );
      }
      const data = await response.json();
      setCollection(data);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCollection();
    console.log('is the useEffect running?');
  }, [addedGame]);

  return (
    <div className="collectionDisplay">
      {collection.map((game) => (
        <CollectionTile
          key={game.id}
          title={game.title}
          description={game.description}
          minPlayers={game.minPlayers}
          maxPlayers={game.maxPlayers}
          yearPublished={game.yearPublished}
          coverImage={game.coverImage}
        />
      ))}
    </div>
  );
};

export default CollectionDisplay;
