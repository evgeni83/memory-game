import React, { FC } from 'react';
import { ICard } from '../../types/cards';
import { useDispatch } from 'react-redux';
import { openCard } from '../../store/actions/cardsAction';
import { addToMatch } from '../../store/actions/matchAction';
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

	return <button
		className={ classNames.join( ' ' ) }
		onClick={ () => {
			clickHandler( item.id );
		} }
	>
        <span className={ classes.imgWrap }>
            <img className={ classes.img } src={ item.img } alt="icon"/>
        </span>
	</button>;
};

export default Card;
