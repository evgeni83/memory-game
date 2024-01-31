import { ICard } from './cards';

export enum MatchActionsTypes {
	ADD_CARD = 'ADD_CARD',
	CLEAN = 'CLEAN'
}

export type IMatchState = [ ICard?, ICard? ]
