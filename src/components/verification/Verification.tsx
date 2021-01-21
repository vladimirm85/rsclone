import React, { useEffect } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { AppStateType } from '../../store/store';
import { verifyEmail } from '../../store/action-creators/verify-ac';
import Preloader from '../common/Preloader/Preloader';

const useStyles = makeStyles({
  root: {
    color: 'green',
  },
});

type PropsType = {
  isLoading: boolean;
  isVerify: boolean;
  isAuth: boolean;
  verifyEmail: (key: string) => void;
  verifyError: string;
};

const Verification: React.FC<RouteComponentProps & PropsType> = (
  props,
): JSX.Element => {
  const classes = useStyles();
  const { isLoading, isAuth, isVerify, location, verifyError } = props;

  useEffect(() => {
    const url = location.pathname;
    const [key] = url.split('/').splice(-1);
    if (!isVerify && !verifyError) {
      props.verifyEmail(key);
    }
  });

  return (
    <>
      {!isAuth ? (
        <main>
          <div className="container-inner">
            <div>
              {isLoading && <Preloader />}
              {isVerify ? (
                <>
                  <Typography
                    variant="h5"
                    component="h5"
                    align="center"
                    className={classes.root}
                    paragraph
                  >
                    Verification was successful!
                  </Typography>
                  <Typography
                    variant="subtitle1"
                    component="p"
                    align="center"
                    paragraph
                  >
                    You will enter the game automatically after 5 seconds.
                  </Typography>
                </>
              ) : (
                <Typography variant="subtitle1" component="p" align="center">
                  {verifyError || 'Verification in progress. Wait a second...'}
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
