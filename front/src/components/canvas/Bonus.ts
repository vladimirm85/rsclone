import { typesOfBonuses } from './constants';
import getRandomValue from './helpers/getRandomValue';
import { sprites } from './utils/preload';
import {
  BallInterface,
  BonusConstructor,
  BonusInterface,
  BonusTypesMethods,
  PlatformInterface,
} from './interfaces';

export default class Bonus implements BonusInterface {
  dy: number;
  x: number;
  y: number;
  width: number;
  height: number;
  ball: BallInterface;
  platform: PlatformInterface;
  spriteNumber: number;
  typeOfBonus: string;
  isUsed: boolean;
  isActive: boolean;

  constructor(props: BonusConstructor) {
    ({
      ball: this.ball,
      platform: this.platform,
      x: this.x,
      y: this.y,
      spriteNumber: this.spriteNumber,
      typeOfBonus: this.typeOfBonus,
      isUsed: this.isUsed,
      isActive: this.isActive,
    } = props);
    this.dy = 2;
    this.width = 40;
    this.height = 20;
    if (!this.typeOfBonus) {
      this.initBonus();
    }
  }

  initBonus = () => {
    const getRandomBonusNumber = Math.floor(
      getRandomValue(0, typesOfBonuses.length - 1),
    );
    const currentBonus = typesOfBonuses[getRandomBonusNumber];
    this.spriteNumber = currentBonus.sprite;
    this.typeOfBonus = currentBonus.typeOfBonus;
  };

  draw = (ctx: CanvasRenderingContext2D): void => {
    ctx.drawImage(
      sprites.bonus!,
      this.width * this.spriteNumber,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  };

  move = (): void => {
    if (this.dy) {
      this.y += +this.dy;
    }
  };

  platformSizeDecrease = (): void => {
    this.platform.changeSize('decrease');
  };

  platformSizeIncrease = (): void => {
    this.platform.changeSize('increase');
  };

  ballSpeedDecrease = (): void => {
    this.ball.changeSpeed('decrease');
  };

  ballSpeedIncrease = (): void => {
    this.ball.changeSpeed('increase');
  };

  apply = (): void => {
    if (!this.isUsed) {
      this.isUsed = true;
      this[this.typeOfBonus as BonusTypesMethods]();
    }
  };

  bonusTurnOff = (): void => {
    this.isActive = false;
  };

  getCurrentBonusData = (): BonusConstructor => ({
    ball: this.ball,
    platform: this.platform,
    x: this.x,
    y: this.y,
    spriteNumber: this.spriteNumber,
    typeOfBonus: this.typeOfBonus,
    isUsed: this.isUsed,
    isActive: this.isActive,
  });

  getActiveStatus = (): boolean => this.isActive!;

  getX = (): number => this.x;

  getY = (): number => this.y;

  getWidth = (): number => this.width;

  getHeight = (): number => this.height;
}
