import { Dispatch } from 'redux';
import {
  SET_LOGIN_EMAIL,
  SET_LOGIN_PASSWORD,
  SET_AUTH_STATUS,
  SET_AUTH_EMAIL,
  SET_LOGIN_ERROR,
  SET_LOGIN_LOADING,
  SET_MODAL,
  SET_INITIALIZE_STATUS,
} from '../actions/authActions';
import authApi from '../../api/auth-api';
import { set } from '../../helpers/storage';

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
  setLoading: (isLoading: boolean) =>
    ({
      type: SET_LOGIN_LOADING,
      payload: { isLoading },
    } as const),
  setLoginError: (loginError: string) =>
    ({
      type: SET_LOGIN_ERROR,
      payload: { loginError },
    } as const),
  setModal: (isModalOpen: boolean) =>
    ({
      type: SET_MODAL,
      payload: { isModalOpen },
    } as const),
  setInitializeStatus: (isInitialized: boolean) =>
    ({
      type: SET_INITIALIZE_STATUS,
      payload: { isInitialized },
    } as const),
};

export const loginAndSetUserData = (email: string, password: string) => async (
  dispatch: Dispatch,
) => {
  dispatch(actions.setLoading(true));
  try {
    const data = await authApi.login(email, password);
    if (data.data.success) {
      set('authKey', data.data.payload);
      dispatch(actions.setAuthEmail(email));
      dispatch(actions.setAuthStatus(true));
      dispatch(actions.setLoginError(''));
      dispatch(actions.setPassword(''));
      dispatch(actions.setEmail(''));
    } else {
      dispatch(actions.setAuthStatus(false));
    }
  } catch (e) {
    dispatch(actions.setLoginError(e.message));
  }
  dispatch(actions.setLoading(false));
};

export const authMe = (key: string) => async (dispatch: Dispatch) => {
  dispatch(actions.setInitializeStatus(false));
  const data = await authApi.me(key);
  if (data.data.success) {
    dispatch(actions.setAuthEmail(data.data.payload.email));
    dispatch(actions.setAuthStatus(true));
  } else {
    dispatch(actions.setAuthStatus(false));
  }
  dispatch(actions.setInitializeStatus(true));
};
