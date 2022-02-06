import { ICard } from '../../types/cards';
import { IAddCardToMatch, ICleanMatch, MatchActionsTypes } from '../../types/match';

export const addToMatch = ( card: ICard ): IAddCardToMatch => {
	return { type: MatchActionsTypes.ADD_CARD, payload: card };
};

export const cleanMatch = (): ICleanMatch => {
	return { type: MatchActionsTypes.CLEAN };
};
