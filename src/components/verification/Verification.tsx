import React, { useEffect } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import './verification.scss';
import { Typography } from '@material-ui/core';
import { AppStateType } from '../../store/store';
import { verifyEmail } from '../../store/action-creators/verify-ac';
import Preloader from '../common/Preloader/Preloader';

type PropsType = {
  isLoading: boolean;
  isVerify: boolean;
  isAuth: boolean;
  verifyEmail: (arg: string) => void;
  verifyError: string;
};

const Verification: React.FC<RouteComponentProps & PropsType> = (
  props,
): JSX.Element => {
  const { isLoading, isAuth, isVerify, location, verifyError } = props;

  useEffect(() => {
    const url = location.pathname;
    const [key] = url.split('/').splice(-1);
    if (!isVerify) {
      props.verifyEmail(key);
    }
  });

  return (
    <>
      {!isAuth ? (
        <main>
          <div className="container-inner">
            <div className="loader_content">
              {isLoading && <Preloader />}
              {isVerify ? (
                <Typography variant="subtitle1" component="p" align="center">
                  Verification was successful! Log in to the game using your
                  e-mail and password.
                </Typography>
              ) : (
                <Typography variant="subtitle1" component="p" align="center">
                  {verifyError && 'Verification in progress. Wait a second...'}
                </Typography>
              )}
            </div>
          </div>
        </main>
      ) : (
        <Redirect to="/game" />
      )}
    </>
  );
};

const mapStateToProps = (state: AppStateType) => {
  return {
    isLoading: state.verifyData.isLoading,
    isVerify: state.verifyData.isVerify,
    verifyError: state.verifyData.verifyError,
    isAuth: state.authData.isAuth,
  };
};

const VerificationW = connect(mapStateToProps, { verifyEmail })(Verification);

export default VerificationW;
