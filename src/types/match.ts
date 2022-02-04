import { ICard } from './cards';

export enum MatchActionsTypes {
	ADD_CARD = 'ADD_CARD',
	REMOVE_CARD = 'REMOVE_CARD',
	CLEAN = 'CLEAN'
}

export type IMatchState = [ ICard?, ICard? ]

interface IAddCardToMatch {
	type: MatchActionsTypes.ADD_CARD;
	payload: ICard;
}

interface IRemoveCardFromMatch {
	type: MatchActionsTypes.REMOVE_CARD;
	payload: ICard;
}

interface ICleanMatch {
	type: MatchActionsTypes.CLEAN;
}

export type MatchAction = IAddCardToMatch | IRemoveCardFromMatch | ICleanMatch;
