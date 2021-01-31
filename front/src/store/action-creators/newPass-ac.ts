import { Dispatch } from 'redux';
import {
  SET_NEW_PASSWORD,
  SET_NEW_REPEAT_PASSWORD,
  SET_NEW_PASS_ERROR,
  SET_NEW_PASS_STATUS,
  SET_NEW_PASS_LOADING,
} from '../actions/newPassActions';
import newPassApi from '../../api/newPass-api';
import { set } from '../../helpers/storage';
import { authActions } from './auth-ac';
import { RESET } from '../actions/settingsActions';

export const newPassActions = {
  setNewPass: (newPass: string) =>
    ({
      type: SET_NEW_PASSWORD,
      payload: { newPass },
    } as const),
  setNewRepeatPass: (newRepeatPass: string) =>
    ({
      type: SET_NEW_REPEAT_PASSWORD,
      payload: { newRepeatPass },
    } as const),
  setNewPassError: (newPassError: string) =>
    ({
      type: SET_NEW_PASS_ERROR,
      payload: { newPassError },
    } as const),
  setNewPassStatus: (newPassStatus: boolean) =>
    ({
      type: SET_NEW_PASS_STATUS,
      payload: { newPassStatus },
    } as const),
  setNewPassLoading: (newPassLoading: boolean) =>
    ({
      type: SET_NEW_PASS_LOADING,
      payload: { newPassLoading },
    } as const),
  reset: () => ({ type: RESET } as const),
};

export const changeOldPassword = (
  password: string,
  repeatPassword: string,
  key: string,
) => async (dispatch: Dispatch) => {
  dispatch(newPassActions.setNewPassLoading(true));
  try {
    const data = await newPassApi.changePass(password, repeatPassword, key);
    if (data.data.success) {
      dispatch(newPassActions.setNewPassStatus(true));
      set('authKey', data.data.payload);
      dispatch(newPassActions.setNewPass(''));
      dispatch(newPassActions.setNewRepeatPass(''));
      setTimeout(() => {
        dispatch(authActions.setInitializeStatus(false));
      }, 5000);
    }
  } catch (e) {
    dispatch(newPassActions.setNewPassError(e.message));
  }
  dispatch(newPassActions.setNewPassLoading(false));
};
