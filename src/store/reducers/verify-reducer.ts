import {
  SET_LOADING_STATUS,
  SET_VERIFY_STATUS,
} from '../actions/verifyActions';
import { actions } from '../action-creators/verify-ac';

const initialState = {
  isLoading: false,
  isVerify: false,
};

type InitialStateType = typeof initialState;

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>;

const verifyReducer = (
  state = initialState,
  action: ActionTypes,
): InitialStateType => {
  switch (action.type) {
    case SET_LOADING_STATUS:
      return {
        ...state,
        isLoading: action.payload,
      };
    case SET_VERIFY_STATUS:
      return {
        ...state,
        isVerify: action.payload,
      };
    default:
      return state;
  }
};

export default verifyReducer;
