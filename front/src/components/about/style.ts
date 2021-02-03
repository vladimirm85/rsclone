import { makeStyles, createStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(2),
      textAlign: 'center',
      color: theme.palette.text.secondary,
    },
    large: {
      width: '100%',
      height: '100%',
    },
    gridMargin: {
      marginBottom: '50px',
    },
    aboutSection: {
      '&:not(:last-child)': {
        marginBottom: '60px',
      },
    },
    textLeftPadding: {
      paddingLeft: '20px',
    },
  }),
);

export default useStyles;
