import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    buttons: {
      display: 'flex',
      justifyContent: 'center',
      color: '#565656',
      marginBottom: '25px',
    },
    large: {
      width: '250px',
      height: '250px',
      margin: '0 auto 15px',
    },
    score: {
      marginBottom: '15px',
      fontSize: '1rem',
    },
    table: {
      minWidth: 500,
    },
    formControl: {
      marginBottom: theme.spacing(3),
      minWidth: 120,
    },
    error: {
      color: 'red',
    },
  }),
);

export default useStyles;
