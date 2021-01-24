import { Dispatch } from 'redux';
import {
  SET_RESTORE_EMAIL,
  SET_RESTORE_LOADING,
  SET_RESTORE_ERROR,
  SET_RESTORE_STATUS,
} from '../actions/restorePassActions';
import restorePassApi from '../../api/restorePass-api';

export const actions = {
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
};

export const restore = (email: string) => async (dispatch: Dispatch) => {
  dispatch(actions.setLoading(true));
  try {
    const data = await restorePassApi.restore(email);
    if (data.data.success) {
      dispatch(actions.setIsRestored(true));
      dispatch(actions.setRestoreEmail(''));
    } else {
      dispatch(actions.setIsRestored(false));
    }
  } catch (e) {
    dispatch(actions.setRestoreError(e.message));
  }
  dispatch(actions.setLoading(false));
};
