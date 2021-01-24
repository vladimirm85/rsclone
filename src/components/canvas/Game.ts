import { gameHeight, gameWidth, KEYS } from './constants';
import { sounds, sprites } from './utils/preload';
import Ball from './Ball';
import Platform from './Platform';
import Block from './Block';
import isBonusGenerated from './helpers/isBonusGenerated';
import Bonus from './Bonus';
import {
  BallInterface,
  BlockDataInterface,
  BlockInterface,
  BlocksData,
  BonusInterface,
  GameConstructor,
  GameInterface,
  PlatformInterface,
} from './interfaces';

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
  bonuses: BonusInterface[];
  ctx: CanvasRenderingContext2D;

  // TODO: add TOTAL SCORE
  constructor(props: GameConstructor, ctx: CanvasRenderingContext2D) {
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
    this.bonuses = [];
    this.isPause = false;
    this.ctx = ctx;
  }

  addListeners = (): void => {
    window.addEventListener('keydown', (e) => {
      switch (e.code) {
        case KEYS.SPACE:
          this.ball.start();
          break;
        case KEYS.LEFT:
        case KEYS.RIGHT:
          this.platform.start(e.code);
          break;
        case KEYS.Z:
          this.isPause = !this.isPause;
          break;
        default:
          break;
      }
    });

    window.addEventListener('keyup', () => {
      this.platform.stop();
    });
  };

  draw = (ctx: CanvasRenderingContext2D): void => {
    ctx.clearRect(0, 0, gameWidth, gameHeight);
    ctx.drawImage(sprites.bg!, 0, 0);

    this.ball.draw(ctx);
    this.platform.draw(ctx);

    this.blocks.forEach((block) => {
      if (block.isActive()) {
        block.draw(ctx);
      }
    });

    if (this.bonuses) {
      this.bonuses.forEach((bonus) => {
        bonus.draw(ctx);
      });
    }
  };

  ballIsCollide = (elem: BlockInterface | PlatformInterface): boolean => {
    const ballX = this.ball.getX() + this.ball.getDx();
    const ballY = this.ball.getY() + this.ball.getDy();

    if (
      ballX + this.ball.getWidth() > elem.getX() &&
      ballX < elem.getX() + elem.getWidth() &&
      ballY + this.ball.getHeight() > elem.getY() &&
      ballY < elem.getY() + elem.getHeight()
    ) {
      return true;
    }
    return false;
  };

  bonusIsCollide = (): void => {
    if (this.bonuses.length) {
      this.bonuses.forEach((bonus) => {
        if (
          bonus.getX() + bonus.getWidth() > this.platform.getX() &&
          bonus.getX() < this.platform.getX() + this.platform.getWidth() &&
          bonus.getY() + bonus.getHeight() > this.platform.getY() &&
          bonus.getY() < this.platform.getY() + this.platform.getHeight()
        ) {
          bonus.apply();
          this.bonusDelete(bonus);
        } else if (bonus.getY() + bonus.getHeight() > gameHeight) {
          if (bonus.getActiveStatus()) {
            bonus.bonusTurnOff();
            this.bonusDelete(bonus);
          }
        }
      });
    }
  };

  bonusDelete = (bonus: BonusInterface): void => {
    const bonusIndex = this.bonuses.indexOf(bonus);
    this.bonuses.splice(bonusIndex, 1);
  };

  spawnNewBonus = (block: BlockInterface): void => {
    const initBonus = {
      ball: this.ball,
      platform: this.platform,
      block,
    };
    const bonus = new Bonus(initBonus);
    this.bonuses.push(bonus);
  };

  checkHitsOnBlocks = (): void => {
    this.deleteNoActiveBlocks();
    this.blocks.forEach((block: BlockInterface) => {
      if (block.isActive() && this.ballIsCollide(block)) {
        if (isBonusGenerated()) {
          this.spawnNewBonus(block);
        }
        block.reduceLives();
        this.ball.changeDirection(block.getX(), block.getWidth());
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

  updateCurrentStateGame = (): void => {
    this.checkHitsOnBlocks();
    this.bonusIsCollide();
    this.collidePlatformWithBall();
    this.ball.collideBounds(); // TODO: BORDER!
    this.platform.collideBounds(); // TODO: BORDER!
    this.platform.move();
    if (!this.ball.getRunStatus()) {
      this.ball.moveWithPlatform(this.platform.getMiddlePlatformPosition());
    } else {
      this.ball.move();
    }
    if (this.bonuses.length) {
      this.bonuses.forEach((bonus) => {
        bonus.move();
      });
    }
  };

  getCurrentGameState = () => ({
    numberOfLives: this.numberOfLives,
    score: this.score,
    ballData: this.ball.getCurrentBallData(),
    platformData: this.platform.getCurrentPlatformData(),
    blocksData: this.blocks.map((block) => block.getCurrentBlockData()),
  });

  deleteNoActiveBlocks = (): void => {
    this.blocks = this.blocks.filter((block) => block.isActive());
  };

  setIsPause = (option: boolean): void => {
    this.isPause = option;
  };

  getIsPause = (): boolean => this.isPause;
}
