import { createReducer, PayloadAction } from '@reduxjs/toolkit';
import {
	closeOpenedCards,
	hideMatchedCards,
	openCard,
	showAllHiddenCards,
	shuffleCards,
} from '../actions/cardsActions';
import { ICard, ICardsState } from '../../types/cards';
import { IMatchState } from '../../types/match';

// Функция для создания начального состояния
const createInitialCardsState = (): ICardsState => {
	const imagePath = process.env.NODE_ENV === 'production' && typeof window !== 'undefined' ? './' : '/'
	const img_1 = imagePath + 'images/001-flat.png';
	const img_2 = imagePath + 'images/001-viburnum-fruit.png';
	const img_3 = imagePath + 'images/002-oranges.png';
	const img_4 = imagePath + 'images/002-organic.png';
	const img_5 = imagePath + 'images/003-organic.png';
	const img_6 = imagePath + 'images/003-raspberry-pi.png';
	const img_7 = imagePath + 'images/004-vegetables.png';
	const img_8 = imagePath + 'images/004-viburnum-fruit.png';
	const img_9 = imagePath + 'images/005-healthy-food.png';
	const img_10 = imagePath + 'images/005-vegetables.png';
	const img_11 = imagePath + 'images/006-healthy.png';
	const img_12 = imagePath + 'images/006-vegetal-oil.png';
	const img_13 = imagePath + 'images/007-organic-1.png';
	const img_14 = imagePath + 'images/008-fattening.png';
	const img_15 = imagePath + 'images/008-organic-2.png';
	const img_16 = imagePath + 'images/009-cucumbers.png';
	const img_17 = imagePath + 'images/009-organic-2.png';
	const img_18 = imagePath + 'images/010-healthy-food-1.png';

	const cardList: ICard[] = [
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
	];

	return {
		list: cardList,
		matchedCardsAmount: 0,
	};
};

export const cardsReducer = createReducer(
	createInitialCardsState(),
	(builder) => {
		builder
			.addCase(shuffleCards, (state) => {
				try {
					let currentIndex = state.list.length;
					let randomIndex;
					const { list } = state;

					while (currentIndex !== 0) {
						randomIndex = Math.floor(Math.random() * currentIndex);
						currentIndex--;
						[list[currentIndex], list[randomIndex]] = [list[randomIndex], list[currentIndex]];
					}
				} catch (error) {
					console.error('Error in shuffleCards reducer:', error);
				}
			})
			.addCase(openCard, (state, action: PayloadAction<number>) => {
				try {
					const cardId = action.payload;
					const card = state.list.find(card => card.id === cardId);
					if (card) {
						card.isOpen = true;
					}
				} catch (error) {
					console.error('Error in openCard reducer:', error);
				}
			})
			.addCase(closeOpenedCards, (state, action: PayloadAction<IMatchState>) => {
				try {
					const cardsToClose = action.payload;
					cardsToClose.forEach((matchedCard: ICard | undefined) => {
						if (matchedCard) { // Проверяем, что matchedCard не undefined
							const index = state.list.findIndex(card => card.id === matchedCard.id);
							if (index >= 0) {
								state.list[index].isOpen = false;
							}
						}
					});
				} catch (error) {
					console.error('Error in closeOpenedCards reducer:', error);
				}
			})
			.addCase(hideMatchedCards, (state, action: PayloadAction<IMatchState>) => {
				try {
					const matchedCards = action.payload;
					matchedCards.forEach((matchedCard: ICard | undefined) => {
						if (matchedCard) { // Проверяем, что matchedCard не undefined
							const index = state.list.findIndex(card => card.id === matchedCard.id);
							if (index >= 0) {
								state.list[index].isHidden = true;
							}
						}
					});
					state.matchedCardsAmount = state.list.filter(card => card.isHidden).length;
				} catch (error) {
					console.error('Error in hideMatchedCards reducer:', error);
				}
			})
			.addCase(showAllHiddenCards, (state) => {
				try {
					state.list.forEach(card => {
						card.isHidden = false;
						card.isOpen = false;
					});
					state.matchedCardsAmount = 0;
				} catch (error) {
					console.error('Error in showAllHiddenCards reducer:', error);
				}
			});
	}
);
