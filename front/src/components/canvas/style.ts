import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      padding: theme.spacing(4, 4, 4),
    },
    buttons: {
      display: 'flex',
      color: '#186b72',
    },
    modalContainer: {
      maxWidth: '500',
    },
    modalHeader: {
      fontSize: '2rem',
      fontFamily: "'Prata', serif",
      color: '#565656',
      textAlign: 'center',
      marginBottom: '25px',
      lineHeight: '130%',
    },
    canvasContainer: {
      display: 'flex',
      position: 'relative',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    canvas: {
      '&-enter': {
        transform: 'scale(0)',
        '&-active': {
          transform: 'scale(1)',
          transition: 'transform 550ms',
        },
      },
      '&-exit': {
        transform: 'scale(1.1)',
        '&-active': {
          transform: 'scale(0)',
          transition: 'opacity 550ms',
        },
      },
    },
    paused: {
      '&-enter': {
        opacity: 0,
        '&-active': {
          opacity: 1,
          transition: 'opacity 300ms',
        },
      },
      '&-exit': {
        opacity: 1,
        '&-active': {
          opacity: 0,
          transition: 'opacity 300ms',
        },
      },
    },
    gameContent: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      '& canvas': {
        borderRadius: '10px',
        boxShadow: '0 0 2px 2px rgba(0, 0, 0, 0.5)',
      },
    },
    table: {
      minWidth: 480,
    },
    error: {
      color: 'red',
    },
    canvasElement: {
      cursor: 'none',
    },
    pause: {
      position: 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      zIndex: 20,
      fontSize: '3rem',
      fontFamily: "'Fredoka One', cursive",
      color: '#ffffff',
      padding: '20px',
      border: '2px solid white',
      '& p:nth-child(2)': {
        paddingLeft: '60px',
      },
    },
  }),
);

export default useStyles;
