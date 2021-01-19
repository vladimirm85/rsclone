import {
  SET_VERIFY_LOADING_STATUS,
  SET_VERIFY_STATUS,
  SET_VERIFY_ERROR,
} from '../actions/verifyActions';
import { actions } from '../action-creators/verify-ac';

const initialState = {
  isLoading: false,
  isVerify: false,
  verifyError: '',
};

type InitialStateType = typeof initialState;

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>;

const verifyReducer = (
  state = initialState,
  action: ActionTypes,
): InitialStateType => {
  switch (action.type) {
    case SET_VERIFY_LOADING_STATUS:
    case SET_VERIFY_STATUS:
    case SET_VERIFY_ERROR:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default verifyReducer;
