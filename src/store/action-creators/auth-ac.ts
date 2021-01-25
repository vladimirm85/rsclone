import { Dispatch } from 'redux';
import {
  SET_LOGIN_EMAIL,
  SET_LOGIN_PASSWORD,
  SET_AUTH_STATUS,
  SET_AUTH_USER_EMAIL,
  SET_LOGIN_ERROR,
  SET_LOGIN_LOADING,
  SET_MODAL,
  SET_INITIALIZE_STATUS,
  SET_NOTIFY_MODAL,
  SET_USER_AVATAR,
  SET_TOTAL_USER_SCORE,
} from '../actions/authActions';
import authApi from '../../api/auth-api';
import { del, set } from '../../helpers/storage';

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
  setAuthUserEmail: (authEmail: string) =>
    ({
      type: SET_AUTH_USER_EMAIL,
      payload: { authEmail },
    } as const),
  setTotalUserScore: (userTotalScore: number) =>
    ({
      type: SET_TOTAL_USER_SCORE,
      payload: { userTotalScore },
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
  setNotifyModal: (notifyShow: boolean) =>
    ({
      type: SET_NOTIFY_MODAL,
      payload: { notifyShow },
    } as const),
  setUserAvatar: (avatar: string) =>
    ({
      type: SET_USER_AVATAR,
      payload: { avatar },
    } as const),
};

export const authMe = (key: string) => async (dispatch: Dispatch) => {
  try {
    const data = await authApi.me(key);
    if (data.data.success) {
      dispatch(actions.setAuthUserEmail(data.data.payload.email));
      dispatch(actions.setTotalUserScore(data.data.payload.totalScore));
      dispatch(actions.setAuthStatus(true));
    }
  } catch (e) {
    del('authKey');
    dispatch(actions.setAuthStatus(false));
  }
  dispatch(actions.setInitializeStatus(true));
};

export const loginAndSetUserData = (email: string, password: string) => async (
  dispatch: Dispatch,
) => {
  dispatch(actions.setLoading(true));
  try {
    const data = await authApi.login(email, password);
    if (data.data.success) {
      const authKey = data.data.payload;
      set('authKey', authKey);
      dispatch(actions.setInitializeStatus(false));
      dispatch(actions.setLoginError(''));
      dispatch(actions.setPassword(''));
      dispatch(actions.setEmail(''));
    } else {
      dispatch(actions.setLoginError(data.data.message));
    }
  } catch (e) {
    dispatch(actions.setLoginError(e.message));
  }
  dispatch(actions.setLoading(false));
};

export const loadAvatar = (
  photoFile: string | ArrayBuffer | null | undefined,
  key: string,
) => async (dispatch: Dispatch) => {
  try {
    const data = await authApi.savePhoto(photoFile, key);
  } catch (e) {
    console.log(e.message);
  }
};
