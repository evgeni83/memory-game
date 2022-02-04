import { CardsActionsTypes, ICard } from '../../types/cards';
import { IMatchState } from '../../types/match';

export const shuffleCards = () => {
	return { type: CardsActionsTypes.SHUFFLE };
};

export const openCard = ( id: number ) => {
	return { type: CardsActionsTypes.OPEN, payload: id };
};

export const hideMatchedCards = ( payload: IMatchState ) => {
	return { type: CardsActionsTypes.HIDE_MATCHED, payload };
};

export const closeAllCards = () => {
	return { type: CardsActionsTypes.CLOSE_ALL };
};
