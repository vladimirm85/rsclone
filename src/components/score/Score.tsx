import React, { useEffect } from 'react';
import './score.scss';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { compose } from 'redux';
import { connect } from 'react-redux';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { AppStateType } from '../../store/store';
import {
  actions,
  getAndSetTotalScore,
  getAndSetLevelScore,
} from '../../store/action-creators/score-ac';
import { get } from '../../helpers/storage';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    formControl: {
      marginBottom: theme.spacing(3),
      minWidth: 120,
    },
    selectEmpty: {
      marginTop: theme.spacing(2),
    },
    table: {
      minWidth: 650,
      '& th': {
        fontSize: '1.3rem',
      },
      '& td': {
        fontSize: '1.1rem',
      },
    },
  }),
);

function createData(email: string, score: number, date: string) {
  return { email, score, date };
}

const rows = [
  createData('sanya-pitersky@nagibator.ru', 159, '12.01.2021'),
  createData('volodya-top8@backend.ua', 237, '14.01.2021'),
  createData('artemka@design.by', 132435, '12.01.2021'),
  createData('vasja-igrok@game.by', 305, '12.01.2021'),
  createData('aleksandr-grigorevich@father.by', 80, '09.08.2021'),
];

type MapStateToPropsType = {
  totalScore: any;
  levelScore: any;
};

type MapDispatchToPropsType = {
  setTotalScore: (totalScore: number) => void;
  setLevelScore: (levelScore: number) => void;
  getAndSetTotalScore: (key: string) => void;
  getAndSetLevelScore: (key: string, lvl: number) => void;
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const Score: React.FC<PropsType> = (props): JSX.Element => {
  const { totalScore, levelScore, setTotalScore, setLevelScore } = props;
  const classes = useStyles();
  const [scoreType, setScoreType] = React.useState('0');
  const authKey = get('authKey');

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setScoreType(event.target.value as string);
    if (event.target.value === 0) {
      props.getAndSetTotalScore(authKey);
    } else {
      props.getAndSetLevelScore(authKey, event.target.value as number);
    }
  };

  return (
    <main>
      <div className="container-inner">
        <div className="score-content">
          <div className="main-title">Top players</div>
          <FormControl className={classes.formControl}>
            <InputLabel id="demo-simple-select-label">Score for:</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={scoreType}
              onChange={handleChange}
            >
              <MenuItem value={0}>Total</MenuItem>
              <MenuItem value={1}>Level 1</MenuItem>
              <MenuItem value={2}>Level 2</MenuItem>
              <MenuItem value={3}>Level 3</MenuItem>
              <MenuItem value={4}>Level 4</MenuItem>
              <MenuItem value={5}>Level 5</MenuItem>
            </Select>
          </FormControl>
          <TableContainer component={Paper}>
            <Table className={classes.table} aria-label="simple table">
              <TableHead>
                <TableRow>
                  <TableCell>E-mail</TableCell>
                  <TableCell align="center">Score</TableCell>
                  <TableCell align="center">Date</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow key={row.email}>
                    <TableCell>{row.email}</TableCell>
                    <TableCell align="center">{row.score}</TableCell>
                    <TableCell align="center">{row.date}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      </div>
    </main>
  );
};

const MapStateToProps = (state: AppStateType) => ({
  totalScore: state.scoreData.totalScore,
  levelScore: state.scoreData.levelScore,
});

const ScoreW = compose<React.ComponentType>(
  connect(MapStateToProps, {
    ...actions,
    getAndSetTotalScore,
    getAndSetLevelScore,
  }),
  withAuthRedirect,
)(Score);

export default ScoreW;
