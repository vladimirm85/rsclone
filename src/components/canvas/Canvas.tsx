import React, { useRef, useEffect } from 'react';

// Import elements
import Ball from './Ball';
import Platform from './Platform';

// Import constants
import {
  KEYS,
  gameWidth,
  gameHeight,
  platformStartSettings,
  ballStartSettings,
  // BallSettings,
} from './constants';
import { sounds, preload, sprites } from './utils/preload';
import Game from './Game';

// const spritesLinks = [bgSprite, ballSprite, platformSprite, blockSprite];
// const soundsLinks = [collideSound];
const ball: any = new Ball(
  // ballStartSettings: BallSettings
  ballStartSettings.velocity,
  ballStartSettings.dx,
  ballStartSettings.dy,
  ballStartSettings.x,
  ballStartSettings.y,
  ballStartSettings.frame,
  ballStartSettings.width,
  ballStartSettings.height,
  ballStartSettings.isRun,
);
const platform = new Platform(
  platformStartSettings.velocity,
  platformStartSettings.dx,
  platformStartSettings.x,
  platformStartSettings.y,
  platformStartSettings.width,
  platformStartSettings.height,
);

const game = new Game(ball, platform);
console.log(game);

const Canvas: React.FC = (): JSX.Element => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  // const [isRunning, setIsRunning] = useState(true);
  // const [score, setScore] = useState(0);

  const rows = 5;
  const cols = 10;
  const blocks: Block[] = [];

  // const livesCount = 3; // TODO: PUT IN STATE

  const renderBlocks = (ctx: any) => {
    blocks.forEach((elem) => {
      if (elem.active) {
        ctx.drawImage(sprites.block, elem.x, elem.y);
      }
    });

    // blocksData.forEach((elem) => { // TODO:
    //   if (elem.active) {
    //     ctx.drawImage(elem.sprite, elem.x, elem.y);
    //   }
    // });
  };

  const draw = (ctx: CanvasRenderingContext2D): void => {
    ctx.clearRect(0, 0, gameWidth, gameHeight);
    ctx.drawImage(sprites.bg!, 0, 0);
    // ctx.drawImage(blocksData.bg!, 0, 0); // TODO: DRAW BG ON CURRENT LEVEL

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
    // ctx.drawImage( // TODO: DRAW BALL ON CURRENT LEVEL
    //   sprites.ball!, // TODO: smth.ball
    //   ball.frame * ball.width, // TODO: ballData.frame...
    //   0,
    //   ball.width, // TODO: ballData.width....
    //   ball.height,
    //   ball.x,
    //   ball.y,
    //   ball.width,
    //   ball.height,
    // );
    ctx.drawImage(sprites.platform!, platform.x, platform.y);

    renderBlocks(ctx); //  TODO: Create blocks here
    // renderBlocks(ctx);  // TODO: go to =>
  };

  interface Block {
    active: boolean;
    width: number;
    height: number;
    x: number;
    y: number;
    setActiveStatus: any;
    isActive: any;
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
          setActiveStatus(option: boolean) {
            if (option) {
              // eslint-disable-next-line react/no-this-in-sfc
              this.active = true;
            }
            // eslint-disable-next-line react/no-this-in-sfc
            this.active = false;
          },
          isActive(): boolean {
            // eslint-disable-next-line react/no-this-in-sfc
            return this.active;
          },
        });
      }
    }
  };

  const destroyBlocks = () => {
    blocks.forEach((block) => {
      if (block.isActive() && ball.isCollide(block)) {
        // eslint-disable-next-line no-param-reassign
        block.setActiveStatus(false);
        ball.changeDirection();
        sounds.pim!.currentTime = 0;
        sounds.pim!.play();
      }
    });
  };

  const collidePlatform = () => {
    if (ball.isCollide(platform)) {
      const platformTouchOffset = platform.getTouchOffset(ball.getTouchX());
      ball.platformBounce(platform.getDx(), platformTouchOffset);
    }
  };

  const update = () => {
    // TODO: RENAME!!!
    destroyBlocks();
    collidePlatform();
    ball.collideBounds();
    platform.collideBounds();
    // platform.move(ball.getRunStatus(), ball.moveWithPlatform);
    // platform.move(ball);
    platform.move();
    if (!ball.getRunStatus()) {
      ball.moveWithPlatform(platform.getDx());
    } else {
      ball.move();
    }
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
    // game = new Game (objectOnSave || new);

    const render = () => {
      if (context) draw(context);
      // if (context) game.draw(context);
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

  return <canvas ref={canvasRef} width={gameWidth} height={gameHeight} />;
};

export default Canvas;

// TODO: Create new Game class
// function draw(ctx) {
//   ctx.drawImgae(bg);
//   ball.draw(ctx);
//   platform.draw(ctx);
//   blocksData.forEach((blocks) => {
//     block.draw(ctx)
//   })
// }
