import React, { useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import { AppStateType } from '../../store/store';
import {
  loginAndSetUserData,
  actions,
} from '../../store/action-creators/auth-ac';
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

type MapStatePropsType = {
  email: string;
  password: string;
  isAuth: boolean;
  error: string;
  isLoading: boolean;
};

type MapDispatchPropsType = {
  loginAndSetUserData: (arg0: string, arg1: string) => void;
  setEmail: (arg: string) => void;
  setPassword: (arg: string) => void;
  setModal: (arg: boolean) => void;
};

type InputPropsType = {
  setIsLoginModal: (arg: boolean) => void;
};

type PropsType = MapStatePropsType & MapDispatchPropsType & InputPropsType;

const Login: React.FC<PropsType> = (props): JSX.Element => {
  const classes = useStyles();
  const {
    setIsLoginModal,
    email,
    password,
    setEmail,
    setPassword,
    setModal,
    isAuth,
    error,
    isLoading,
  } = props;

  useEffect(() => {
    if (isAuth) {
      setModal(false);
    }
  });

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.loginAndSetUserData(email, password);
  };

  return (
    <>
      <Typography component="h1" variant="h5">
        Login
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
          autoComplete="email"
          value={email}
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
          value={password}
          onChange={passwordHandler}
          autoComplete="current-password"
        />
        {error && (
          <Typography component="p" variant="subtitle1" color="error">
            Incorrect email or password.
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
          {isLoading ? <AuthPreloader /> : 'Go!'}
        </Button>
        <Button size="small" onClick={() => setIsLoginModal(false)}>
          Dont have an account? Register -&gt;
        </Button>
      </form>
    </>
  );
};

const mapStateToProps = (state: AppStateType) => {
  return {
    email: state.authData.email,
    password: state.authData.password,
    isAuth: state.authData.isAuth,
    error: state.authData.error,
    isLoading: state.authData.isLoading,
    isModalOpen: state.authData.isModalOpen,
  };
};

const LoginW = connect(mapStateToProps, { loginAndSetUserData, ...actions })(
  Login,
);

export default LoginW;
