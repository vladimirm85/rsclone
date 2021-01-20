import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import logo from '../../assets/img/logo.png';
import Register from './Register';
import LoginW from './Login';

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
  isModalOpen: boolean;
  setModal: (isModalOpen: boolean) => void;
};

const AuthModal: React.FC<PropsType> = ({
  isModalOpen,
  setModal,
}): JSX.Element => {
  const classes = useStyles();
  const [isLoginModal, setIsLoginModal] = useState(true);

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={isModalOpen}
        onClose={() => {
          setModal(false);
        }}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={isModalOpen}>
          <div className={classes.paperModal}>
            <Container component="main" maxWidth="xs">
              <div className={classes.paperForm}>
                <div className={classes.logo}>
                  <img src={logo} alt="logo" />
                </div>
                {isLoginModal ? (
                  <LoginW setIsLoginModal={setIsLoginModal} />
                ) : (
                  <Register
                    setIsLoginModal={setIsLoginModal}
                    setModal={setModal}
                  />
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
