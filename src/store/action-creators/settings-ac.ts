import { Dispatch } from 'redux';
import {
  SET_USER_SCORE,
  SET_USER_SCORE_ERROR,
  SET_USER_SCORE_LOADING,
} from '../actions/settingsActions';
import scoreApi from '../../api/score-api';
import { ScoreType } from '../../types/types';

export const actions = {
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
};

export const loadUserScore = (
  key: string,
  lvl: number,
  forUser: number,
) => async (dispatch: Dispatch) => {
  dispatch(actions.setUserScoreLoading(true));
  try {
    const data = await scoreApi.getLevelScore(key, lvl, 100, forUser);
    if (data.data.success) {
      dispatch(actions.setUserScore(data.data.payload));
    }
  } catch (e) {
    dispatch(actions.setUserScoreError(e.message));
  }
  dispatch(actions.setUserScoreLoading(false));
};
