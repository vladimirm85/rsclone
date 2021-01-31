import { Dispatch } from 'redux';
import {
  SET_RESTORE_EMAIL,
  SET_RESTORE_LOADING,
  SET_RESTORE_ERROR,
  SET_RESTORE_STATUS,
} from '../actions/restorePassActions';
import restorePassApi from '../../api/restorePass-api';
import { RESET } from '../actions/settingsActions';

export const restoreActions = {
  setRestoreEmail: (restoreEmail: string) =>
    ({
      type: SET_RESTORE_EMAIL,
      payload: { restoreEmail },
    } as const),
  setRestoreError: (restoreError: string) =>
    ({
      type: SET_RESTORE_ERROR,
      payload: { restoreError },
    } as const),
  setIsRestored: (isRestored: boolean) =>
    ({
      type: SET_RESTORE_STATUS,
      payload: { isRestored },
    } as const),
  setLoading: (isLoading: boolean) =>
    ({
      type: SET_RESTORE_LOADING,
      payload: { isLoading },
    } as const),
  reset: () => ({ type: RESET } as const),
};

export const restore = (email: string) => async (dispatch: Dispatch) => {
  dispatch(restoreActions.setLoading(true));
  try {
    const data = await restorePassApi.restore(email);
    if (data.data.success) {
      dispatch(restoreActions.setIsRestored(true));
      dispatch(restoreActions.setRestoreEmail(''));
    }
  } catch (e) {
    dispatch(restoreActions.setRestoreError(e.message));
  }
  dispatch(restoreActions.setLoading(false));
};
