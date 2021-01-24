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
import { actions as authActions } from './auth-ac';

export const actions = {
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
};

export const changeOldPassword = (
  password: string,
  repeatPassword: string,
  key: string,
) => async (dispatch: Dispatch) => {
  dispatch(actions.setNewPassLoading(true));
  try {
    const data = await newPassApi.changePass(password, repeatPassword, key);
    if (data.data.success) {
      dispatch(actions.setNewPassStatus(true));
      set('authKey', data.data.payload);
      dispatch(actions.setNewPass(''));
      dispatch(actions.setNewRepeatPass(''));
      setTimeout(() => {
        dispatch(authActions.setInitializeStatus(false));
      }, 5000);
    } else {
      dispatch(actions.setNewPassStatus(false));
    }
  } catch (e) {
    dispatch(actions.setNewPassError(e.message));
  }
  dispatch(actions.setNewPassLoading(false));
};
