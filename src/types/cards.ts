import { IMatchState } from './match';

export enum CardsActionsTypes {
	SHUFFLE = 'SHUFFLE',
	OPEN = 'OPEN',
	CLOSE_OPENED = 'CLOSE_OPENED',
	HIDE_MATCHED = 'HIDE_MATCHED',
	SHOW_ALL_HIDDEN = 'SHOW_ALL_HIDDEN',
}

export interface ICardsState {
	list: Array<ICard>;
	matchedCardsAmount: number;
}

export interface ICard {
	id: number;
	img: string;
	isOpen: boolean;
	isHidden: boolean;
}

export interface IShuffleCards {
	type: CardsActionsTypes.SHUFFLE;
}

export interface IOpenCard {
	type: CardsActionsTypes.OPEN;
	payload: number;
}

export interface IHideMatched {
	type: CardsActionsTypes.HIDE_MATCHED;
	payload: IMatchState;
}

export interface ICloseOpened {
	type: CardsActionsTypes.CLOSE_OPENED;
	payload: IMatchState;
}

export interface IShowAllHidden {
	type: CardsActionsTypes.SHOW_ALL_HIDDEN;
}

export type CardsAction =
	IShuffleCards
	| IOpenCard
	| IHideMatched
	| ICloseOpened
	| IShowAllHidden;
