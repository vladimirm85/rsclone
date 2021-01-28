import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles1 = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexShrink: 0,
      marginLeft: theme.spacing(2.5),
    },
  }),
);

export default useStyles1;
