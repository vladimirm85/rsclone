import { SAVE_GAME, SAVE_SCORE } from '../actions/testActions';
import * as testActions from '../action-creators/test-ac';

const initialState = {
  saves: ['hello'] as Array<string>,
  score: ['123'] as Array<string>,
};

type InitialStateType = typeof initialState;

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

type ActionTypes = ReturnType<InferValueTypes<typeof testActions>>;

const testReducer = (
  state = initialState,
  action: ActionTypes,
): InitialStateType => {
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

export default testReducer;
