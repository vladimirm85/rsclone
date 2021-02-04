import {
  RESET_FORM,
  SET_AUTH_STATUS,
  SET_AUTH_USER_EMAIL,
  SET_AVATAR_ERROR,
  SET_INITIALIZE_STATUS,
  SET_LOGIN_EMAIL,
  SET_LOGIN_ERROR,
  SET_LOGIN_LOADING,
  SET_LOGIN_PASSWORD,
  SET_MODAL,
  SET_NOTIFY_MODAL,
  SET_SHOW_RESEND_BUTTON,
  SET_TOTAL_USER_SCORE,
  SET_USER_AVATAR,
} from '../actions/authActions';
import { authActions } from '../action-creators/auth-ac';
import { RESET } from '../actions/settingsActions';

const initialState = {
  email: '',
  password: '',
  isAuth: false,
  authEmail: '',
  avatar: '' as string | ArrayBuffer | null | undefined,
  loginError: '',
  isLoading: false,
  isModalOpen: false,
  isInitialized: false,
  userTotalScore: 0,
  notifyShow: true,
  avatarError: '',
  isResendButtonShow: false,
};

type InitialStateType = typeof initialState;

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

type ActionTypes = ReturnType<InferValueTypes<typeof authActions>>;

const authReducer = (
  state = initialState,
  action: ActionTypes,
): InitialStateType => {
  switch (action.type) {
    case SET_LOGIN_EMAIL:
    case SET_LOGIN_PASSWORD:
    case SET_AUTH_STATUS:
    case SET_LOGIN_ERROR:
    case SET_LOGIN_LOADING:
    case SET_MODAL:
    case SET_INITIALIZE_STATUS:
    case SET_AUTH_USER_EMAIL:
    case SET_NOTIFY_MODAL:
    case SET_USER_AVATAR:
    case SET_TOTAL_USER_SCORE:
    case SET_AVATAR_ERROR:
    case SET_SHOW_RESEND_BUTTON:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_FORM:
      return {
        ...state,
        email: '',
        password: '',
        loginError: '',
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export default authReducer;
