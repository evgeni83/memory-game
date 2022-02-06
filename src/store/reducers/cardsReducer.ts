import { CardsAction, CardsActionsTypes, ICardsState } from '../../types/cards';

import img_1 from '../../images/001-flat.png';
import img_2 from '../../images/001-viburnum-fruit.png';
import img_3 from '../../images/002-oranges.png';
import img_4 from '../../images/002-organic.png';
import img_5 from '../../images/003-organic.png';
import img_6 from '../../images/003-raspberry-pi.png';
import img_7 from '../../images/004-vegetables.png';
import img_8 from '../../images/004-viburnum-fruit.png';
import img_9 from '../../images/005-healthy-food.png';
import img_10 from '../../images/005-vegetables.png';
import img_11 from '../../images/006-healthy.png';
import img_12 from '../../images/006-vegetal-oil.png';
import img_13 from '../../images/007-organic-1.png';
import img_14 from '../../images/008-fattening.png';
import img_15 from '../../images/008-organic-2.png';
import img_16 from '../../images/009-cucumbers.png';
import img_17 from '../../images/009-organic-2.png';
import img_18 from '../../images/010-healthy-food-1.png';

let initialState: ICardsState = {
	list: [
		{ id: 1, img: img_1, isOpen: false, isHidden: false },
		{ id: 2, img: img_2, isOpen: false, isHidden: false },
		{ id: 3, img: img_3, isOpen: false, isHidden: false },
		{ id: 4, img: img_4, isOpen: false, isHidden: false },
		{ id: 5, img: img_5, isOpen: false, isHidden: false },
		{ id: 6, img: img_6, isOpen: false, isHidden: false },
		{ id: 7, img: img_7, isOpen: false, isHidden: false },
		{ id: 8, img: img_8, isOpen: false, isHidden: false },
		{ id: 9, img: img_9, isOpen: false, isHidden: false },
		{ id: 10, img: img_10, isOpen: false, isHidden: false },
		{ id: 11, img: img_11, isOpen: false, isHidden: false },
		{ id: 12, img: img_12, isOpen: false, isHidden: false },
		{ id: 13, img: img_13, isOpen: false, isHidden: false },
		{ id: 14, img: img_14, isOpen: false, isHidden: false },
		{ id: 15, img: img_15, isOpen: false, isHidden: false },
		{ id: 16, img: img_16, isOpen: false, isHidden: false },
		{ id: 17, img: img_17, isOpen: false, isHidden: false },
		{ id: 18, img: img_18, isOpen: false, isHidden: false },
		{ id: 19, img: img_1, isOpen: false, isHidden: false },
		{ id: 20, img: img_2, isOpen: false, isHidden: false },
		{ id: 21, img: img_3, isOpen: false, isHidden: false },
		{ id: 22, img: img_4, isOpen: false, isHidden: false },
		{ id: 23, img: img_5, isOpen: false, isHidden: false },
		{ id: 24, img: img_6, isOpen: false, isHidden: false },
		{ id: 25, img: img_7, isOpen: false, isHidden: false },
		{ id: 26, img: img_8, isOpen: false, isHidden: false },
		{ id: 27, img: img_9, isOpen: false, isHidden: false },
		{ id: 28, img: img_10, isOpen: false, isHidden: false },
		{ id: 29, img: img_11, isOpen: false, isHidden: false },
		{ id: 30, img: img_12, isOpen: false, isHidden: false },
		{ id: 31, img: img_13, isOpen: false, isHidden: false },
		{ id: 32, img: img_14, isOpen: false, isHidden: false },
		{ id: 33, img: img_15, isOpen: false, isHidden: false },
		{ id: 34, img: img_16, isOpen: false, isHidden: false },
		{ id: 35, img: img_17, isOpen: false, isHidden: false },
		{ id: 36, img: img_18, isOpen: false, isHidden: false },
	],
	matchedCardsAmount: 0,
};

export const cardsReducer = ( state = initialState, action: CardsAction ): ICardsState => {
	switch ( action.type ) {
		case CardsActionsTypes.SHUFFLE:
			let currentIndex = state.list.length, randomIndex, { list } = state;

			while ( currentIndex != 0 ) {
				randomIndex = Math.floor( Math.random() * currentIndex );
				currentIndex--;
				[ list[ currentIndex ], list[ randomIndex ] ] = [
					list[ randomIndex ], list[ currentIndex ] ];
			}

			return { ...state, list };

		case CardsActionsTypes.OPEN:
			const listWithOpenedCards = state.list.map( card => {
				if ( action.payload === card.id ) {
					return { ...card, isOpen: true };
				}
				return card;
			} );

			return { ...state, list: listWithOpenedCards };

		case CardsActionsTypes.CLOSE_OPENED:
			const listWithClosedCards = [ ...state.list ];

			action.payload.forEach( matchedCard => {
				const index = listWithClosedCards.findIndex( card => card.id === matchedCard?.id );
				if ( index < 0 ) {
					return;
				}
				listWithClosedCards[ index ].isOpen = false;
			} );

			return { ...state, list: listWithClosedCards };

		case CardsActionsTypes.HIDE_MATCHED:
			const listWithHiddenCards = [ ...state.list ],
				matchedCardsAmount: number = state.list.filter( card => card.isHidden ).length;

			action.payload.forEach( matchedCard => {
				const index = listWithHiddenCards.findIndex( card => card.id === matchedCard?.id );
				if ( index < 0 ) {
					return;
				}
				listWithHiddenCards[ index ].isHidden = true;
			} );

			return { list: listWithHiddenCards, matchedCardsAmount };

		case CardsActionsTypes.SHOW_ALL_HIDDEN:
			return {
				list: state.list.map( card => {
					card.isHidden = false;
					card.isOpen = false;
					return card;
				} ),
				matchedCardsAmount: 0,
			};

		default:
			return state;
	}
};
