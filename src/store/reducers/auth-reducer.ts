import {
  SET_LOGIN_PASSWORD,
  SET_LOGIN_EMAIL,
  SET_AUTH_STATUS,
  SET_AUTH_USER_DATA,
  SET_LOGIN_ERROR,
  SET_LOGIN_LOADING,
  SET_MODAL,
  SET_INITIALIZE_STATUS,
  SET_AUTH_KEY,
} from '../actions/authActions';
import { actions } from '../action-creators/auth-ac';

const initialState = {
  email: '',
  password: '',
  isAuth: false,
  authEmail: '',
  loginError: '',
  isLoading: false,
  isModalOpen: false,
  isInitialized: false,
  userScore: 0,
  authKey: '',
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
    case SET_AUTH_USER_DATA:
    case SET_AUTH_KEY:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
