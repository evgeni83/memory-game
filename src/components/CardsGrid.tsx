import React, { FC, useEffect, useState } from 'react';
import Card from './Card';
import { useTypedSelector } from '../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { closeAllCards, hideMatchedCards, shuffleCards } from '../store/actions/cardsAction';
import { cleanMatch } from '../store/actions/matchAction';

const CardsGrid: FC = () => {
	const [ show, setShow ] = useState( false );
	const cards = useTypedSelector( state => state.cards );
	const match = useTypedSelector( state => state.match );
	const dispatch = useDispatch();

	useEffect( () => {
		dispatch( shuffleCards() );
		setShow( true );
	}, [] );

	useEffect( () => {
		if ( match.length === 2) {
			setTimeout( () => {
				dispatch( cleanMatch() );

				if ( match[0]?.img === match[1]?.img ) {
					dispatch( hideMatchedCards( match ))
				} else {
					dispatch( closeAllCards() );
				}

			}, 1000)
		}
	} );

	const classNames = [ 'cardsGrid' ];

	if ( show ) {
		classNames.push( 'visible' );
	}

	return (
		<div className={ classNames.join( ' ' ) }>
			{ cards.map( item => <Card key={ item.id } item={ item }/> ) }
		</div>
	);
};

export default CardsGrid;
