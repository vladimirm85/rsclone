import { Dispatch } from 'redux';
import {
  SET_USER_SCORE,
  SET_USER_SCORE_ERROR,
  SET_USER_SCORE_LOADING,
  RESET,
} from '../actions/settingsActions';
import scoreApi from '../../api/score-api';
import { ScoreType } from '../../types/types';

export const settingsActions = {
  setUserScore: (userScore: Array<ScoreType>) =>
    ({
      type: SET_USER_SCORE,
      payload: { userScore },
    } as const),
  setUserScoreError: (userScoreError: string) =>
    ({
      type: SET_USER_SCORE_ERROR,
      payload: { userScoreError },
    } as const),
  setUserScoreLoading: (userScoreLoading: boolean) =>
    ({
      type: SET_USER_SCORE_LOADING,
      payload: { userScoreLoading },
    } as const),
  reset: () => ({ type: RESET } as const),
};

export const loadUserScore = (
  key: string,
  lvl: number,
  forUser: number,
) => async (dispatch: Dispatch) => {
  dispatch(settingsActions.setUserScoreLoading(true));
  try {
    dispatch(settingsActions.setUserScoreError(''));
    const data = await scoreApi.getLevelScore(key, lvl, 100, forUser);
    if (data.data.success) {
      if (data.data.payload.length === 0) {
        dispatch(settingsActions.setUserScoreError('No results yet'));
      } else {
        dispatch(settingsActions.setUserScore(data.data.payload));
      }
    }
  } catch (e) {
    dispatch(settingsActions.setUserScoreError(e.message));
  }
  dispatch(settingsActions.setUserScoreLoading(false));
};
