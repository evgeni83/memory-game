import { IMatchState } from './match';

export enum CardsActionsTypes {
	SHUFFLE = 'SHUFFLE',
	OPEN = 'OPEN',
	CLOSE_ALL = 'CLOSE_ALL',
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

interface IShuffleCardsAction {
	type: CardsActionsTypes.SHUFFLE;
}

interface IOpenCardAction {
	type: CardsActionsTypes.OPEN;
	payload: number;
}

interface IHideMatchedAction {
	type: CardsActionsTypes.HIDE_MATCHED;
	payload: IMatchState;
}

interface ICloseAllAction {
	type: CardsActionsTypes.CLOSE_ALL;
}

interface IShowAllHiddenAction {
	type: CardsActionsTypes.SHOW_ALL_HIDDEN;
}

export type CardsAction =
	IShuffleCardsAction
	| IOpenCardAction
	| IHideMatchedAction
	| ICloseAllAction
	| IShowAllHiddenAction;
