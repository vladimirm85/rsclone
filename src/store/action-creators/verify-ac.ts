import { Dispatch } from 'redux';
import {
  SET_VERIFY_LOADING_STATUS,
  SET_VERIFY_STATUS,
  SET_VERIFY_ERROR,
} from '../actions/verifyActions';
import verifyApi from '../../api/verify-api';
import { set } from '../../helpers/storage';
import { actions as authActions } from './auth-ac';

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
  setVerifyError: (verifyError: string) =>
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
      const authKey = data.data.payload;
      set('authKey', authKey);
      dispatch(actions.setVerifyStatus(true));
      setTimeout(() => {
        dispatch(authActions.setInitializeStatus(false));
      }, 5000);
    } else {
      dispatch(actions.setVerifyError(data.data.message));
    }
  } catch (e) {
    dispatch(actions.setVerifyError(e.message));
  }
  dispatch(actions.setLoading(false));
};
