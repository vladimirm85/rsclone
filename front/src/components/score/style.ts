import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles2 = makeStyles((theme: Theme) =>
  createStyles({
    table: {
      minWidth: 500,
    },
    error: {
      color: 'red',
    },
    formControl: {
      marginBottom: theme.spacing(3),
      minWidth: 120,
    },
  }),
);

export default useStyles2;
