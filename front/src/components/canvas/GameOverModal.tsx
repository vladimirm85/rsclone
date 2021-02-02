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
            <h2 id="transition-modal-title">ХЗАХАХАХААЗАЗАЗА</h2>
            <p id="transition-modal-description">ТЫ ПРОЕБАЛ, ЕБЛАН___)))))</p>
            <p>{gameResult.score}</p>
            <Button variant="contained" color="primary">
              Primary
            </Button>
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
