import { SAVE_GAME, SAVE_SCORE } from '../actions/testActions';

export const saveGameAC = (data: string) =>
  ({ type: SAVE_GAME, payload: data } as const);

export const saveScore = (data: string) =>
  ({ type: SAVE_SCORE, payload: data } as const);
