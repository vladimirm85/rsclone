import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    error: {
      color: 'red',
    },
    formControl: {
      marginBottom: theme.spacing(3),
      minWidth: 120,
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

export default useStyles;
