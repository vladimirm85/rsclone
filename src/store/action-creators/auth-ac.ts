import {
  SET_EMAIL,
  SET_PASSWORD,
  SET_AUTH_STATUS,
  SET_AUTH_EMAIL,
  SET_ERROR,
} from '../actions/authActions';
import authApi from '../../api/auth-api';

export const actions = {
  setEmail: (email: string) =>
    ({
      type: SET_EMAIL,
      payload: email,
    } as const),
  setPassword: (password: string) =>
    ({
      type: SET_PASSWORD,
      payload: password,
    } as const),
  setAuthStatus: (isAuth: boolean) =>
    ({
      type: SET_AUTH_STATUS,
      payload: isAuth,
    } as const),
  setAuthEmail: (email: string) =>
    ({
      type: SET_AUTH_EMAIL,
      payload: email,
    } as const),
  setError: (error: string) =>
    ({
      type: SET_ERROR,
      payload: error,
    } as const),
};

export const loginAndSetUserData = (email: string, password: string) => async (
  dispatch: any,
) => {
  try {
    const data = await authApi.login(email, password);
    if (data.data.success) {
      dispatch(actions.setAuthEmail(email));
      dispatch(actions.setAuthStatus(true));
      dispatch(actions.setError(''));
    } else {
      dispatch(actions.setAuthStatus(false));
    }
  } catch (e) {
    dispatch(actions.setError(e.message));
  }
};
