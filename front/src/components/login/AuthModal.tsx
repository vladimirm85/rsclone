import React, { useState } from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Container from '@material-ui/core/Container';
import logo from '../../assets/img/logo.png';
import RegisterW from './Register';
import LoginW from './Login';
import RestorePassW from './RestorePass';
import { useModalStyles } from './style';

export type PropsType = {
  isModalOpen: boolean;
  setModal: (isModalOpen: boolean) => void;
};

const AuthModal: React.FC<PropsType> = ({
  isModalOpen,
  setModal,
}): JSX.Element => {
  const classes = useModalStyles();
  const [modalType, setModalType] = useState<
    'login' | 'register' | 'restorePass'
  >('login');

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
                {modalType === 'login' && (
                  <LoginW setModalType={setModalType} />
                )}
                {modalType === 'register' && (
                  <RegisterW setModalType={setModalType} setModal={setModal} />
                )}
                {modalType === 'restorePass' && (
                  <RestorePassW
                    setModalType={setModalType}
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
