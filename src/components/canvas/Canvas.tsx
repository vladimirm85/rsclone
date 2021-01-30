import React, { useRef, useEffect } from 'react';
import './canvas.scss';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { Button, ButtonGroup } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import PublishIcon from '@material-ui/icons/Publish';
import PauseIcon from '@material-ui/icons/Pause';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import { AppStateType } from '../../store/store';
import gameActions from '../../store/action-creators/game-ac';
import useStyles from './style';
import Saves from './Saves';

// Import constants
import { gameWidth, gameHeight, initialGameData } from './constants';
import { preload } from './utils/preload';
import Game from './Game';
import { GameConstructor } from './interfaces';

type MapStatePropsType = {
  isGameStarted: boolean;
};

type MapDispatchPropsType = {
  startGame: (isGameStarted: boolean) => void;
};

type PropsType = MapStatePropsType & MapDispatchPropsType;

const Canvas: React.FC<PropsType> = (props): JSX.Element => {
  const { isGameStarted, startGame } = props;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  let animationFrameId: number;

  const newGame = (gameData: GameConstructor) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');

    const game = new Game(gameData, context!);
    game.addListeners();

    let start: number | null = null;
    const fpsDivider = 16;
    const render = (timestamp: number) => {
      if (timestamp > start! + fpsDivider) {
        if (context && !game.getIsPause()) {
          game.draw();
          game.updateCurrentStateGame();
          start = timestamp;
        }
      }
      // @ts-ignore
      animationFrameId = window.requestAnimationFrame(render);
    };

    preload(() => {
      // @ts-ignore
      render();
    });
  };

  useEffect(() => {
    if (isGameStarted) {
      newGame(initialGameData);
    }
    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  });

  const gameLauncher = () => {
    startGame(true);
  };

  const handleOpenSaves = () => {
    setOpen(true);
  };

  const handleCloseSaves = () => {
    setOpen(false);
  };

  return (
    <main>
      <div className="container-inner">
        <div className="game-content">
          <CSSTransition
            in={isGameStarted}
            timeout={500}
            classNames="canvas"
            unmountOnExit
          >
            <div className="game-content__canvas-container">
              <canvas ref={canvasRef} width={gameWidth} height={gameHeight} />
              <ButtonGroup
                variant="text"
                aria-label="button group"
                color="inherit"
                size="large"
                className={classes.buttons}
              >
                <Button startIcon={<SaveIcon />}>Save</Button>
                <Button startIcon={<PublishIcon />} onClick={handleOpenSaves}>
                  Load
                </Button>
                <Button startIcon={<PauseIcon />}>Pause</Button>
                <Button startIcon={<VolumeOffIcon />}>Mute</Button>
                <Button startIcon={<VideogameAssetIcon />}>New game</Button>
              </ButtonGroup>
            </div>
          </CSSTransition>
          {!isGameStarted && (
            <button
              className="start-button"
              type="button"
              onClick={gameLauncher}
            >
              Start game
            </button>
          )}
        </div>
      </div>
      <Saves open={open} handleClose={handleCloseSaves} />
    </main>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  isGameStarted: state.gameData.isGameStarted,
});

const CanvasW = connect(mapStateToProps, { ...gameActions })(Canvas);

export default CanvasW;
