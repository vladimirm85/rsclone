import React, { ChangeEvent, useEffect } from 'react';
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
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from '@material-ui/core';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { AppStateType } from '../../store/store';
import { actions, loadAvatar } from '../../store/action-creators/auth-ac';
import { del, get } from '../../helpers/storage';
import useStyles from './style';
import { ScoreType } from '../../types/types';
import Preloader from '../common/Preloader/Preloader';
import { loadUserScore } from '../../store/action-creators/settings-ac';

type MapStateProps = {
  authEmail: string;
  userTotalScore: number;
  avatar: string;
  userScore: Array<ScoreType>;
  userScoreLoading: boolean;
  userScoreError: string;
  avatarError: string;
};

type MapDispatchToProps = {
  setAuthStatus: (arg: boolean) => void;
  setAuthUserEmail: (authEmail: string) => void;
  setTotalUserScore: (totalScore: number) => void;
  loadUserScore: (key: string, lvl: number, forUser: number) => void;
  loadAvatar: (
    photoFile: string | ArrayBuffer | null | undefined,
    key: string,
  ) => void;
};

type PropsType = MapStateProps & MapDispatchToProps;

const Settings: React.FC<PropsType> = (props): JSX.Element => {
  const classes = useStyles();
  const [scoreType, setScoreType] = React.useState('1');
  const {
    authEmail,
    setAuthStatus,
    userTotalScore,
    setAuthUserEmail,
    setTotalUserScore,
    avatar,
    userScore,
    userScoreLoading,
    userScoreError,
    avatarError,
  } = props;
  const name = authEmail.split('@')[0];
  const authKey = get('authKey');

  useEffect(() => {
    if (userScore.length === 0 && !userScoreError) {
      props.loadUserScore(authKey, 1, 1);
    }
  });

  const logout = () => {
    del('authKey');
    setAuthStatus(false);
    setAuthUserEmail('');
    setTotalUserScore(0);
  };

  const removeAvatar = () => {
    props.loadAvatar(null, authKey);
  };

  const photoSelect = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      const file = event.target.files[0];
      const reader = new FileReader();
      reader.onload = (e) => {
        props.loadAvatar(e.target?.result, authKey);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setScoreType(event.target.value as string);
    props.loadUserScore(authKey, event.target.value as number, 1);
  };

  return (
    <main>
      <div className="container-inner">
        <div className="saves-content">
          <div className="main-title">Hello, {name}</div>
          <Avatar alt="Avatar" src={avatar} className={classes.large} />
          <Typography
            variant="overline"
            component="p"
            align="center"
            className={classes.score}
          >
            Total score: {userTotalScore}
          </Typography>
          <ButtonGroup
            variant="text"
            color="inherit"
            aria-label="text primary button group"
            className={classes.buttons}
            size="large"
          >
            <Button onClick={logout}>Logout</Button>
            <Button>
              <label htmlFor="avatar-input">
                <input id="avatar-input" type="file" onChange={photoSelect} />
                Change avatar
              </label>
            </Button>
            <Button onClick={removeAvatar}>Remove avatar</Button>
          </ButtonGroup>
          {avatarError && (
            <Typography
              component="p"
              align="center"
              variant="subtitle1"
              color="error"
              paragraph
            >
              {avatarError}
            </Typography>
          )}
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Score for:</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={scoreType}
              onChange={handleChange}
            >
              <MenuItem value={1}>Level 1</MenuItem>
              <MenuItem value={2}>Level 2</MenuItem>
              <MenuItem value={3}>Level 3</MenuItem>
              <MenuItem value={4}>Level 4</MenuItem>
              <MenuItem value={5}>Level 5</MenuItem>
              <MenuItem value={6}>Level 6</MenuItem>
            </Select>
          </FormControl>
          {userScoreError ? (
            <Typography
              variant="h5"
              component="h5"
              align="center"
              className={classes.error}
              paragraph
            >
              {userScoreError}
            </Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table className={classes.table} aria-label="simple table">
                <TableHead>
                  <TableRow>
                    <TableCell>Name</TableCell>
                    <TableCell align="center">Score</TableCell>
                    <TableCell align="center">Date</TableCell>
                  </TableRow>
                </TableHead>
                {userScoreLoading ? (
                  <Preloader />
                ) : (
                  <TableBody>
                    {userScore.map((row: ScoreType) => (
                      <TableRow key={row.createdAt}>
                        <TableCell>{row.nickname}</TableCell>
                        <TableCell align="center">{row.score}</TableCell>
                        <TableCell align="center">
                          {row.createdAt.split('T')[0]}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                )}
              </Table>
            </TableContainer>
          )}
        </div>
      </div>
    </main>
  );
};

const MapStateToProps = (state: AppStateType) => ({
  authEmail: state.authData.authEmail,
  userTotalScore: state.authData.userTotalScore,
  avatar: state.authData.avatar,
  userScore: state.settingsData.userScore,
  userScoreLoading: state.settingsData.userScoreLoading,
  userScoreError: state.settingsData.userScoreError,
  avatarError: state.authData.avatarError,
});

const SettingsW = compose<React.ComponentType>(
  connect(MapStateToProps, { ...actions, loadAvatar, loadUserScore }),
  withAuthRedirect,
)(Settings);

export default SettingsW;
