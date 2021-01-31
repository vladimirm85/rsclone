import { blockHeight, blockWidth } from './constants';
import { BlockDataInterface, BlockInterface } from './interfaces';

export default class Block implements BlockInterface {
  x: number;
  y: number;
  lives: number;
  colorLeft: string;
  colorRight: string;
  ctx: CanvasRenderingContext2D;
  opacityRatio: number;
  isIndestructible: boolean;

  constructor(props: BlockDataInterface, ctx: CanvasRenderingContext2D) {
    ({
      x: this.x,
      y: this.y,
      lives: this.lives,
      colorLeft: this.colorLeft,
      colorRight: this.colorRight,
      isIndestructible: this.isIndestructible,
    } = props);
    this.ctx = ctx;
    this.opacityRatio = 1 / this.lives;
  }

  draw = (): void => {
    // TODO: Delete ctx

    const gradient = this.ctx.createLinearGradient(
      this.x,
      this.y,
      blockWidth + this.x,
      blockHeight + this.y,
    );

    gradient.addColorStop(
      0,
      `rgba(${this.colorLeft},${this.lives * this.opacityRatio})`,
    );
    gradient.addColorStop(
      1,
      `rgba(${this.colorRight},${this.lives * this.opacityRatio})`,
    );

    this.ctx.fillStyle = gradient;
    this.ctx.fillRect(this.x, this.y, blockWidth, blockHeight);
  };

  reduceLives = (): void => {
    this.lives -= 1;
  };

  getCurrentBlockData = (): BlockDataInterface => ({
    x: this.x,
    y: this.y,
    lives: this.lives,
    colorLeft: this.colorLeft,
    colorRight: this.colorRight,
    isIndestructible: this.isIndestructible,
  });

  isActive = (): boolean => !!this.lives;

  isIndestructibleBlock = (): boolean => this.isIndestructible;

  getX = (): number => this.x;

  getY = (): number => this.y;

  getWidth = (): number => blockWidth;

  getHeight = (): number => blockHeight;
}
