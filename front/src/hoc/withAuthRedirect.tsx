import React from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppStateType } from '../store/store';

const mapStateToPropsForRedirect = (state: AppStateType) => ({
  isAuth: state.authData.isAuth,
});

type MapPropsType = {
  isAuth: boolean;
};

function withAuthRedirect<WCP>(WrappedComponent: React.ComponentType<WCP>) {
  const RedirectComponent: React.FC<MapPropsType> = (props) => {
    const { isAuth, ...restProps } = props;

    if (!isAuth) return <Redirect to="/game" />;

    // eslint-disable-next-line react/jsx-props-no-spreading
    return <WrappedComponent {...(restProps as WCP)} />;
  };

  return connect(mapStateToPropsForRedirect)(RedirectComponent);
}

export default withAuthRedirect;
