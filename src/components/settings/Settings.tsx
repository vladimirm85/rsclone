import React from 'react';
import './settings.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { Button, ButtonGroup } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { AppStateType } from '../../store/store';
import { actions } from '../../store/action-creators/auth-ac';
import { del } from '../../helpers/storage';

const useStyles = makeStyles({
  buttons: {
    display: 'flex',
    justifyContent: 'center',
    color: '#565656',
  },
});

type MapStateProps = {
  authEmail: string;
};

type MapDispatchToProps = {
  setAuthStatus: (arg: boolean) => void;
  setAuthUserData: (email: string, userScore: number) => void;
  setAuthKey: (authKey: string) => void;
};

type PropsType = MapStateProps & MapDispatchToProps;

const Settings: React.FC<PropsType> = (props): JSX.Element => {
  const classes = useStyles();
  const { authEmail, setAuthStatus, setAuthUserData, setAuthKey } = props;
  const name = authEmail.split('@')[0];

  const logout = () => {
    del('authKey');
    setAuthKey('');
    setAuthUserData('', 0);
    setAuthStatus(false);
  };

  return (
    <main>
      <div className="container-inner">
        <div className="saves-content">
          <div className="main-title">Hello, {name}</div>
          <ButtonGroup
            variant="text"
            color="inherit"
            aria-label="text primary button group"
            className={classes.buttons}
            size="large"
          >
            <Button onClick={logout}>Logout</Button>
            <Button>Change pass</Button>
          </ButtonGroup>
        </div>
      </div>
    </main>
  );
};

const MapStateToProps = (state: AppStateType) => ({
  authEmail: state.authData.authEmail,
});

const SettingsW = compose<React.ComponentType>(
  connect(MapStateToProps, { ...actions }),
  withAuthRedirect,
)(Settings);

export default SettingsW;
