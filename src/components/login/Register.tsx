import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
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

const useStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));

type InputPropsType = {
  setIsLoginModal: (arg: boolean) => void;
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
  setRegEmail: (arg: string) => void;
  setRegPassword: (arg: string) => void;
  setRegRepeatPassword: (arg: string) => void;
  registration: (arg0: string, arg1: string, arg2: string) => void;
  setIsRegistered: (arg0: boolean) => void;
};

type PropsType = InputPropsType & MapStatePropsType & MapDispatchPropsType;

const Register: React.FC<PropsType> = (props): JSX.Element => {
  const classes = useStyles();
  const {
    setIsLoginModal,
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

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegEmail(e.target.value);
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegPassword(e.target.value);
  };

  const repeatPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRegRepeatPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.registration(regEmail, regPassword, regRepeatPassword);
  };

  const handleSubmitVerify = () => {
    setModal(false);
    setTimeout(() => {
      setIsRegistered(false);
      setIsLoginModal(true);
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
            />
            <TextField
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
            />
            <TextField
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
            <Button size="small" onClick={() => setIsLoginModal(true)}>
              &lt;- Return to login page
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
