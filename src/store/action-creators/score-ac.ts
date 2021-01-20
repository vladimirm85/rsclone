import { Dispatch } from 'redux';
import {
  SET_TOTAL_SCORE,
  SET_LEVEL_SCORE,
  SET_SCORE_ERROR,
  SET_SCORE_LOADING,
} from '../actions/scoreActions';
import scoreApi from '../../api/score-api';
import { ScoreType } from '../../types/types';

export const actions = {
  setTotalScore: (totalScore: Array<ScoreType>) =>
    ({
      type: SET_TOTAL_SCORE,
      payload: totalScore,
    } as const),
  setLevelScore: (levelScore: Array<ScoreType>) =>
    ({
      type: SET_LEVEL_SCORE,
      payload: levelScore,
    } as const),
  setScoreError: (scoreError: string) =>
    ({
      type: SET_SCORE_ERROR,
      payload: { scoreError },
    } as const),
  setScoreLoading: (isScoreLoading: boolean) =>
    ({
      type: SET_SCORE_LOADING,
      payload: { isScoreLoading },
    } as const),
};

export const getAndSetTotalScore = (key: string) => async (
  dispatch: Dispatch,
) => {
  dispatch(actions.setScoreLoading(true));
  try {
    dispatch(actions.setScoreError(''));
    const data = await scoreApi.getTotalScore(key, 10);
    dispatch(actions.setTotalScore(data.data.payload));
  } catch (e) {
    dispatch(actions.setScoreError(e.message));
  }
  dispatch(actions.setScoreLoading(false));
};

export const getAndSetLevelScore = (key: string, lvl: number) => async (
  dispatch: Dispatch,
) => {
  dispatch(actions.setScoreLoading(true));
  try {
    dispatch(actions.setScoreError(''));
    const data = await scoreApi.getLevelScore(key, lvl, 10);
    dispatch(actions.setLevelScore(data.data.payload));
  } catch (e) {
    dispatch(actions.setScoreError(e.message));
  }
  dispatch(actions.setScoreLoading(false));
};
