// types/common.ts
export interface IImagePaths {
  original: string;
  webp?: string;
}

export interface ICardEnhanced {
  id: number;
  img: string;
  imgPaths?: IImagePaths;
  isOpen: boolean;
  isHidden: boolean;
}

// Добавим тип для результатов игры
export type GameResult = number; // время в секундах

// Тип для таймера
export interface ITimer {
  seconds: number;
  minutes: number;
  totalSeconds: number;
}