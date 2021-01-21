import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import Canvas from './components/canvas/Canvas';
import HeaderW from './components/header/Header';
import Footer from './components/footer/Footer';
import ScoreW from './components/score/Score';
import About from './components/about/About';
import VerificationW from './components/verification/Verification';
import SavesW from './components/saves/Saves';
import SettingsW from './components/settings/Settings';
import { get } from './helpers/storage';
import { AppStateType } from './store/store';
import { authMe, actions } from './store/action-creators/auth-ac';
import Preloader from './components/common/Preloader/Preloader';
import Notification from './components/notification/Notification';

type MapStatePropsType = {
  isAuth: boolean;
  isInitialized: boolean;
  authKey: string;
};

type MapDispatchType = {
  authMe: (arg: string) => void;
  setInitializeStatus: (arg: boolean) => void;
  setAuthKey: (authKey: string) => void;
};

type PropsType = MapStatePropsType & MapDispatchType;

const App: React.FC<PropsType> = (props): JSX.Element => {
  const {
    isAuth,
    isInitialized,
    setInitializeStatus,
    setAuthKey,
    authKey,
  } = props;

  useEffect(() => {
    const localAuthKey = get('authKey');
    if (localAuthKey) {
      setAuthKey(localAuthKey);
    } else {
      setInitializeStatus(true);
    }
    if (!isAuth && authKey) {
      props.authMe(authKey);
    }
  });

  return (
    <>
      {!isInitialized ? (
        <Preloader />
      ) : (
        <>
          <HeaderW />
          <Switch>
            <Route exact path="/" render={() => <Redirect to="/game" />} />
            <Route path="/about" render={() => <About />} />
            <Route path="/saves" render={() => <SavesW />} />
            <Route path="/score" render={() => <ScoreW />} />
            <Route path="/game" render={() => <Canvas />} />
            <Route path="/settings" render={() => <SettingsW />} />
            <Route path="/verify" component={VerificationW} />
            <Route path="*" render={() => <Redirect to="/game" />} />
          </Switch>
          <Footer />
          <Notification />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: AppStateType) => {
  return {
    isAuth: state.authData.isAuth,
    isInitialized: state.authData.isInitialized,
    authKey: state.authData.authKey,
  };
};

const AppW = connect(mapStateToProps, { ...actions, authMe })(App);

export default AppW;
