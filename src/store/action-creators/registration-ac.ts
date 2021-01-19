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

export const actions = {
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
};

export const registration = (
  email: string,
  password: string,
  repeatPassword: string,
) => async (dispatch: Dispatch) => {
  dispatch(actions.setLoading(true));
  try {
    const data = await regApi.register(email, password, repeatPassword);
    if (data.data.success) {
      dispatch(actions.setIsRegistered(true));
      dispatch(actions.setRegEmail(''));
      dispatch(actions.setRegPassword(''));
      dispatch(actions.setRegRepeatPassword(''));
    } else {
      dispatch(actions.setIsRegistered(false));
    }
  } catch (e) {
    dispatch(actions.setRegError(e.message));
  }
  dispatch(actions.setLoading(false));
};
