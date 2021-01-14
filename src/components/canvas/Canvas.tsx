import React, { useRef, useEffect } from 'react';
import './canvas.scss';

// Import sprites
import bgSprite from './assets/img/background.png';
import ballSprite from './assets/img/ball.png';
import platformSprite from './assets/img/platform.png';
import blockSprite from './assets/img/block.png';

// Import sounds
// @ts-ignore
import collideSound from './assets/sound/pim.mp3';

// Import elements
import Ball from './Ball';
import Platform from './Platform';

// Import constants
import { KEYS, width, height } from './constants';

const spritesLinks = [bgSprite, ballSprite, platformSprite, blockSprite];
const soundsLinks = [collideSound];

const ball: any = new Ball();
const platform = new Platform();

const Canvas: React.FC = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // const [isRunning, setIsRunning] = useState(true);
  // const [score, setScore] = useState(0);

  const rows = 5;
  const cols = 10;
  const blocks: Block[] = [];
  // const livesCount = 3; // TODO: PUT IN STATE
  let pimSound: any;

  type HTMLOrNull = HTMLImageElement | null;

  interface Sprites {
    bg: HTMLOrNull;
    ball: HTMLOrNull;
    platform: HTMLOrNull;
    block: HTMLOrNull;
  }

  const sprites: Sprites = {
    bg: null,
    ball: null,
    platform: null,
    block: null,
  };

  const preloadSprites = (onResourceLoad: () => void) => {
    Object.keys(sprites).forEach((elem, i: number) => {
      sprites[elem as keyof Sprites] = new Image();
      sprites[elem as keyof Sprites]!.src = spritesLinks[i];
      sprites[elem as keyof Sprites]!.addEventListener('load', onResourceLoad);
    });
  };

  const preloadSound = (onResourceLoad: () => void) => {
    pimSound = new Audio(soundsLinks[0]);
    pimSound.addEventListener('canplaythrough', onResourceLoad, {
      once: true,
    });
  };

  const preload = (callback: () => void) => {
    let loaded = 0;
    const required = Object.keys(sprites).length + 1;

    const onResourceLoad = () => {
      loaded += 1;

      if (loaded >= required) {
        callback();
      }
    };

    preloadSprites(onResourceLoad);
    preloadSound(onResourceLoad);
  };

  const renderBlocks = (ctx: any) => {
    blocks.forEach((elem) => {
      if (elem.active) {
        ctx.drawImage(sprites.block, elem.x, elem.y);
      }
    });
  };

  const draw = (ctx: CanvasRenderingContext2D): void => {
    ctx.clearRect(0, 0, width, height);
    ctx.drawImage(sprites.bg!, 0, 0);

    ctx.drawImage(
      sprites.ball!,
      ball.frame * ball.width,
      0,
      ball.width,
      ball.height,
      ball.x,
      ball.y,
      ball.width,
      ball.height,
    );
    ctx.drawImage(sprites.platform!, platform.x, platform.y);

    renderBlocks(ctx); //  TODO: Create blocks here
  };

  interface Block {
    active: boolean;
    width: number;
    height: number;
    x: number;
    y: number;
  }

  const create = () => {
    for (let row = 0; row < rows; row += 1) {
      for (let col = 0; col < cols; col += 1) {
        blocks.push({
          active: true,
          width: 50,
          height: 18,
          x: 65 * col + 65,
          y: 30 * row + 35,
        });
      }
    }
  };

  const movePlatform = (): void => {
    if (platform.dx) {
      platform.x += platform.dx;
      if (!ball.isRun) {
        ball.x += platform.dx;
      }
    }
  };

  const collideBlocks = () => {
    blocks.forEach((block) => {
      if (block.active && ball.collide(block)) {
        // eslint-disable-next-line no-param-reassign
        block.active = false;
        ball.bumpBlock();
        pimSound.currentTime = 0;
        pimSound.play();
      }
    });
  };

  const bumpPlatform = () => {
    if (platform.dx) {
      ball.x += platform.dx;
    }

    if (ball.dy > 0) {
      ball.dy = -ball.velocity;
      const touchX = ball.x + ball.width / 2;
      ball.dx = ball.velocity * platform.getTouchOffset(touchX);
    }
  };

  const collidePlatform = () => {
    if (ball.collide(platform)) {
      bumpPlatform();
    }
  };

  const update = () => {
    collideBlocks();
    collidePlatform();
    ball.collideBounds();
    platform.collideBounds();
    movePlatform();
    ball.move();
  };

  const addListeners = () => {
    window.addEventListener('keydown', (e) => {
      if (e.code === KEYS.SPACE) {
        ball.start();
      } else if (e.code === KEYS.LEFT || e.code === KEYS.RIGHT) {
        platform.start(e.code);
      }
    });

    window.addEventListener('keyup', () => {
      platform.stop();
    });
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas?.getContext('2d');
    let animationFrameId: number;
    addListeners();

    const render = () => {
      if (context) draw(context);
      animationFrameId = window.requestAnimationFrame(() => {
        update();
        render();
      });
    };

    preload(() => {
      create();
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
          <canvas ref={canvasRef} width={width} height={height} />
        </div>
      </div>
    </main>
  );
};

export default Canvas;
