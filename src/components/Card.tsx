import React, { FC } from 'react';
import { ICard } from '../types/cards';
import { useDispatch } from 'react-redux';
import { openCard } from '../store/actions/cardsAction';
import { addToMatch } from '../store/actions/matchAction';
import { useTypedSelector } from '../hooks/useTypedSelector';

interface ICardProps {
	item: ICard;
}


const Card: FC<ICardProps> = ( { item } ) => {

	const match = useTypedSelector( state => state.match );
	const dispatch = useDispatch();

	let className = 'cardsGrid__item';

	if ( item.isOpen ) {
		className += ' opened';
	}

	if ( item.isHidden ) {
		className += ' hidden';
	}

	const clickHandler = ( id: number ) => {
		if ( match.length >= 2 ) return false;
		dispatch( openCard( id ) );
		dispatch( addToMatch( item ) );
	};

	return <button
		className={ className }
		onClick={ () => {
			clickHandler( item.id );
		} }
	>
        <span className="img-wrap">
            <img className="img" src={ item.img } alt="icon"/>
        </span>
	</button>;
};

export default Card;
