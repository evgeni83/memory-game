import { ICard } from '../../types/cards';
import { MatchActionsTypes } from '../../types/match';

export const addToMatch = (card: ICard) => {
	return { type: MatchActionsTypes.ADD_CARD, payload: card };
};

export const cleanMatch = () => {
	return { type: MatchActionsTypes.CLEAN };
};
