import React, { useRef, useEffect } from 'react';
import './canvas.scss';
import { connect } from 'react-redux';
import { CSSTransition } from 'react-transition-group';
import { AppStateType } from '../../store/store';
import gameActions from '../../store/action-creators/game-ac';
import './game.scss';

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
          game.draw(context);
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
            <canvas ref={canvasRef} width={gameWidth} height={gameHeight} />
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
    </main>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  isGameStarted: state.gameData.isGameStarted,
});

const CanvasW = connect(mapStateToProps, { ...gameActions })(Canvas);

export default CanvasW;
