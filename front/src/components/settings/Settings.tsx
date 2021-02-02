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
import {
  authActions,
  loadAvatar,
  authMe,
} from '../../store/action-creators/auth-ac';
import { del, get } from '../../helpers/storage';
import useStyles from './style';
import { ScoreType } from '../../types/types';
import Preloader from '../common/Preloader/Preloader';
import { loadUserScore } from '../../store/action-creators/settings-ac';
import TableFooterActions from '../table/TableFooter';
import unmountCanvas from '../../hoc/unmomuntCanvas';

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
  loadUserScore: (key: string, lvl: number, forUser: number) => void;
  loadAvatar: (
    photoFile: string | ArrayBuffer | null | undefined,
    key: string,
  ) => void;
  reset: () => void;
  authMe: (key: string) => void;
};

type PropsType = MapStateProps & MapDispatchToProps;

const Settings: React.FC<PropsType> = (props): JSX.Element => {
  const classes = useStyles();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [scoreType, setScoreType] = React.useState('1');
  const {
    authEmail,
    userTotalScore,
    avatar,
    userScore,
    userScoreLoading,
    userScoreError,
    avatarError,
    reset,
  } = props;
  const name = authEmail.split('@')[0];
  const authKey = get('authKey');
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, userScore.length - page * rowsPerPage);

  useEffect(() => {
    props.loadUserScore(authKey, 1, 1);
    props.authMe(authKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const logout = () => {
    del('authKey');
    reset();
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
    setPage(0);
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
            Best score: {userTotalScore}
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
                    <TableCell>#</TableCell>
                    <TableCell align="center">Date</TableCell>
                    <TableCell align="center">Time</TableCell>
                    <TableCell align="center">Score</TableCell>
                  </TableRow>
                </TableHead>
                {userScoreLoading ? (
                  <Preloader />
                ) : (
                  <>
                    <TableBody>
                      {(rowsPerPage > 0
                        ? userScore.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage,
                          )
                        : userScore
                      ).map((row: ScoreType, index) => (
                        <TableRow key={row.createdAt}>
                          <TableCell>
                            {page * rowsPerPage + index + 1}
                          </TableCell>
                          <TableCell align="center">
                            {row.createdAt.split('T')[0]}
                          </TableCell>
                          <TableCell align="center">
                            {row.createdAt.split('T')[1].split('.')[0]}
                          </TableCell>
                          <TableCell align="center">{row.score}</TableCell>
                        </TableRow>
                      ))}
                      {emptyRows > 0 && (
                        <TableRow style={{ height: 53 * emptyRows }}>
                          <TableCell colSpan={4} />
                        </TableRow>
                      )}
                    </TableBody>
                    <TableFooterActions
                      setPage={setPage}
                      setRowsPerPage={setRowsPerPage}
                      dataArray={userScore}
                      rowsPerPage={rowsPerPage}
                      page={page}
                    />
                  </>
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
  connect(MapStateToProps, {
    ...authActions,
    loadAvatar,
    loadUserScore,
    authMe,
  }),
  withAuthRedirect,
  unmountCanvas,
)(Settings);

export default SettingsW;
