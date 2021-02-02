import {
  blockHeight,
  blockWidth,
  bonusWidth,
  gameHeight,
  gameWidth,
  KEYS,
} from './constants';
import { preload, sounds } from './utils/preload';
import Ball from './Ball';
import Platform from './Platform';
import Block from './Block';
import isBonusGenerated from './helpers/isBonusGenerated';
import Bonus from './Bonus';
import {
  BallInterface,
  BlockConstructor,
  BlockInterface,
  BonusConstructor,
  BonusInterface,
  GameConstructor,
  GameInterface,
  PlatformInterface,
} from './interfaces';
import blocksLevelsData from './blocksLevelsData';
import bgLevelsGradientsData from './bgLevelsGradientsData';
import { GameResultPropsType } from '../../types/types';

export default class Game implements GameInterface {
  currentLevel: number;
  numberOfLives: number;
  score: number;
  numberOfMisses: number;
  ball: BallInterface;
  platform: PlatformInterface;
  blocks: BlockInterface[];
  isPause: boolean;
  bonuses: BonusInterface[];
  isSoundOn: boolean;
  canvas: HTMLCanvasElement;
  ctx: CanvasRenderingContext2D;
  totalScore: number;
  animationFrameId: number;
  authStatus: boolean;
  setTotalScore: (score: number) => void;
  setLevelScore: (lvl: number, score: number) => void;
  isEnd: boolean;
  handleOpenGameOverModal: (args: GameResultPropsType) => void;

  constructor(
    props: GameConstructor,
    canvas: HTMLCanvasElement,
    ctx: CanvasRenderingContext2D,
    authStatus: boolean,
    setTotalScore: (score: number) => void,
    setLevelScore: (lvl: number, score: number) => void,
    handleOpenGameOverModal: (args: GameResultPropsType) => void,
  ) {
    this.canvas = canvas;
    this.ctx = ctx;
    this.currentLevel = props.initLevel;
    this.numberOfLives = props.numberOfLives;
    this.score = props.score;
    this.numberOfMisses = props.numberOfMisses;
    this.ball = new Ball(props.ballData, this.ctx);
    this.platform = new Platform(props.platformData, this.ctx);
    this.blocks = blocksLevelsData[this.currentLevel].map(
      (block: BlockConstructor) => new Block(block, this.ctx),
    );
    this.bonuses = [];
    this.isSoundOn = props.isSound;
    this.isPause = false;
    this.animationFrameId = 0;
    this.totalScore = 0;
    this.authStatus = authStatus;
    this.setTotalScore = setTotalScore;
    this.setLevelScore = setLevelScore;
    this.isEnd = false;
    this.handleOpenGameOverModal = handleOpenGameOverModal;
  }

  addListeners = (): void => {
    window.addEventListener('keydown', (e) => {
      if (!this.isEnd) {
        switch (e.code) {
          case KEYS.ARROW_UP:
            this.ball.start();
            break;
          case KEYS.LEFT:
          case KEYS.RIGHT:
            this.platform.start(e.code);
            break;
          default:
            break;
        }
      }
    });

    window.addEventListener('keyup', () => {
      if (!this.isEnd) {
        this.platform.stop();
      }
    });

    this.canvas.addEventListener('mousemove', (e) => {
      if (!this.isEnd) {
        this.platform.moveWithMouse(e);
        this.platform.collideBoundsWithMouse(e);
      }
    });

    this.canvas.addEventListener('click', () => {
      if (!this.isEnd) {
        this.ball.start();
      }
    });
  };

  start = (): void => {
    this.addListeners();

    let start: number | null = null;
    const fpsDivider = 16;
    const render = (timestamp: number) => {
      if (timestamp > start! + fpsDivider) {
        if (this.ctx && !this.getIsPause()) {
          this.draw();
          this.updateCurrentStateGame();
          start = timestamp;
        }
      }
      // @ts-ignore
      this.animationFrameId = window.requestAnimationFrame(render);
    };

    preload(() => {
      // @ts-ignore
      render();
    });
  };

  win = (): void => {
    this.handleOpenGameOverModal({ victory: true, score: this.score });
    this.clear();
  };

  lose = (): void => {
    this.handleOpenGameOverModal({ victory: false, score: this.score });
    this.clear();
  };

  clear = (): void => {
    this.stop();
    this.setScoreToBack();
    this.ball.setStartPosition();
    this.platform.setStartPosition();
  };

  nextLevel = (): void => {
    this.setScoreToBack();
    this.currentLevel += 1;
    this.ball.setStartPosition();
    this.platform.setStartPosition();
    this.blocks = blocksLevelsData[this.currentLevel].map(
      (block: BlockConstructor) => new Block(block, this.ctx),
    );
    this.clearBonuses();
  };

  load = (props: GameConstructor): void => {
    this.bonuses = [];
    this.currentLevel = props.initLevel;
    this.numberOfLives = props.numberOfLives;
    this.score = props.score;
    this.numberOfMisses = props.numberOfMisses;
    this.ball = new Ball(props.ballData, this.ctx);
    this.platform = new Platform(props.platformData, this.ctx);
    this.blocks = props.blocksData.map(
      (block: BlockConstructor) => new Block(block, this.ctx),
    );
    props.bonusesData!.map((bonus: BonusConstructor) => {
      return this.createBonus(
        bonus.x,
        bonus.y,
        bonus.spriteNumber,
        bonus.typeOfBonus,
        bonus.isUsed,
        bonus.isActive,
      );
    });
    this.isSoundOn = true;
    this.animationFrameId = 0;
  };

