import { ICard } from './cards';

export enum MatchActionsTypes {
	ADD_CARD = 'ADD_CARD',
	CLEAN = 'CLEAN'
}

export type IMatchState = [ ICard?, ICard? ]

export interface IAddCardToMatch {
	type: MatchActionsTypes.ADD_CARD;
	payload: ICard;
}

export interface ICleanMatch {
	type: MatchActionsTypes.CLEAN;
}

export type MatchAction = IAddCardToMatch | ICleanMatch;
