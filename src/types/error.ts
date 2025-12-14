// types/error.ts
export interface IErrorAction {
  type: string;
  error: {
    message: string;
  };
}

export interface IActionWithPayload<T> {
  type: string;
  payload: T;
}

export interface IActionWithError {
  type: string;
  error: any;
}