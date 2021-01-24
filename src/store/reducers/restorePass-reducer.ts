import {
  SET_RESTORE_EMAIL,
  SET_RESTORE_LOADING,
  SET_RESTORE_ERROR,
  SET_RESTORE_STATUS,
} from '../actions/restorePassActions';
import { actions } from '../action-creators/restorePass-ac';

const initialState = {
  restoreEmail: '',
  restoreError: '',
  isRestored: false,
  isLoading: false,
};

type InitialStateType = typeof initialState;

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

type ActionTypes = ReturnType<InferValueTypes<typeof actions>>;

const restoreReducer = (
  state = initialState,
  action: ActionTypes,
): InitialStateType => {
  switch (action.type) {
    case SET_RESTORE_EMAIL:
    case SET_RESTORE_LOADING:
    case SET_RESTORE_ERROR:
    case SET_RESTORE_STATUS:
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default restoreReducer;
