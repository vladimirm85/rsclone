import {
  SET_REG_EMAIL,
  SET_REG_PASSWORD,
  SET_REG_REPEAT_PASSWORD,
  SET_REG_ERROR,
  SET_REG_STATUS,
  SET_REG_LOADING,
} from '../actions/registrationActions';
import { registerActions } from '../action-creators/registration-ac';
import { RESET } from '../actions/settingsActions';
import { RESET_FORM } from '../actions/authActions';

const initialState = {
  regEmail: '',
  regPassword: '',
  regRepeatPassword: '',
  regError: '',
  isLoading: false,
  isRegistered: false,
};

type InitialStateType = typeof initialState;

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

type ActionTypes = ReturnType<InferValueTypes<typeof registerActions>>;

const regReducer = (
  state = initialState,
  action: ActionTypes,
): InitialStateType => {
  switch (action.type) {
    case SET_REG_EMAIL:
    case SET_REG_PASSWORD:
    case SET_REG_REPEAT_PASSWORD:
    case SET_REG_ERROR:
    case SET_REG_STATUS:
    case SET_REG_LOADING:
      return {
        ...state,
        ...action.payload,
      };
    case RESET_FORM:
      return {
        ...state,
        regEmail: '',
        regPassword: '',
        regRepeatPassword: '',
        regError: '',
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export default regReducer;
