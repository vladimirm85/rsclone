import React, { useRef, useEffect } from 'react';

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

    const game = new Game(initialGameData);
    game.addListeners();

    const render = () => {
      if (context) game.draw(context);
      animationFrameId = window.requestAnimationFrame(() => {
        game.checkCurrentStateGame();
        render();
      });
    };

    preload(() => {
      // create(); // TODO ? POSSIBLY NEED
      render();
    });

    return () => {
      window.cancelAnimationFrame(animationFrameId);
    };
  });

  return <canvas ref={canvasRef} width={gameWidth} height={gameHeight} />;
};

export default Canvas;
