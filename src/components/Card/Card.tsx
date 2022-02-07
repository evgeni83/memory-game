import React, { FC } from 'react';
import { ICard } from '../../types/cards';
import { useDispatch } from 'react-redux';
import { openCard } from '../../store/actions/cardsActions';
import { addToMatch } from '../../store/actions/matchActions';
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
		if ( match.length >= 2 ) return false;
		dispatch( openCard( id ) );
		dispatch( addToMatch( item ) );
	};

	return (
		<button className={ classNames.join( ' ' )} onClick={ () => {
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
