import React, { FC } from 'react';
import { ICard } from '../../types/cards';
import { useDispatch } from 'react-redux';
import { closeOpenedCards, openCard } from '../../store/actions/cardsActions';
import { addToMatch, cleanMatch } from '../../store/actions/matchActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';

import classes from './card.module.scss';

interface ICardProps {
	item: ICard;
}


const Card: FC<ICardProps> = ( { item } ) => {

	const match = useTypedSelector( state => state.match );
	const dispatch = useDispatch();

	const classNames: Array<string> = [ classes.item ];

	if ( item.isOpen ) {
		classNames.push( classes.opened );
	}

	if ( item.isHidden ) {
		classNames.push( classes.hidden );
	}

	const clickHandler = ( id: number ) => {
		// Prevent interaction with already opened or hidden cards
		if ( item.isHidden || item.isOpen ) return;

		if ( match.length >= 2 ) {
			dispatch( closeOpenedCards( match ) );
			dispatch( cleanMatch() );
		} else {
			dispatch( openCard( id ) );
			dispatch( addToMatch( item ) );
		}
	};

	return (
		<button className={ classNames.join( ' ' ) }
			disabled={ item.isHidden || item.isOpen }
			onClick={ () => {
				clickHandler( item.id );
			} }>
			<div className={ classes.front }>
				<img className={ classes.img } src={ item.img } alt="icon"/>
			</div>
			<div className={ classes.back }/>
		</button>
	);
};

export default Card;
