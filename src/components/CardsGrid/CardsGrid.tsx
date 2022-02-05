import React, { FC, useEffect } from 'react';
import Card from '../Card/Card';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { closeAllCards, hideMatchedCards } from '../../store/actions/cardsActions';
import { cleanMatch } from '../../store/actions/matchActions';

import classes from './cardsGrid.module.scss';

const CardsGrid: FC = () => {
	const { list } = useTypedSelector( state => state.cards );
	const match = useTypedSelector( state => state.match );
	const dispatch = useDispatch();

	useEffect( () => {
		if ( match.length === 2 ) {
			setTimeout( () => {
				dispatch( cleanMatch() );

				if ( match[ 0 ]?.img === match[ 1 ]?.img ) {
					dispatch( hideMatchedCards( match ) );
				} else {
					dispatch( closeAllCards() );
				}

			}, 1000 );
		}
	}, [ match ] );

	return (
		<div className={ classes.cardsGrid }>
			{ list.map( item => <Card key={ item.id } item={ item }/> ) }
		</div>
	);
};

export default CardsGrid;
