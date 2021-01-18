import {
  SET_LOGIN_PASSWORD,
  SET_LOGIN_EMAIL,
  SET_AUTH_STATUS,
  SET_AUTH_EMAIL,
  SET_LOGIN_ERROR,
} from '../actions/authActions';
import { actions } from '../action-creators/auth-ac';

const initialState = {
  email: '',
  password: '',
  isAuth: false,
  authEmail: '',
  error: '',
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
    case SET_AUTH_EMAIL:
    case SET_LOGIN_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
