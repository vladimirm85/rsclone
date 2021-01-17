import {
  BallInterface,
  BlocksData,
  BlockInterface,
  GameConstructor,
  gameHeight,
  GameInterface,
  gameWidth,
  KEYS,
  PlatformInterface,
  BlockDataInterface,
} from './constants';
import { sounds, sprites } from './utils/preload';
import Ball from './Ball';
import Platform from './Platform';
import Block from './Block';

export default class Game implements GameInterface {
  currentLevel: number;
  numberOfLives: number;
  score: number;
  ball: BallInterface;
  platform: PlatformInterface;
  // blocksInAllLevels: BlocksData[];
  blocksData: BlocksData;
  blocks: BlockInterface[];
  isPause: boolean;

  // TODO: add TOTAL SCORE
  constructor(props: GameConstructor) {
    this.currentLevel = props.initLevel;
    this.numberOfLives = props.numberOfLives;
    this.score = props.score;
    this.ball = new Ball(props.ballData);
    this.platform = new Platform(props.platformData);
    // this.blocksInAllLevels = blocksInAllLevels;
    this.blocksData = props.blocksData;
    this.blocks = props.blocksData.map(
      (block: BlockDataInterface) => new Block(block),
    );
    this.isPause = false;
  }

  addListeners = (): void => {
    // TODO: SWITCH!
    window.addEventListener('keydown', (e) => {
      if (e.code === KEYS.SPACE) {
        this.ball.start();
      } else if (e.code === KEYS.LEFT || e.code === KEYS.RIGHT) {
        this.platform.start(e.code);
      } else if (e.code === KEYS.Z) {
        this.isPause = !this.isPause;
      }
    });

    window.addEventListener('keyup', () => {
      this.platform.stop();
    });
  };

  draw = (ctx: CanvasRenderingContext2D): void => {
    ctx.clearRect(0, 0, gameWidth, gameHeight);
    ctx.drawImage(sprites.bg!, 0, 0);
    // ctx.drawImage(blocksData.bg!, 0, 0); // TODO: DRAW BG ON CURRENT LEVEL

    this.ball.draw(ctx);
    this.platform.draw(ctx);

    this.blocks.forEach((block) => {
      if (block.isActive()) {
        block.draw(ctx);
      }
    });
  };

  ballIsCollide = (elem: BlockInterface | PlatformInterface): boolean => {
    const ballX = this.ball.x + this.ball.dx;
    const ballY = this.ball.y + this.ball.dy;

    if (
      ballX + this.ball.width > elem.x &&
      ballX < elem.x + elem.width &&
      ballY + this.ball.height > elem.y &&
      ballY < elem.y + elem.height
    ) {
      return true;
    }
    return false;
  };

  destroyBlocks = (): void => {
    this.blocks.forEach((block) => {
      if (block.isActive() && this.ballIsCollide(block)) {
        block.reduceLives();
        this.ball.changeDirection(block.getBlockX(), block.getBlockWidth());
        sounds.pim!.currentTime = 0;
        sounds.pim!.play();
      }
    });
  };

  collidePlatformWithBall = (): void => {
    if (this.ballIsCollide(this.platform)) {
      const platformTouchOffset = this.platform.getTouchOffset(
        this.ball.getTouchX(),
      );
      this.ball.platformBounce(this.platform.getDx(), platformTouchOffset);
    }
  };

  checkCurrentStateGame = (): void => {
    this.destroyBlocks();
    this.collidePlatformWithBall();
    this.ball.collideBounds();
    this.platform.collideBounds();
    this.platform.move();
    if (!this.ball.getRunStatus()) {
      this.ball.moveWithPlatform(this.platform.getDx());
    } else {
      this.ball.move();
    }
  };

  getCurrentGameState = () => ({
    numberOfLives: this.numberOfLives,
    score: this.score,
    ballData: this.ball.getCurrentBallData(),
    platformData: this.platform.getCurrentPlatformData(),
    blocksData: this.blocks.map((block) => block.getCurrentBlockData()),
  });

  setIsPause = (option: boolean): void => {
    this.isPause = option;
  };

  getIsPause = (): boolean => this.isPause;
}
