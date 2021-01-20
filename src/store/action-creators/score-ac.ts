import { Dispatch } from 'redux';
import { SET_TOTAL_SCORE, SET_LEVEL_SCORE } from '../actions/scoreActions';
import scoreApi from '../../api/score-api';

export const actions = {
  setTotalScore: (totalScore: any) =>
    ({
      type: SET_TOTAL_SCORE,
      payload: { totalScore },
    } as const),
  setLevelScore: (levelScore: any) =>
    ({
      type: SET_LEVEL_SCORE,
      payload: { levelScore },
    } as const),
};

export const getAndSetTotalScore = (key: string) => async (
  dispatch: Dispatch,
) => {
  try {
    const data = await scoreApi.getTotalScore(key, 10);
    dispatch(actions.setTotalScore(data.data.payload));
  } catch (e) {
    console.log(e.message);
  }
};

export const getAndSetLevelScore = (key: string, lvl: number) => async (
  dispatch: Dispatch,
) => {
  try {
    const data = await scoreApi.getLevelScore(key, lvl, 10);
    dispatch(actions.setLevelScore(data.data.payload));
  } catch (e) {
    console.log(e.message);
  }
};
