import React from 'react';
import { UseSelector } from 'react-redux';
import SearchDisplay from './SearchDisplay';
import CollectionDisplay from './CollectionDisplay';

const MainContainer = () => {
	return (
		<div className='container'>
			<div className='containerTopDisplay'>
				<SearchDisplay />
			</div>
			<div className='containerMainDisplay'>
				<CollectionDisplay />
			</div>
		</div>
	);
};

export default MainContainer;
