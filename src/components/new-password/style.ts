import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  paperForm: {
    marginTop: theme.spacing(2),
    marginBottom: theme.spacing(2),
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  logo: {
    lineHeight: 0,
    marginBottom: '10px',
    '& img': {
      width: '130px',
    },
  },
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  success: {
    color: 'green',
  },
}));

export default useStyles;
