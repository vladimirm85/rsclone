import React, { useState } from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { AppStateType } from '../../store/store';
import {
  registration,
  actions,
} from '../../store/action-creators/registration-ac';
import AuthPreloader from '../common/Auth-preloader/AuthPreloader';
import { useRegisterStyles } from './style';
import { emailValidator, passValidator } from '../../helpers/validator';

type InputPropsType = {
  setModalType: (arg: 'login' | 'register' | 'restorePass') => void;
  setModal: (arg: boolean) => void;
};

type MapStatePropsType = {
  regEmail: string;
  regPassword: string;
  regRepeatPassword: string;
  regError: string;
  isLoading: boolean;
  isRegistered: boolean;
};

type MapDispatchPropsType = {
  setRegEmail: (email: string) => void;
  setRegPassword: (password: string) => void;
  setRegRepeatPassword: (repeatPassword: string) => void;
  registration: (
    email: string,
    password: string,
    repeatPassword: string,
  ) => void;
  setIsRegistered: (isRegistered: boolean) => void;
};

type PropsType = InputPropsType & MapStatePropsType & MapDispatchPropsType;

const Register: React.FC<PropsType> = (props): JSX.Element => {
  const classes = useRegisterStyles();
  const {
    setModalType,
    regEmail,
    regPassword,
    regRepeatPassword,
    setRegEmail,
    setRegPassword,
    setRegRepeatPassword,
    regError,
    isLoading,
    isRegistered,
    setModal,
    setIsRegistered,
  } = props;

  const [emailValidatorError, setEmailValidatorError] = useState('');
  const [passValidatorError, setPassValidatorError] = useState('');
  const [repeatPassValidatorError, setRepeatPassValidatorError] = useState('');

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmailValidatorError('');
    setRegEmail(e.target.value);
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassValidatorError('');
    setRegPassword(e.target.value);
  };

  const repeatPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatPassValidatorError('');
    setRegRepeatPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const emailValidate = emailValidator(regEmail, setEmailValidatorError);
    const passValidate = passValidator(
      regPassword,
      regRepeatPassword,
      setPassValidatorError,
      setRepeatPassValidatorError,
    );
    if (emailValidate && passValidate) {
      props.registration(regEmail, regPassword, regRepeatPassword);
    }
  };

  const handleSubmitVerify = () => {
    setModal(false);
    setTimeout(() => {
      setIsRegistered(false);
      setModalType('login');
    }, 500);
  };

  return (
    <>
      {!isRegistered ? (
        <>
          <Typography component="h1" variant="h5">
            Create new player
          </Typography>
          <form className={classes.form} noValidate onSubmit={handleSubmit}>
            <TextField
              error={!!emailValidatorError}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="off"
              value={regEmail}
              onChange={emailHandler}
              autoFocus
              helperText={emailValidatorError}
            />
            <TextField
              error={!!passValidatorError}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Password"
              type="password"
              id="password"
              value={regPassword}
              onChange={passwordHandler}
              autoComplete="off"
              helperText={passValidatorError}
            />
            <TextField
              error={!!repeatPassValidatorError}
              variant="outlined"
              margin="normal"
              required
              fullWidth
              name="password"
              label="Repeat password"
              type="password"
              id="repeatPassword"
              value={regRepeatPassword}
              onChange={repeatPasswordHandler}
              autoComplete="off"
              helperText={repeatPassValidatorError}
            />
            {regError && (
              <Typography component="p" variant="subtitle1" color="error">
                {regError}
              </Typography>
            )}
            <Button
              type="submit"
              fullWidth
              variant="contained"
              color="primary"
              className={classes.submit}
              disabled={isLoading}
            >
              {isLoading ? <AuthPreloader /> : 'Register!'}
            </Button>
            <Button size="small" onClick={() => setModalType('login')}>
              Return to login page
            </Button>
          </form>
        </>
      ) : (
        <>
          <Typography
            variant="h5"
            component="h5"
            align="center"
            color="primary"
            paragraph
          >
            Registration successful.
          </Typography>
          <Typography variant="subtitle1" component="p" align="center">
            To activate your account, check your email and follow the
            instructions.
          </Typography>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmitVerify}
          >
            Ok, i will do it!
          </Button>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  regEmail: state.regData.regEmail,
  regPassword: state.regData.regPassword,
  regRepeatPassword: state.regData.regRepeatPassword,
  regError: state.regData.regError,
  isLoading: state.regData.isLoading,
  isRegistered: state.regData.isRegistered,
});

const RegisterW = connect(mapStateToProps, { registration, ...actions })(
  Register,
);

export default RegisterW;
