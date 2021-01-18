import { Dispatch } from 'redux';
import {
  SET_LOGIN_EMAIL,
  SET_LOGIN_PASSWORD,
  SET_AUTH_STATUS,
  SET_AUTH_EMAIL,
  SET_LOGIN_ERROR,
} from '../actions/authActions';
import authApi from '../../api/auth-api';

export const actions = {
  setEmail: (email: string) =>
    ({
      type: SET_LOGIN_EMAIL,
      payload: { email },
    } as const),
  setPassword: (password: string) =>
    ({
      type: SET_LOGIN_PASSWORD,
      payload: { password },
    } as const),
  setAuthStatus: (isAuth: boolean) =>
    ({
      type: SET_AUTH_STATUS,
      payload: { isAuth },
    } as const),
  setAuthEmail: (authEmail: string) =>
    ({
      type: SET_AUTH_EMAIL,
      payload: { authEmail },
    } as const),
  setError: (error: string) =>
    ({
      type: SET_LOGIN_ERROR,
      payload: { error },
    } as const),
};

export const loginAndSetUserData = (email: string, password: string) => async (
  dispatch: Dispatch,
) => {
  try {
    const data = await authApi.login(email, password);
    if (data.data.success) {
      dispatch(actions.setAuthEmail(email));
      dispatch(actions.setAuthStatus(true));
      dispatch(actions.setError(''));
      dispatch(actions.setEmail(''));
      dispatch(actions.setPassword(''));
    } else {
      dispatch(actions.setAuthStatus(false));
    }
  } catch (e) {
    dispatch(actions.setError(e.message));
  }
};
