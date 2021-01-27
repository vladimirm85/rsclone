import React, { useRef, useEffect } from 'react';
import './canvas.scss';

// Import constants
import { gameWidth, gameHeight, initialGameData } from './constants';
import { preload } from './utils/preload';
import Game from './Game';

const Canvas: React.FC = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    let animationFrameId: number;

    const game = new Game(initialGameData, context!);
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

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  });

  return (
    <main>
      <div className="container-inner">
        <div className="game-content">
          <canvas ref={canvasRef} width={gameWidth} height={gameHeight} />
        </div>
      </div>
    </main>
  );
};

export default Canvas;
