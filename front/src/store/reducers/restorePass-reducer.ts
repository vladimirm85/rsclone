import {
  SET_RESTORE_EMAIL,
  SET_RESTORE_LOADING,
  SET_RESTORE_ERROR,
  SET_RESTORE_STATUS,
} from '../actions/restorePassActions';
import { restoreActions } from '../action-creators/restorePass-ac';
import { RESET } from '../actions/settingsActions';
import { RESET_FORM } from '../actions/authActions';

const initialState = {
  restoreEmail: '',
  restoreError: '',
  isRestored: false,
  isLoading: false,
};

type InitialStateType = typeof initialState;

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

type ActionTypes = ReturnType<InferValueTypes<typeof restoreActions>>;

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
    case RESET_FORM:
      return {
        ...state,
        restoreEmail: '',
        restoreError: '',
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export default restoreReducer;
