import {
	CardsActionsTypes,
	ICloseOpened,
	IHideMatched,
	IOpenCard,
	IShowAllHidden,
	IShuffleCards,
} from '../../types/cards';
import { IMatchState } from '../../types/match';

export const shuffleCards = (): IShuffleCards => {
	return { type: CardsActionsTypes.SHUFFLE };
};

export const openCard = ( id: number ): IOpenCard => {
	return { type: CardsActionsTypes.OPEN, payload: id };
};

export const hideMatchedCards = ( payload: IMatchState ): IHideMatched => {
	return { type: CardsActionsTypes.HIDE_MATCHED, payload };
};

export const closeOpenedCards = ( payload: IMatchState ): ICloseOpened => {
	return { type: CardsActionsTypes.CLOSE_OPENED, payload };
};

export const showAllHiddenCards = (): IShowAllHidden => {
	return { type: CardsActionsTypes.SHOW_ALL_HIDDEN };
};
