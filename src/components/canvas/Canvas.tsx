import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { Button, ButtonGroup } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import PublishIcon from '@material-ui/icons/Publish';
import PauseIcon from '@material-ui/icons/Pause';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import { AppStateType } from '../../store/store';
import {
  gameActions,
  loadUserSaves,
} from '../../store/action-creators/game-ac';
import useStyles from './style';
import SavesW from './Saves';

// Import constants
import { gameWidth, gameHeight, initialGameData } from './constants';
import Game from './Game';
import { GameConstructor, GameInterface } from './interfaces';
import { get } from '../../helpers/storage';

type MapStatePropsType = {
  isGameStarted: boolean;
  isAuth: boolean;
};

type MapDispatchPropsType = {
  startGame: (isGameStarted: boolean) => void;
  loadUserSaves: (key: string) => void;
};

type PropsType = MapStatePropsType & MapDispatchPropsType;

const Canvas: React.FC<PropsType> = (props): JSX.Element => {
  const { isGameStarted, startGame, isAuth } = props;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [isPause, setIsPause] = React.useState(false);
  const [gameData, setGameData] = React.useState<GameInterface>();
  const authKey = get('authKey');

  const newGame = (gameSettings: GameConstructor) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const game = new Game(gameSettings, context!);
    game.init();
    setGameData(game);
  };

  useEffect(() => {
    if (isGameStarted && !gameData) {
      newGame(initialGameData);
    }
  });

  const gameLauncher = () => {
    startGame(true);
  };

  const handleOpenSaves = () => {
    setOpen(true);
    props.loadUserSaves(authKey);
  };

  const handleCloseSaves = () => {
    setOpen(false);
  };

  return (
    <main>
      <div className="container-inner">
        <div className={classes.gameContent}>
          <CSSTransition
            in={isGameStarted}
            timeout={500}
            classNames={classes.canvas}
            unmountOnExit
          >
            <div className={classes.canvasContainer}>
              <canvas ref={canvasRef} width={gameWidth} height={gameHeight} />
              <ButtonGroup
                variant="text"
                aria-label="button group"
                color="inherit"
                size="large"
                className={classes.buttons}
              >
                {isAuth && <Button startIcon={<SaveIcon />}>Save</Button>}
                {isAuth && (
                  <Button startIcon={<PublishIcon />} onClick={handleOpenSaves}>
                    Load
                  </Button>
                )}
                <Button
                  startIcon={isPause ? <PlayArrowIcon /> : <PauseIcon />}
                  style={{ width: '100px' }}
                  onClick={() => {
                    setIsPause(!isPause);
                    gameData!.setIsPause(!isPause);
                  }}
                >
                  {isPause ? 'Play' : 'Pause'}
                </Button>
                <Button startIcon={<VolumeOffIcon />}>Mute</Button>
                <Button
                  startIcon={<VideogameAssetIcon />}
                  onClick={() => {
                    gameData!.stop();
                    newGame(initialGameData);
                  }}
                >
                  New game
                </Button>
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
      {isAuth && <SavesW open={open} handleClose={handleCloseSaves} />}
    </main>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  isGameStarted: state.gameData.isGameStarted,
  isAuth: state.authData.isAuth,
});

const CanvasW = connect(mapStateToProps, { ...gameActions, loadUserSaves })(
  Canvas,
);

export default CanvasW;
