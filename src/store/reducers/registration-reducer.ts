import {
  SET_REG_EMAIL,
  SET_REG_PASSWORD,
  SET_REG_REPEAT_PASSWORD,
  SET_REG_ERROR,
} from '../actions/registrationActions';
import { actions } from '../action-creators/registration-ac';

const initialState = {
  regEmail: '',
  regPassword: '',
  regRepeatPassword: '',
};

type InitialStateType = typeof initialState;

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>;

const regReducer = (
  state = initialState,
  action: ActionTypes,
): InitialStateType => {
  switch (action.type) {
    case SET_REG_EMAIL:
    case SET_REG_PASSWORD:
    case SET_REG_REPEAT_PASSWORD:
    case SET_REG_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default regReducer;
