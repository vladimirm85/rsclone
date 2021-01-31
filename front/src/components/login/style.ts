import { makeStyles } from '@material-ui/core/styles';

export const antIcons = { fontSize: '1.85rem' };

export const useModalStyles = makeStyles((theme) => ({
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paperModal: {
    backgroundColor: theme.palette.background.paper,
    borderRadius: '20px',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    '& > main': {
      margin: '10px 0 10px',
    },
  },
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
}));

export const useLoginStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
  buttons: {
    marginBottom: '15px',
  },
  socialButtons: {
    textAlign: 'left',
    '& svg': {
      transition: '.3s',
    },
    '& > button:nth-child(2):hover svg': {
      color: '#4285F4',
    },
    '& > button:nth-child(3):hover svg': {
      color: '#24292E',
    },
    '& > button:nth-child(4):hover svg': {
      color: '#0574E7',
    },
  },
}));

export const useRegisterStyles = makeStyles((theme) => ({
  form: {
    width: '100%',
    marginTop: theme.spacing(1),
  },
  submit: {
    margin: theme.spacing(3, 0, 2),
  },
}));
