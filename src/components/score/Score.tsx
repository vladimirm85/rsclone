import React from 'react';
import './score.scss';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import withAuthRedirect from '../../hoc/withAuthRedirect';

const useStyles = makeStyles({
  table: {
    minWidth: 650,
    '& th': {
      fontSize: '1.3rem',
    },
    '& td': {
      fontSize: '1.1rem',
    },
  },
});

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

const Score: React.FC = (): JSX.Element => {
  const classes = useStyles();

  return (
    <main>
      <div className="container-inner">
        <div className="score-content">
          <div className="main-title">Score table</div>
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

const ScoreW = withAuthRedirect(Score);

export default ScoreW;
