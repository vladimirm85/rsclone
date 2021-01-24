import {
  SET_NEW_PASSWORD,
  SET_NEW_REPEAT_PASSWORD,
  SET_NEW_PASS_ERROR,
  SET_NEW_PASS_STATUS,
  SET_NEW_PASS_LOADING,
} from '../actions/newPassActions';
import { actions } from '../action-creators/newPass-ac';

const initialState = {
  newPass: '',
  newRepeatPass: '',
  newPassError: '',
  newPassStatus: false,
  newPassLoading: false,
};

type InitialStateType = typeof initialState;

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>;

const newPassReducer = (
  state = initialState,
  action: ActionTypes,
): InitialStateType => {
  switch (action.type) {
    case SET_NEW_PASSWORD:
    case SET_NEW_REPEAT_PASSWORD:
    case SET_NEW_PASS_ERROR:
    case SET_NEW_PASS_STATUS:
    case SET_NEW_PASS_LOADING:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default newPassReducer;
