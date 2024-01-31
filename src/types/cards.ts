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
