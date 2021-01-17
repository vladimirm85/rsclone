import {
  SET_PASSWORD,
  SET_EMAIL,
  SET_AUTH_STATUS,
  SET_AUTH_EMAIL,
  SET_ERROR,
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
    case SET_EMAIL:
      return {
        ...state,
        email: action.payload,
      };
    case SET_PASSWORD:
      return {
        ...state,
        password: action.payload,
      };
    case SET_AUTH_STATUS:
      return {
        ...state,
        isAuth: action.payload,
      };
    case SET_AUTH_EMAIL:
      return {
        ...state,
        authEmail: action.payload,
      };
    case SET_ERROR:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default authReducer;
