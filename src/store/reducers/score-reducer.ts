import { SET_TOTAL_SCORE, SET_LEVEL_SCORE } from '../actions/scoreActions';
import { actions } from '../action-creators/score-ac';

const initialState = {
  totalScore: [],
  levelScore: [],
};

type InitialStateType = typeof initialState;

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>;

const scoreReducer = (
  state = initialState,
  action: ActionTypes,
): InitialStateType => {
  switch (action.type) {
    case SET_TOTAL_SCORE:
    case SET_LEVEL_SCORE:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default scoreReducer;
