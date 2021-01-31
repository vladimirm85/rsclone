import { Dispatch } from 'redux';
import {
  SET_REG_EMAIL,
  SET_REG_PASSWORD,
  SET_REG_REPEAT_PASSWORD,
  SET_REG_ERROR,
  SET_REG_STATUS,
  SET_REG_LOADING,
} from '../actions/registrationActions';
import regApi from '../../api/reg-api';
import { RESET } from '../actions/settingsActions';

export const registerActions = {
  setRegEmail: (regEmail: string) =>
    ({
      type: SET_REG_EMAIL,
      payload: { regEmail },
    } as const),
  setRegPassword: (regPassword: string) =>
    ({
      type: SET_REG_PASSWORD,
      payload: { regPassword },
    } as const),
  setRegRepeatPassword: (regRepeatPassword: string) =>
    ({
      type: SET_REG_REPEAT_PASSWORD,
      payload: { regRepeatPassword },
    } as const),
  setRegError: (regError: string) =>
    ({
      type: SET_REG_ERROR,
      payload: { regError },
    } as const),
  setIsRegistered: (isRegistered: boolean) =>
    ({
      type: SET_REG_STATUS,
      payload: { isRegistered },
    } as const),
  setLoading: (isLoading: boolean) =>
    ({
      type: SET_REG_LOADING,
      payload: { isLoading },
    } as const),
  reset: () => ({ type: RESET } as const),
};

export const registration = (
  email: string,
  password: string,
  repeatPassword: string,
) => async (dispatch: Dispatch) => {
  dispatch(registerActions.setLoading(true));
  try {
    const data = await regApi.register(email, password, repeatPassword);
    if (data.data.success) {
      dispatch(registerActions.setIsRegistered(true));
      dispatch(registerActions.setRegEmail(''));
      dispatch(registerActions.setRegPassword(''));
      dispatch(registerActions.setRegRepeatPassword(''));
    }
  } catch (e) {
    dispatch(registerActions.setRegError(e.message));
  }
  dispatch(registerActions.setLoading(false));
};
