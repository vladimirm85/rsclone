import { Dispatch } from 'redux';
import {
  SET_VERIFY_LOADING_STATUS,
  SET_VERIFY_STATUS,
  SET_VERIFY_ERROR,
} from '../actions/verifyActions';
import verifyApi from '../../api/verify-api';

export const actions = {
  setLoading: (isLoading: boolean) =>
    ({
      type: SET_VERIFY_LOADING_STATUS,
      payload: { isLoading },
    } as const),
  setVerifyStatus: (isVerify: boolean) =>
    ({
      type: SET_VERIFY_STATUS,
      payload: { isVerify },
    } as const),
  setError: (verifyError: string) =>
    ({
      type: SET_VERIFY_ERROR,
      payload: { verifyError },
    } as const),
};

export const verifyEmail = (key: string) => async (dispatch: Dispatch) => {
  dispatch(actions.setLoading(true));
  try {
    const data = await verifyApi.verifyEmail(key);
    if (data.data.success) {
      dispatch(actions.setVerifyStatus(true));
      dispatch(actions.setError(''));
    } else {
      dispatch(actions.setVerifyStatus(false));
    }
  } catch (e) {
    dispatch(actions.setError(e.message));
  }
  dispatch(actions.setLoading(false));
};
