import { SAVE_GAME, SAVE_SCORE } from '../actions/testActions';

const initialState = {
  saves: ['hello'] as Array<string>,
  score: ['123'] as Array<string>,
};

type InitialStateType = typeof initialState;

const testReducer = (state = initialState, action: any): InitialStateType => {
  switch (action.type) {
    case SAVE_GAME:
      return {
        ...state,
        saves: [...state.saves, action.payload],
      };
    case SAVE_SCORE:
      return {
        ...state,
        score: [...state.score, action.payload],
      };
    default:
      return state;
  }
};

export const actionCreators = {
  saveGame: (data: string) => ({ type: SAVE_GAME, payload: data } as const),
  saveScore: (data: string) => ({ type: SAVE_SCORE, payload: data } as const),
};

export default testReducer;
