import {
  SET_USER_SCORE,
  SET_USER_SCORE_ERROR,
  SET_USER_SCORE_LOADING,
} from '../actions/settingsActions';
import { actions } from '../action-creators/settings-ac';
import { ScoreType } from '../../types/types';

const initialState = {
  userScore: [] as Array<ScoreType>,
  userScoreError: '',
  userScoreLoading: false,
};

type InitialStateType = typeof initialState;

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>;

const settingsReducer = (
  state = initialState,
  action: ActionTypes,
): InitialStateType => {
  switch (action.type) {
    case SET_USER_SCORE:
    case SET_USER_SCORE_ERROR:
    case SET_USER_SCORE_LOADING:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default settingsReducer;