  stopAnimation = (): void => {
    window.cancelAnimationFrame(this.animationFrameId);
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
    this.ctx.fillRect(0, gameHeight - 35, 300, 40);
    this.ctx.fillRect(gameWidth - 200, gameHeight - 35, 200, 40);

    this.ctx.font = 'normal 20px Fredoka One';
    this.ctx.fillStyle = 'rgba(0,0,0,.6)';
    this.ctx.fillText(`Score: ${this.score}`, 10, gameHeight - 10);
    this.ctx.fillText(`Total: ${this.totalScore}`, 160, gameHeight - 10);
    this.ctx.fillText(
      `Lives: ${this.numberOfLives}`,
      gameWidth - 190,
      gameHeight - 10,
    );
    this.ctx.fillText(
      `Level: ${this.currentLevel + 1}`,
      gameWidth - 90,
      gameHeight - 10,
    );
  };

  ballIsCollide = (
    elemX: number,
    elemY: number,
    elemWidth: number,
    elemHeight: number,
  ): boolean => {
    const ballX = this.ball.getX() + this.ball.getDx();
    const ballY = this.ball.getY() + this.ball.getDy();

    return (
      ballX + this.ball.getWidth() > elemX &&
      ballX < elemX + elemWidth &&
      ballY + this.ball.getHeight() > elemY &&
      ballY < elemY + elemHeight
    );
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

  createBonus = (
    bonusInitX: number,
    bonusInitY: number,
    spriteNumber = 0,
    typeOfBonus = '',
    isUsed = false,
    isActive = true,
  ): void => {
    const initBonus: BonusConstructor = {
      ball: this.ball,
      platform: this.platform,
      x: bonusInitX,
      y: bonusInitY,
      spriteNumber,
      typeOfBonus,
      isUsed,
      isActive,
    };
    const bonus = new Bonus(initBonus);
    this.bonuses.push(bonus);
  };

  checkHitOnBlocks = (): void => {
    this.deleteNoActiveBlocks();
    this.blocks.forEach((block: BlockInterface) => {
      if (
        block.isActive() &&
        this.ballIsCollide(block.getX(), block.getY(), blockWidth, blockHeight)
      ) {
        if (!block.isIndestructibleBlock() && isBonusGenerated()) {
          const bonusInitX = block.getX() + bonusWidth / 2;
          const bonusInitY = block.getY() + block.getHeight();
          this.createBonus(bonusInitX, bonusInitY);
        }
        if (!block.isIndestructibleBlock()) {
          block.reduceLives();
          this.addScorePoint();
        }
        this.ball.changeDirection(block.getX(), block.getWidth());
        if (this.getIsSound()) {
          sounds.pim!.currentTime = 0;
          sounds.pim!.play();
        }
      }
    });
  };

  collidePlatformWithBall = (): void => {
    if (
      this.ballIsCollide(
        this.platform.getX(),
        this.platform.getY(),
        this.platform.getWidth(),
        this.platform.getHeight(),
      )
    ) {
      const platformTouchOffset = this.platform.getTouchOffset(
        this.ball.getTouchX(),
      );
      this.ball.platformBounce(this.platform.getDx(), platformTouchOffset);
      this.increaseBlockMiss();
    }
  };

  checkLifeLost = (): void => {
    if (this.ball.getY() > gameHeight && this.numberOfLives > 0) {
      this.reduceLives();
      this.ball.setStartPosition();
      this.platform.setStartPosition();
      this.clearBonuses();
      if (this.numberOfLives < 1) {
        this.lose();
      }
    }
  };

  updateCurrentStateGame = (): void => {
    if (!this.isEnd) {
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
      this.checkAllBlocksAreDestroyed();
    }
  };

  checkAllBlocksAreDestroyed = (): void => {
    const numberOfBlocks = this.blocks.length;
    const numberOfIndestructibleBlocks = this.blocks.reduce(
      (total, block) => (block.isIndestructibleBlock() ? total + 1 : total),
      0,
    );

    if (numberOfBlocks - numberOfIndestructibleBlocks === 0) {
      if (this.currentLevel + 1 < 10) {
        this.nextLevel();
      } else {
        this.win();
      }
    }
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
    initLevel: this.currentLevel,
    numberOfLives: this.numberOfLives,
    numberOfMisses: this.numberOfMisses,
    score: this.score,
    ballData: this.ball.getCurrentBallData(),
    platformData: this.platform.getCurrentPlatformData(),
    blocksData: this.blocks.map((block: BlockInterface) =>
      block.getCurrentBlockData(),
    ),
    bonusesData: this.bonuses.map((bonus: BonusInterface) =>
      bonus.getCurrentBonusData(),
    ),
    isSound: this.isSoundOn,
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

  setIsSound = (option: boolean): void => {
    this.isSoundOn = option;
  };

  getIsSound = (): boolean => this.isSoundOn;

  stop = (): void => {
    this.isEnd = true;
  };

  getAuthStatus = (): boolean => this.authStatus;

  updateTotalScore = (): void => {
    this.totalScore += this.score;
  };

  clearScore = (): void => {
    this.score = 0;
  };

  setScoreToBack = (): void => {
    if (this.getAuthStatus()) {
      this.updateTotalScore();
      this.setTotalScore(this.totalScore);
      this.setLevelScore(this.currentLevel + 1, this.score);
      this.clearScore();
    }
  };
}
