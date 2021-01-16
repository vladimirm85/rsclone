import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import CssBaseline from '@material-ui/core/CssBaseline';
import Container from '@material-ui/core/Container';
import { Typography } from '@material-ui/core';
import logo from '../../assets/img/logo.png';
import Login from './Login';
import Register from './Register';

const useStyles = makeStyles((theme) => ({
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

export type PropsType = {
  open: boolean;
  close: () => void;
};

const AuthModal: React.FC<PropsType> = ({ open, close }): JSX.Element => {
  const classes = useStyles();
  const [isLoginModal, setIsLoginModal] = useState(true);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={open}
        onClose={() => {
          close();
          setIsLoginModal(true);
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={open}>
          <div className={classes.paperModal}>
            <Container component="main" maxWidth="xs">
              <CssBaseline />
              <div className={classes.paperForm}>
                <div className={classes.logo}>
                  <img src={logo} alt="logo" />
                </div>
                {isLoginModal ? (
                  <Login setIsLoginModal={setIsLoginModal} />
                ) : (
                  <Register setIsLoginModal={setIsLoginModal} />
                )}
              </div>
            </Container>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

export default AuthModal;
