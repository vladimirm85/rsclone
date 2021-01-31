import React, { useEffect } from 'react';
import { Redirect, RouteComponentProps } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import { connect } from 'react-redux';
import useStyles from './style';
import { AppStateType } from '../../store/store';
import { set } from '../../helpers/storage';

type PropsType = {
  isAuth: boolean;
};

const SocialLogin: React.FC<RouteComponentProps & PropsType> = (
  props,
): JSX.Element => {
  const classes = useStyles();
  const { location, isAuth } = props;

  useEffect(() => {
    const url = location.search;
    const [key] = url.split('=').splice(-1);
    set('authKey', `Bearer ${key}`);
  });

  return (
    <>
      {!isAuth ? (
        <main>
          <div className="container-inner">
            <Typography
              variant="h5"
              component="h5"
              align="center"
              className={classes.root}
              paragraph
            >
              Authentication successful!
            </Typography>
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
    isAuth: state.authData.isAuth,
  };
};

const SocialLoginW = connect(mapStateToProps)(SocialLogin);

export default SocialLoginW;
