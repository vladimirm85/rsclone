import { gameHeight, gameWidth, KEYS } from './constants';
import { sounds } from './utils/preload';
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
import blocksLevelsData from './blocksLevelsData';
import bgLevelsGradientsData from './bgLevelsGradientsData';

export default class Game implements GameInterface {
  currentLevel: number;
  numberOfLives: number;
  score: number;
  numberOfMisses: number;
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
    this.numberOfMisses = props.numberOfMisses;
    this.ctx = ctx;
    this.ball = new Ball(props.ballData, this.ctx);
    this.platform = new Platform(props.platformData, this.ctx);
    // this.blocksInAllLevels = blocksInAllLevels;
    this.blocksData = props.blocksData;
    this.blocks = blocksLevelsData[this.currentLevel].map(
      (block: BlockDataInterface, i: number) => new Block(block, this.ctx),
    );
    this.bonuses = [];
    this.isPause = false;
  }

  addListeners = (): void => {
    window.addEventListener('keydown', (e) => {
      switch (e.code) {
        case KEYS.ARROW_UP:
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

  draw = (): void => {
    this.ctx.clearRect(0, 0, gameWidth, gameHeight);

    const bgGradient = this.ctx.createLinearGradient(
      33,
      0,
      gameWidth,
      gameHeight,
    );

    bgGradient.addColorStop(
      0,
      bgLevelsGradientsData[this.currentLevel].colorLeft,
    );
    bgGradient.addColorStop(
      1,
      bgLevelsGradientsData[this.currentLevel].colorRight,
    );

    this.ctx.fillStyle = bgGradient;
    this.ctx.fillRect(0, 0, gameWidth, gameHeight);

    this.ball.draw();
    this.platform.draw();

    this.blocks.forEach((block) => {
      if (block.isActive()) {
        block.draw(this.ctx);
      }
    });

    if (this.bonuses) {
      this.bonuses.forEach((bonus) => {
        bonus.draw(this.ctx);
      });
    }

    this.ctx.fillStyle = 'rgba(255,255,255,.3)';
    this.ctx.fillRect(0, gameHeight - 35, 150, 40);
    this.ctx.fillRect(gameWidth - 80, gameHeight - 35, 80, 40);

    this.ctx.font = 'normal 20px sans-serif';
    this.ctx.fillStyle = 'white';
    this.ctx.fillText(`Score: ${this.score}`, 10, gameHeight - 10);

    for (let i = 0; i < this.numberOfLives; i += 1) {
      this.ctx.beginPath();
      this.ctx.fillStyle = '#FFFB00';
      this.ctx.arc(gameWidth - 60 + 20 * i, gameHeight - 17, 5, 0, 2 * Math.PI);
      this.ctx.fill();
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

  checkHitOnBlocks = (): void => {
    this.deleteNoActiveBlocks();
    this.blocks.forEach((block: BlockInterface) => {
      if (block.isActive() && this.ballIsCollide(block)) {
        if (!block.isIndestructibleBlock() && isBonusGenerated()) {
          this.spawnNewBonus(block);
        }
        if (!block.isIndestructibleBlock()) block.reduceLives();
        this.ball.changeDirection(block.getX(), block.getWidth());
        this.addScorePoint();
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
      this.increaseBlockMiss();
    }
  };

  checkLifeLost = (): void => {
    if (this.ball.getY() > gameHeight && this.numberOfLives > 0) {
      console.log('Reduce life!');
      this.reduceLives();
      this.ball.setStartPosition();
      this.platform.setStartPosition();
      this.clearBonuses();
      if (this.numberOfLives === 0) {
        console.log('GAME OVER');
      }
    }
  };

  updateCurrentStateGame = (): void => {
    this.checkLifeLost();
    this.checkHitOnBlocks();
    this.bonusIsCollide();
    this.collidePlatformWithBall();
    if (this.ball.collideBounds()) {
      this.increaseBlockMiss();
    }
    this.platform.collideBounds();
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
    // this.checkGameIsEnd(); // TODO !! and implement game end with Indestructible blocks
  };

  addScorePoint = (): void => {
    this.score += 100 * this.getScoreRatio();
    this.resetBlockMisses();
  };

  getScoreRatio = (): number => {
    return +(1 / this.numberOfMisses).toFixed(1);
  };

  increaseBlockMiss = (): void => {
    this.numberOfMisses += 1;
  };

  resetBlockMisses = (): void => {
    this.numberOfMisses = 1;
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

  reduceLives = (): void => {
    this.numberOfLives -= 1;
  };

  clearBonuses = (): void => {
    this.bonuses = [];
  };

  setIsPause = (option: boolean): void => {
    this.isPause = option;
  };

  getIsPause = (): boolean => this.isPause;
}
