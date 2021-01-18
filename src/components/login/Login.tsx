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
  setIsLoginModal: (arg: boolean) => void;
  email: string;
  password: string;
  isAuth: boolean;
  error: string;
};

type MapDispatchPropsType = {
  loginAndSetUserData: (arg0: string, arg1: string) => void;
  setEmail: (arg: string) => void;
  setPassword: (arg: string) => void;
};

type InputPropsType = {
  close: () => void;
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
    close,
    isAuth,
    error,
  } = props;

  useEffect(() => {
    if (isAuth) {
      close();
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
        >
          Go!
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
  };
};

const LoginW = connect(mapStateToProps, { loginAndSetUserData, ...actions })(
  Login,
);

export default LoginW;
