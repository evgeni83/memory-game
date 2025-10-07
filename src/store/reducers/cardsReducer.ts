import { createReducer } from '@reduxjs/toolkit';
import {
	closeOpenedCards,
	hideMatchedCards,
	openCard,
	showAllHiddenCards,
	shuffleCards,
} from '../actions/cardsActions';
import { ICardsState } from '../../types/cards';

const img_1 = '/images/001-flat.png';
const img_2 = '/images/001-viburnum-fruit.png';
const img_3 = '/images/002-oranges.png';
const img_4 = '/images/002-organic.png';
const img_5 = '/images/003-organic.png';
const img_6 = '/images/003-raspberry-pi.png';
const img_7 = '/images/004-vegetables.png';
const img_8 = '/images/004-viburnum-fruit.png';
const img_9 = '/images/005-healthy-food.png';
const img_10 = '/images/005-vegetables.png';
const img_11 = '/images/006-healthy.png';
const img_12 = '/images/006-vegetal-oil.png';
const img_13 = '/images/007-organic-1.png';
const img_14 = '/images/008-fattening.png';
const img_15 = '/images/008-organic-2.png';
const img_16 = '/images/009-cucumbers.png';
const img_17 = '/images/009-organic-2.png';
const img_18 = '/images/010-healthy-food-1.png';

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

export const cardsReducer = createReducer( initialState, ( builder ) => {
	builder
		.addCase( shuffleCards, ( state ) => {
			let currentIndex = state.list.length, randomIndex, { list } = state;
			while ( currentIndex != 0 ) {
				randomIndex = Math.floor( Math.random() * currentIndex );
				currentIndex--;
				[ list[ currentIndex ], list[ randomIndex ] ] = [ list[ randomIndex ], list[ currentIndex ] ];
			}
		} )
		.addCase( openCard, ( state, action ) => {
			state.list.forEach( card => {
				if ( action.payload === card.id ) {
					card.isOpen = true;
				}
			} );
		} )
		.addCase( closeOpenedCards, ( state, action ) => {
			action.payload.forEach( matchedCard => {
				const index = state.list.findIndex( card => card.id === matchedCard?.id );
				if ( index < 0 ) {
					return;
				}
				state.list[ index ].isOpen = false;
			} );
		} )
		.addCase( hideMatchedCards, ( state, action ) => {
			action.payload.forEach( matchedCard => {
				const index = state.list.findIndex( card => card.id === matchedCard?.id );
				if ( index < 0 ) {
					return;
				}
				state.list[ index ].isHidden = true;
			} );

			state.matchedCardsAmount = state.list.filter( card => card.isHidden ).length;
		} )
		.addCase( showAllHiddenCards, ( state ) => {
			state.list.forEach( card => {
				card.isHidden = false;
				card.isOpen = false;
			} );
			state.matchedCardsAmount = 0;
		} );
} );
