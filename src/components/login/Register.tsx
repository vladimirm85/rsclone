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
};

type MapStatePropsType = {
  regEmail: string;
  regPassword: string;
  regRepeatPassword: string;
};

type MapDispatchPropsType = {
  setRegEmail: (arg: string) => void;
  setRegPassword: (arg: string) => void;
  setRegRepeatPassword: (arg: string) => void;
  registration: (arg0: string, arg1: string, arg2: string) => void;
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

  return (
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
        <Button
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          className={classes.submit}
        >
          Register
        </Button>
        <Button size="small" onClick={() => setIsLoginModal(true)}>
          &lt;- Return to login page
        </Button>
      </form>
    </>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  regEmail: state.regData.regEmail,
  regPassword: state.regData.regPassword,
  regRepeatPassword: state.regData.regRepeatPassword,
});

const RegisterW = connect(mapStateToProps, { registration, ...actions })(
  Register,
);

export default RegisterW;
