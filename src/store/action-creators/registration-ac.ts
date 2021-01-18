import { Dispatch } from 'redux';
import {
  SET_REG_EMAIL,
  SET_REG_PASSWORD,
  SET_REG_REPEAT_PASSWORD,
  SET_REG_ERROR,
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
};

export const registration = (
  email: string,
  password: string,
  repeatPassword: string,
) => async (dispatch: Dispatch) => {
  try {
    const data = await regApi.register(email, password, repeatPassword);
    console.log(data);
  } catch (e) {
    dispatch(actions.setRegError(e.message));
  }
};
