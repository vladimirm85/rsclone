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
import { RESET } from '../actions/settingsActions';
import { gameActions } from './game-ac';

export const authActions = {
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
  reset: () => ({ type: RESET } as const),
};

export const authMe = (key: string) => async (dispatch: Dispatch) => {
  try {
    const data = await authApi.me(key);
    if (data.data.success) {
      dispatch(authActions.setAuthUserEmail(data.data.payload.email));
      dispatch(authActions.setTotalUserScore(data.data.payload.totalScore));
      dispatch(authActions.setUserAvatar(data.data.payload.avatar));
      dispatch(authActions.setAuthStatus(true));
    }
  } catch (e) {
    del('authKey');
    dispatch(authActions.setAuthStatus(false));
  }
  dispatch(authActions.setInitializeStatus(true));
};

export const loginAndSetUserData = (email: string, password: string) => async (
  dispatch: Dispatch,
) => {
  dispatch(authActions.setLoading(true));
  dispatch(authActions.setShowResendButton(false));
  dispatch(authActions.setLoginError(''));
  try {
    const data = await authApi.login(email, password);
    if (data.data.success) {
      const authKey = data.data.payload;
      set('authKey', authKey);
      dispatch(gameActions.startGame(false));
      dispatch(gameActions.cancelFrame());
      dispatch(authActions.setInitializeStatus(false));
      dispatch(authActions.setLoginError(''));
      dispatch(authActions.setPassword(''));
      dispatch(authActions.setEmail(''));
    }
  } catch (e) {
    const errorMessage = e.message;
    if (errorMessage.includes(409) || errorMessage.includes(422)) {
      dispatch(authActions.setLoginError('Incorrect email or password.'));
    } else if (errorMessage.includes(401)) {
      dispatch(authActions.setLoginError('Account not verified.'));
      dispatch(authActions.setShowResendButton(true));
    } else {
      dispatch(authActions.setLoginError(errorMessage));
    }
  }
  dispatch(authActions.setLoading(false));
};

export const loadAvatar = (
  photoFile: string | ArrayBuffer | null | undefined,
  key: string,
) => async (dispatch: Dispatch) => {
  dispatch(authActions.setAvatarError(''));
  try {
    const data = await authApi.savePhoto(photoFile, key);
    if (data.data.success) {
      dispatch(authActions.setUserAvatar(data.data.payload.avatar));
    }
    if (data.data.statusCode === 404) {
      dispatch(authActions.setAvatarError('File is too big!'));
    }
  } catch (e) {
    dispatch(authActions.setAvatarError(e.message));
  }
};

export const resendVerifyEmail = (email: string) => async (
  dispatch: Dispatch,
) => {
  try {
    const data = await authApi.sendVerifyEmail(email);
    if (data.data.success) {
      dispatch(authActions.setShowResendButton(false));
      dispatch(
        authActions.setLoginError('Verification email sent, check your mail.'),
      );
    }
  } catch (e) {
    dispatch(authActions.setLoginError(e.message));
  }
};
