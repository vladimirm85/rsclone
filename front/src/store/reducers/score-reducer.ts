import {
  SET_TOTAL_SCORE,
  SET_LEVEL_SCORE,
  SET_SCORE_ERROR,
  SET_SCORE_LOADING,
} from '../actions/scoreActions';
import { scoreActions } from '../action-creators/score-ac';
import { ScoreType } from '../../types/types';
import { RESET } from '../actions/settingsActions';

const initialState = {
  totalScore: [] as Array<ScoreType>,
  levelScore: [] as Array<ScoreType>,
  scoreError: '',
  isScoreLoading: false,
};

type InitialStateType = typeof initialState;

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

type ActionTypes = ReturnType<InferValueTypes<typeof scoreActions>>;

const scoreReducer = (
  state = initialState,
  action: ActionTypes,
): InitialStateType => {
  switch (action.type) {
    case SET_TOTAL_SCORE:
      return {
        ...state,
        totalScore: action.payload,
      };
    case SET_LEVEL_SCORE:
      return {
        ...state,
        levelScore: action.payload,
      };
    case SET_SCORE_ERROR:
    case SET_SCORE_LOADING:
      return {
        ...state,
        ...action.payload,
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export default scoreReducer;
