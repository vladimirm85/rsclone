import React, { useRef, useEffect } from 'react';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { Button, ButtonGroup } from '@material-ui/core';
import SaveIcon from '@material-ui/icons/Save';
import PublishIcon from '@material-ui/icons/Publish';
import PauseIcon from '@material-ui/icons/Pause';
import VolumeUpIcon from '@material-ui/icons/VolumeUp';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import VideogameAssetIcon from '@material-ui/icons/VideogameAsset';
import VolumeOffIcon from '@material-ui/icons/VolumeOff';
import { AppStateType } from '../../store/store';
import {
  gameActions,
  loadUserSaves,
  createUserSave,
} from '../../store/action-creators/game-ac';
import useStyles from './style';
import SavesW from './Saves';

// Import constants
import { gameWidth, gameHeight, initialGameData, KEYS } from './constants';
import Game from './Game';
import { GameConstructor, GameInterface } from './interfaces';
import { get } from '../../helpers/storage';
import {
  setCurrentTotalScore,
  setCurrentLevelScore,
} from '../../store/action-creators/score-ac';
import GameInstruction from './GameInstruction';
import { GameResultPropsType } from '../../types/types';
import GameOverModalW from './GameOverModal';

type MapStatePropsType = {
  isGameStarted: boolean;
  isAuth: boolean;
  gameObj: GameInterface | null;
};

type MapDispatchPropsType = {
  startGame: (isGameStarted: boolean) => void;
  loadUserSaves: (key: string) => void;
  createUserSave: (key: string, save: GameConstructor) => void;
  setGameObj: (gameObj: GameInterface | null) => void;
  setCurrentTotalScore: (totalScore: number) => void;
  setCurrentLevelScore: (level: number, score: number) => void;
  setGameResult: (gameResult: GameResultPropsType) => void;
};

type PropsType = MapStatePropsType & MapDispatchPropsType;

const Canvas: React.FC<PropsType> = (props): JSX.Element => {
  const {
    isGameStarted,
    startGame,
    isAuth,
    gameObj,
    setGameObj,
    setGameResult,
  } = props;
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [isPause, setIsPause] = React.useState(false);
  const [sounds, setSounds] = React.useState(true);
  const [gameOverModalOpen, setGameOverModalOpen] = React.useState(false);
  const authKey = get('authKey');

  const newGame = (
    gameSettings: GameConstructor,
    authStatus: boolean,
    setTotalScore: (score: number) => void,
    setLevelScore: (lvl: number, score: number) => void,
  ) => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    const game = new Game(
      gameSettings,
      canvas!,
      context!,
      authStatus,
      setTotalScore,
      setLevelScore,
    );
    game.start();
    setGameObj(game);
  };

  const handleOpenSaves = () => {
    setOpen(true);
    props.loadUserSaves(authKey);
  };

  const handleCloseSaves = () => {
    setOpen(false);
  };

  const gameLauncher = () => {
    startGame(true);
  };

  const handleSave = () => {
    if (gameObj && isAuth) {
      const save = gameObj.getCurrentGameState();
      props.createUserSave(authKey, save);
    }
  };

  const handleLoad = () => {
    if (gameObj && isAuth) {
      handleOpenSaves();
      setIsPause(true);
      gameObj.setIsPause(true);
    }
  };

  const handlePause = () => {
    if (gameObj) {
      setIsPause(!isPause);
      gameObj.setIsPause(!isPause);
    }
  };

  const handleSound = () => {
    if (gameObj) {
      setSounds(!sounds);
      gameObj.setIsSound(!sounds);
    }
  };

  const handleNewGame = () => {
    if (gameObj) {
      setIsPause(false);
      gameObj.stopAnimation();
      newGame(
        initialGameData,
        isAuth,
        props.setCurrentTotalScore,
        props.setCurrentLevelScore,
      );
    }
  };

  const handleOpenGameOverModal = (gameResult: GameResultPropsType) => {
    setGameResult(gameResult);
    setGameOverModalOpen(true);
  };

  const handleCloseGameOverModal = () => {
    setGameOverModalOpen(false);
    handleNewGame();
  };

  const keyListener = (e: KeyboardEvent) => {
    switch (e.code) {
      case KEYS.KEY_Z:
        handleSave();
        break;
      case KEYS.KEY_X:
        handleLoad();
        break;
      case KEYS.KEY_C:
        handlePause();
        break;
      case KEYS.KEY_V:
        handleSound();
        break;
      case KEYS.KEY_B:
        handleNewGame();
        break;
      default:
        break;
    }
  };

  useEffect(() => {
    if (isGameStarted && !gameObj) {
      newGame(
        initialGameData,
        isAuth,
        props.setCurrentTotalScore,
        props.setCurrentLevelScore,
        // handleOpenGameOverModal,
      );
    }
    window.addEventListener('keydown', keyListener);
    return () => {
      window.removeEventListener('keydown', keyListener);
    };
  });

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
              <CSSTransition
                in={isPause}
                timeout={500}
                classNames={classes.paused}
                unmountOnExit
              >
                <div className={classes.pause}>
                  <p>
                    G<span className="ocean-letter">A</span>ME
                  </p>
                  <p>
                    P<span className="ocean-letter">A</span>USED
                  </p>
                </div>
              </CSSTransition>
              <canvas
                className={classes.canvasElement}
                ref={canvasRef}
                width={gameWidth}
                height={gameHeight}
              />
              <ButtonGroup
                variant="text"
                aria-label="button group"
                color="inherit"
                size="large"
                className={classes.buttons}
              >
                {isAuth && (
                  <Button startIcon={<SaveIcon />} onClick={handleSave}>
                    Save
                  </Button>
                )}
                {isAuth && (
                  <Button startIcon={<PublishIcon />} onClick={handleLoad}>
                    Load
                  </Button>
                )}
                <Button
                  startIcon={isPause ? <PlayArrowIcon /> : <PauseIcon />}
                  style={{ width: '100px' }}
                  onClick={handlePause}
                >
                  {isPause ? 'Play' : 'Pause'}
                </Button>
                <Button
                  startIcon={sounds ? <VolumeUpIcon /> : <VolumeOffIcon />}
                  style={{ width: '120px' }}
                  onClick={handleSound}
                >
                  {sounds ? 'Mute' : 'Unmute'}
                </Button>
                <Button
                  startIcon={<VideogameAssetIcon />}
                  onClick={handleNewGame}
                >
                  New game
                </Button>
              </ButtonGroup>
              <GameOverModalW
                gameOverModalOpen={gameOverModalOpen}
                handleCloseGameOverModal={handleCloseGameOverModal}
              />
            </div>
          </CSSTransition>
          {!isGameStarted && (
            <>
              <button
                className="start-button"
                type="button"
                onClick={gameLauncher}
              >
                Start game
              </button>
              <GameInstruction />
            </>
          )}
        </div>
      </div>
      {isAuth && (
        <SavesW
          gameObj={gameObj}
          open={open}
          handleClose={handleCloseSaves}
          isPause={isPause}
          setIsPause={setIsPause}
        />
      )}
    </main>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  isGameStarted: state.gameData.isGameStarted,
  isAuth: state.authData.isAuth,
  gameObj: state.gameData.gameObj,
});

const CanvasW = connect(mapStateToProps, {
  ...gameActions,
  loadUserSaves,
  createUserSave,
  setCurrentTotalScore,
  setCurrentLevelScore,
})(Canvas);

export default CanvasW;
