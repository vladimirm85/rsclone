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
  SET_AVATAR_ERROR,
  SET_SHOW_RESEND_BUTTON,
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
  setUserAvatar: (avatar: string | ArrayBuffer | null | undefined) =>
    ({
      type: SET_USER_AVATAR,
      payload: { avatar },
    } as const),
  setAvatarError: (avatarError: string) =>
    ({
      type: SET_AVATAR_ERROR,
      payload: { avatarError },
    } as const),
  setShowResendButton: (isResendButtonShow: boolean) =>
    ({
      type: SET_SHOW_RESEND_BUTTON,
      payload: { isResendButtonShow },
    } as const),
};

export const authMe = (key: string) => async (dispatch: Dispatch) => {
  try {
    const data = await authApi.me(key);
    if (data.data.success) {
      dispatch(actions.setAuthUserEmail(data.data.payload.email));
      dispatch(actions.setTotalUserScore(data.data.payload.totalScore));
      dispatch(actions.setUserAvatar(data.data.payload.avatar));
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
  dispatch(actions.setShowResendButton(false));
  dispatch(actions.setLoginError(''));
  try {
    const data = await authApi.login(email, password);
    if (data.data.success) {
      const authKey = data.data.payload;
      set('authKey', authKey);
      dispatch(actions.setInitializeStatus(false));
      dispatch(actions.setLoginError(''));
      dispatch(actions.setPassword(''));
      dispatch(actions.setEmail(''));
    }
  } catch (e) {
    const errorMessage = e.message;
    if (errorMessage.includes(409) || errorMessage.includes(422)) {
      dispatch(actions.setLoginError('Incorrect email or password.'));
    } else if (errorMessage.includes(401)) {
      dispatch(actions.setLoginError('Account not verified.'));
      dispatch(actions.setShowResendButton(true));
    } else {
      dispatch(actions.setLoginError(errorMessage));
    }
  }
  dispatch(actions.setLoading(false));
};

export const loadAvatar = (
  photoFile: string | ArrayBuffer | null | undefined,
  key: string,
) => async (dispatch: Dispatch) => {
  dispatch(actions.setAvatarError(''));
  try {
    const data = await authApi.savePhoto(photoFile, key);
    if (data.data.success) {
      dispatch(actions.setUserAvatar(data.data.payload.avatar));
    }
    if (data.data.statusCode === 404) {
      dispatch(actions.setAvatarError('File should be < 76 kilobytes.'));
    }
  } catch (e) {
    dispatch(actions.setAvatarError(e.message));
  }
};

export const resendVerifyEmail = (email: string) => async (
  dispatch: Dispatch,
) => {
  try {
    const data = await authApi.sendVerifyEmail(email);
    console.log(data);
  } catch (e) {
    dispatch(actions.setLoginError(e.message));
  }
};
