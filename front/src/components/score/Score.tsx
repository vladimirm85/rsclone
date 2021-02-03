import React, { useEffect } from 'react';
import './score.scss';
import { compose } from 'redux';
import { connect } from 'react-redux';
import {
  Typography,
  FormControl,
  MenuItem,
  InputLabel,
  Paper,
  Select,
  TableRow,
  TableHead,
  TableContainer,
  TableCell,
  TableBody,
  Table,
} from '@material-ui/core';
import withAuthRedirect from '../../hoc/withAuthRedirect';
import { AppStateType } from '../../store/store';
import {
  scoreActions,
  getAndSetTotalScore,
  getAndSetLevelScore,
} from '../../store/action-creators/score-ac';
import { get } from '../../helpers/storage';
import { ScoreType } from '../../types/types';
import Preloader from '../common/Preloader/Preloader';
import useStyles2 from './style';
import TableFooterActions from '../table/TableFooter';
import unmountCanvas from '../../hoc/unmomuntCanvas';

type MapStateToPropsType = {
  totalScore: Array<ScoreType>;
  levelScore: Array<ScoreType>;
  scoreError: string;
  isScoreLoading: boolean;
};

type MapDispatchToPropsType = {
  getAndSetTotalScore: (key: string) => void;
  getAndSetLevelScore: (key: string, lvl: number) => void;
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const Score: React.FC<PropsType> = (props): JSX.Element => {
  const { totalScore, levelScore, scoreError, isScoreLoading } = props;
  const classes = useStyles2();
  const [page, setPage] = React.useState(0);
  const [rowsPerPage, setRowsPerPage] = React.useState(5);
  const [scoreType, setScoreType] = React.useState('0');
  const authKey = get('authKey');
  const dataArray = !+scoreType ? totalScore : levelScore;
  const emptyRows =
    rowsPerPage - Math.min(rowsPerPage, dataArray.length - page * rowsPerPage);

  useEffect(() => {
    props.getAndSetTotalScore(authKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setScoreType(event.target.value as string);
    setPage(0);
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
          <div className="main-title text-center">Top players</div>
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
              <MenuItem value={6}>Level 6</MenuItem>
              <MenuItem value={7}>Level 7</MenuItem>
              <MenuItem value={8}>Level 8</MenuItem>
              <MenuItem value={9}>Level 9</MenuItem>
              <MenuItem value={10}>Level 10</MenuItem>
            </Select>
          </FormControl>
          {scoreError ? (
            <Typography
              variant="h5"
              component="h5"
              align="center"
              className={classes.error}
              paragraph
            >
              {scoreError}
            </Typography>
          ) : (
            <TableContainer component={Paper}>
              <Table
                className={classes.table}
                aria-label="custom pagination table"
              >
                <TableHead>
                  <TableRow>
                    <TableCell>Rank</TableCell>
                    <TableCell>Name</TableCell>
                    <TableCell align="center">Score</TableCell>
                    <TableCell align="center">Date</TableCell>
                  </TableRow>
                </TableHead>
                {isScoreLoading ? (
                  <Preloader />
                ) : (
                  <>
                    <TableBody>
                      {(rowsPerPage > 0
                        ? dataArray.slice(
                            page * rowsPerPage,
                            page * rowsPerPage + rowsPerPage,
                          )
                        : dataArray
                      ).map((row: ScoreType, index) => (
                        <TableRow key={row.createdAt}>
                          <TableCell component="th" scope="row">
                            {page * rowsPerPage + index + 1}
                          </TableCell>
                          <TableCell component="th" scope="row">
                            {row.nickname}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="center">
                            {!+scoreType ? row.totalScore : row.score}
                          </TableCell>
                          <TableCell style={{ width: 160 }} align="center">
                            {row.createdAt.split('T')[0]}
                          </TableCell>
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
                      dataArray={dataArray}
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
  totalScore: state.scoreData.totalScore,
  levelScore: state.scoreData.levelScore,
  scoreError: state.scoreData.scoreError,
  isScoreLoading: state.scoreData.isScoreLoading,
});

const ScoreW = compose<React.ComponentType>(
  connect(MapStateToProps, {
    ...scoreActions,
    getAndSetTotalScore,
    getAndSetLevelScore,
  }),
  withAuthRedirect,
  unmountCanvas,
)(Score);

export default ScoreW;
