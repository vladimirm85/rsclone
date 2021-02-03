import React from 'react';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import { connect } from 'react-redux';
import { Button } from '@material-ui/core';
import useStyles from './style';
import { AppStateType } from '../../store/store';
import { GameResultPropsType } from '../../types/types';

type MapStatePropsType = {
  gameResult: GameResultPropsType;
};

type InputPropsType = {
  gameOverModalOpen: boolean;
  handleCloseGameOverModal: () => void;
};

type PropsType = MapStatePropsType & InputPropsType;

const GameOverModal: React.FC<PropsType> = (props): JSX.Element => {
  const { gameResult, gameOverModalOpen, handleCloseGameOverModal } = props;
  const classes = useStyles();

  return (
    <div>
      <Modal
        aria-labelledby="transition-modal-title"
        aria-describedby="transition-modal-description"
        className={classes.modal}
        open={gameOverModalOpen}
        onClose={handleCloseGameOverModal}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Fade in={gameOverModalOpen}>
          <div className={classes.paper}>
            <div className={classes.gameOverContainer}>
              <div className={classes.gameOverTitle}>
                {gameResult.victory ? (
                  <span>
                    Vict<span className="red-letter">o</span>ry!
                  </span>
                ) : (
                  <span>
                    Y<span className="red-letter">o</span>u l
                    <span className="red-letter">o</span>se :(
                  </span>
                )}
              </div>
              <div className={classes.gameOverSubtitle}>
                Score: {gameResult.score}
              </div>
              <Button variant="outlined" onClick={handleCloseGameOverModal}>
                {gameResult.victory ? 'Yohoo!' : 'Try again'}
              </Button>
            </div>
          </div>
        </Fade>
      </Modal>
    </div>
  );
};

const MapStateToProps = (state: AppStateType) => ({
  gameResult: state.gameData.gameResult,
});

const GameOverModalW = connect(MapStateToProps)(GameOverModal);

export default GameOverModalW;
