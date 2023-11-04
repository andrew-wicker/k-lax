import React from 'react';
import { UseSelector } from 'react-redux';
import SearchDisplay from './SearchDisplay';
import CollectionDisplay from './CollectionDisplay';

const MainContainer = () => {
  return (
    // <div class="main-title">

    // {/* </div> */}
    <div className="container">
      <div className="titleBar">
        <h1>
          <strong>K•LAX </strong>Game Collection Manager
        </h1>
        {/* <br /> */}
        {/* <h3>Game Collection Manager</h3> */}
      </div>
      <div className="topAndMainDisplay">
        <div className="containerTopDisplay">
          <SearchDisplay />
        </div>
        <div className="containerMainDisplay">
          <CollectionDisplay />
        </div>
      </div>
    </div>
  );
};

export default MainContainer;
