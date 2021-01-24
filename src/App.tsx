import React, { useEffect } from 'react';
import { Redirect, Route, Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { notification } from 'antd';
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
import NewPasswordW from './components/new-password/NewPassword';

type MapStatePropsType = {
  isAuth: boolean;
  isInitialized: boolean;
  notifyShow: boolean;
};

type MapDispatchType = {
  authMe: (arg: string) => void;
  setInitializeStatus: (arg: boolean) => void;
  setNotifyModal: (showNotify: boolean) => void;
};

type PropsType = MapStatePropsType & MapDispatchType;

const App: React.FC<PropsType> = (props): JSX.Element => {
  const {
    isAuth,
    isInitialized,
    setInitializeStatus,
    setNotifyModal,
    notifyShow,
  } = props;

  useEffect(() => {
    const localAuthKey = get('authKey');
    if (localAuthKey && !isAuth) {
      props.authMe(localAuthKey);
    } else {
      if (notifyShow && !isAuth) {
        setTimeout(() => {
          notification.info({
            message: 'Notification',
            description:
              'Log in to get access to the full functionality of the game. Saves and score table are available to authorized users.',
            duration: 15,
            placement: 'bottomRight',
          });
        }, 2000);
        setNotifyModal(false);
      }
      setInitializeStatus(true);
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
            <Route path="/verify/*" component={VerificationW} />
            <Route path="/forgot-password/*" component={NewPasswordW} />
            <Route path="*" render={() => <Redirect to="/game" />} />
          </Switch>
          <Footer />
        </>
      )}
    </>
  );
};

const mapStateToProps = (state: AppStateType) => {
  return {
    isAuth: state.authData.isAuth,
    isInitialized: state.authData.isInitialized,
    notifyShow: state.authData.notifyShow,
  };
};

const AppW = connect(mapStateToProps, { ...actions, authMe })(App);

export default AppW;
