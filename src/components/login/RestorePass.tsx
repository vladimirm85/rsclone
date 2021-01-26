import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import AuthPreloader from '../common/Auth-preloader/AuthPreloader';
import { useRegisterStyles } from './style';
import { AppStateType } from '../../store/store';
import {
  restoreActions,
  restore,
} from '../../store/action-creators/restorePass-ac';

type MapStatePropsType = {
  restoreEmail: string;
  restoreError: string;
  isRestored: boolean;
  isLoading: boolean;
};

type MapDispatchPropsType = {
  setRestoreEmail: (email: string) => void;
  restore: (email: string) => void;
  setIsRestored: (isRestored: boolean) => void;
};

type InputPropsType = {
  setModalType: (arg: 'login' | 'register' | 'restorePass') => void;
  setModal: (arg: boolean) => void;
};

type PropsType = MapStatePropsType & MapDispatchPropsType & InputPropsType;

const RestorePass: React.FC<PropsType> = (props): JSX.Element => {
  const classes = useRegisterStyles();
  const {
    restoreEmail,
    restoreError,
    isRestored,
    isLoading,
    setRestoreEmail,
    setIsRestored,
    setModalType,
    setModal,
  } = props;

  const emailHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRestoreEmail(e.target.value);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    props.restore(restoreEmail);
  };

  const handleSubmitRestore = () => {
    setModal(false);
    setTimeout(() => {
      setIsRestored(false);
      setModalType('login');
    }, 500);
  };

  return (
    <>
      {!isRestored ? (
        <>
          <Typography component="h1" variant="h5">
            Restore password
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
              value={restoreEmail}
              onChange={emailHandler}
              autoFocus
            />
            {restoreError && (
              <Typography component="p" variant="subtitle1" color="error">
                {restoreError}
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
              {isLoading ? <AuthPreloader /> : 'Restore!'}
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
            Restore password successful.
          </Typography>
          <Typography variant="subtitle1" component="p" align="center">
            Check your email and follow the instructions.
          </Typography>
          <Button
            type="button"
            fullWidth
            variant="contained"
            color="primary"
            className={classes.submit}
            onClick={handleSubmitRestore}
          >
            Ok, i will do it!
          </Button>
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  restoreEmail: state.restoreData.restoreEmail,
  restoreError: state.restoreData.restoreError,
  isRestored: state.restoreData.isRestored,
  isLoading: state.restoreData.isLoading,
});

const RestorePassW = connect(mapStateToProps, { restore, ...restoreActions })(
  RestorePass,
);

export default RestorePassW;
