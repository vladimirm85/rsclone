import {
  SET_LOGIN_PASSWORD,
  SET_LOGIN_EMAIL,
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
} from '../actions/authActions';
import { actions } from '../action-creators/auth-ac';

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
};

type InitialStateType = typeof initialState;

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>;

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
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
