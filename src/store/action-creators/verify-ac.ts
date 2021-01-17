import {
  SET_LOADING_STATUS,
  SET_VERIFY_STATUS,
} from '../actions/verifyActions';
import verifyApi from '../../api/verify-api';

export const actions = {
  setLoading: (data: boolean) =>
    ({
      type: SET_LOADING_STATUS,
      payload: data,
    } as const),
  setVerifyStatus: (data: boolean) =>
    ({
      type: SET_VERIFY_STATUS,
      payload: data,
    } as const),
};

export const verifyEmail = (key: string) => async (dispatch: any) => {
  dispatch(actions.setLoading(true));
  try {
    const data = await verifyApi.verifyEmail(key);
    if (data.data.success) {
      dispatch(actions.setVerifyStatus(true));
    } else {
      dispatch(actions.setVerifyStatus(false));
    }
  } catch (e) {
    throw new Error(e);
  }
  dispatch(actions.setLoading(false));
};
