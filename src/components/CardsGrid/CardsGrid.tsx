import React, { FC, useEffect, useMemo } from 'react';
import Card from '../Card/Card';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { useDispatch } from 'react-redux';
import { closeOpenedCards, hideMatchedCards } from '../../store/actions/cardsActions';
import { cleanMatch } from '../../store/actions/matchActions';

import classes from './cardsGrid.module.scss';

const CardsGrid: FC = () => {
	const { list } = useTypedSelector( state => state.cards );
	const match = useTypedSelector( state => state.match );
	const dispatch = useDispatch();

	useEffect( () => {
		if ( match.length === 2 ) {
			const isMatch =  match[ 0 ]?.img === match[ 1 ]?.img;
			setTimeout( () => {
				dispatch( cleanMatch() );

				if ( isMatch ) {
					dispatch( hideMatchedCards( match ) );
				} else {
					dispatch( closeOpenedCards( match ) );
				}

			}, isMatch ? 300 : 1000 );
		}
	}, [ match ] );

	// Мемоизируем список карт для предотвращения ненужных перерисовок
	const cardElements = useMemo(() => {
		return list.map( item => <Card key={ item.id } item={ item }/> );
	}, [list]);

	return (
		<div className={ classes.cardsGrid } data-testid="cards-grid">
			{ cardElements }
		</div>
	);
};

export default React.memo(CardsGrid);
