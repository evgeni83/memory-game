import React, { FC } from 'react';
import { ICard } from '../../types/cards';
import { useDispatch } from 'react-redux';
import { openCard } from '../../store/actions/cardsActions';
import { addToMatch } from '../../store/actions/matchActions';
import { useTypedSelector } from '../../hooks/useTypedSelector';
import { animated, useSpring } from 'react-spring';

import classes from './card.module.scss';

interface ICardProps {
	item: ICard;
	index: number;
}


const Card: FC<ICardProps> = ( { item, index } ) => {

	const match = useTypedSelector( state => state.match );
	const dispatch = useDispatch();
	const props = useSpring( {
		from: {
			opacity: 0,
			transform: 'scale(0.8)'
		},
		to: {
			opacity: 1,
			transform: 'scale(1)'
		},
		config: {
			duration: 500
		},
		delay: index * 20,
	} );

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
		<animated.button style={ props } className={ classNames.join( ' ' ) } onClick={ () => {
			clickHandler( item.id );
		} }>
			<div className={ classes.front }>
				<img className={ classes.img } src={ item.img } alt="icon"/>
			</div>
			<div className={ classes.back }/>
		</animated.button>
	);
};

export default Card;
