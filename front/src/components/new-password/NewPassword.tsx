import React, { useState } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { Typography, Container, TextField, Button } from '@material-ui/core';
import { connect } from 'react-redux';
import { compose } from 'redux';
import useStyles from './style';
import AuthPreloader from '../common/Auth-preloader/AuthPreloader';
import { AppStateType } from '../../store/store';
import {
  newPassActions,
  changeOldPassword,
} from '../../store/action-creators/newPass-ac';
import { passValidator } from '../../helpers/validator';
import unmountCanvas from '../../hoc/unmomuntCanvas';

type MapStatePropsType = {
  newPass: string;
  newRepeatPass: string;
  newPassError: string;
  newPassStatus: boolean;
  newPassLoading: boolean;
  isAuth: boolean;
};

type MapDispatchPropsType = {
  setNewPass: (pass: string) => void;
  setNewRepeatPass: (pass: string) => void;
  changeOldPassword: (pass: string, rPass: string, key: string) => void;
};

type PropsType = MapStatePropsType & MapDispatchPropsType;

const NewPassword: React.FC<RouteComponentProps & PropsType> = (
  props,
): JSX.Element => {
  const classes = useStyles();
  const {
    location,
    newPass,
    newRepeatPass,
    newPassError,
    newPassStatus,
    newPassLoading,
    setNewPass,
    setNewRepeatPass,
    isAuth,
  } = props;
  const url = location.pathname;
  const [key] = url.split('/').splice(-1);

  const [passValidatorError, setPassValidatorError] = useState('');
  const [repeatPassValidatorError, setRepeatPassValidatorError] = useState('');

  const passwordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPassValidatorError('');
    setNewPass(e.target.value);
  };

  const repeatPasswordHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRepeatPassValidatorError('');
    setNewRepeatPass(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const passValidate = passValidator(
      newPass,
      newRepeatPass,
      setPassValidatorError,
      setRepeatPassValidatorError,
    );
    if (passValidate) props.changeOldPassword(newPass, newRepeatPass, key);
  };

  return (
    <>
      {!isAuth ? (
        <main>
          <div className="container-inner">
            <Container component="main" maxWidth="xs">
              <div className={classes.paperForm}>
                {!newPassStatus ? (
                  <>
                    <Typography component="h1" variant="h5">
                      Set new password
                    </Typography>
                    <form
                      className={classes.form}
                      noValidate
                      onSubmit={handleSubmit}
                    >
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
                        value={newPass}
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
                        value={newRepeatPass}
                        onChange={repeatPasswordHandler}
                        autoComplete="off"
                        helperText={repeatPassValidatorError}
                      />
                      {newPassError && (
                        <Typography
                          component="p"
                          variant="subtitle1"
                          color="error"
                        >
                          {newPassError}
                        </Typography>
                      )}
                      <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className={classes.submit}
                        disabled={newPassLoading}
                      >
                        {newPassLoading ? <AuthPreloader /> : 'Change password'}
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
                      className={classes.success}
                    >
                      Password changed successfully.
                    </Typography>
                    <Typography
                      variant="subtitle1"
                      component="p"
                      align="center"
                    >
                      You will be automatically logged in.
                    </Typography>
                  </>
                )}
              </div>
            </Container>
          </div>
        </main>
      ) : (
        <Redirect to="/game" />
      )}
    </>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  newPass: state.newPassData.newPass,
  newRepeatPass: state.newPassData.newRepeatPass,
  newPassError: state.newPassData.newPassError,
  newPassStatus: state.newPassData.newPassStatus,
  newPassLoading: state.newPassData.newPassLoading,
  isAuth: state.authData.isAuth,
});

const NewPasswordW = compose<React.ComponentType>(
  connect(mapStateToProps, {
    changeOldPassword,
    ...newPassActions,
  }),
  unmountCanvas,
)(NewPassword);

export default NewPasswordW;
