import React from 'react';
import './settings.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  Avatar,
  Button,
  ButtonGroup,
  Typography,
  TableContainer,
  Table,
  Paper,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
} from '@material-ui/core';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { AppStateType } from '../../store/store';
import { actions } from '../../store/action-creators/auth-ac';
import { del } from '../../helpers/storage';
import ava from '../../assets/img/8biticon.jpg';
import useStyles from './style';

type MapStateProps = {
  authEmail: string;
  userScore: number;
};

type MapDispatchToProps = {
  setAuthStatus: (arg: boolean) => void;
  setAuthUserData: (email: string, userScore: number) => void;
};

type PropsType = MapStateProps & MapDispatchToProps;

const Settings: React.FC<PropsType> = (props): JSX.Element => {
  const classes = useStyles();
  const { authEmail, setAuthStatus, setAuthUserData, userScore } = props;
  const name = authEmail.split('@')[0];

  const logout = () => {
    del('authKey');
    setAuthUserData('', 0);
    setAuthStatus(false);
  };

  // const photoSelect = (e: ChangeEvent<HTMLInputElement>) => {
  //   if (e.target.files?.length) {
  //     let file = e.target.files[0];
  //   }
  // };

  return (
    <main>
      <div className="container-inner">
        <div className="saves-content">
          <div className="main-title">Hello, {name}</div>
          <Avatar alt="Avatar" src={ava} className={classes.large} />
          <Typography
            variant="overline"
            component="p"
            align="center"
            className={classes.score}
          >
            Total score: {userScore}
          </Typography>
          <ButtonGroup
            variant="text"
            color="inherit"
            aria-label="text primary button group"
            className={classes.buttons}
            size="large"
          >
            <Button onClick={logout}>Logout</Button>
            <Button>Change pass</Button>
            <Button>
              <label htmlFor="avatar-input">
                <input id="avatar-input" type="file" />
                Change avatar
              </label>
            </Button>
          </ButtonGroup>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>Level</TableCell>
                  <TableCell align="center">Score</TableCell>
                  <TableCell align="center">Screen</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>test</TableCell>
                  <TableCell align="center">test</TableCell>
                  <TableCell align="center">test</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </main>
  );
};

const MapStateToProps = (state: AppStateType) => ({
  authEmail: state.authData.authEmail,
  userScore: state.authData.userScore,
});

const SettingsW = compose<React.ComponentType>(
  connect(MapStateToProps, { ...actions }),
  withAuthRedirect,
)(Settings);

export default SettingsW;
