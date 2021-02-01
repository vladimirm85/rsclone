import { KEYS, gameWidth, platformStartData } from './constants';
import { sprites } from './utils/preload';
import { PlatformConstructor, PlatformInterface } from './interfaces';

export default class Platform implements PlatformInterface {
  velocity: number;
  dx: number;
  x: number;
  y: number;
  width: number;
  height: number;
  size: number;
  ctx: CanvasRenderingContext2D;

  constructor(props: PlatformConstructor, ctx: CanvasRenderingContext2D) {
    ({
      velocity: this.velocity,
      dx: this.dx,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      size: this.size,
    } = props);
    this.ctx = ctx;
  }

  draw = (): void => {
    this.ctx.drawImage(
      sprites.platform!,
      0,
      this.size * this.height,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  };

  start = (direction: string): void => {
    if (direction === KEYS.LEFT) {
      this.dx = -this.velocity;
    } else if (direction === KEYS.RIGHT) {
      this.dx = this.velocity;
    }
  };

  stop = (): void => {
    this.dx = 0;
  };

  setStartPosition = (): void => {
    this.velocity = platformStartData.velocity;
    this.dx = platformStartData.dx;
    this.x = platformStartData.x;
    this.y = platformStartData.y;
    this.width = platformStartData.width;
    this.size = platformStartData.size;
  };

  move = (): void => {
    if (this.dx) {
      this.x += this.dx;
    }
  };

  moveWithMouse = (event: MouseEvent): void => {
    this.x = event.offsetX - this.width / 2;
  };

  collideBounds = (): void => {
    const platformLeft = this.x + this.dx;
    const platformRight = platformLeft + this.width;
    this.stopNearTheBorder(platformLeft, platformRight);
  };

  collideBoundsWithMouse = (event: MouseEvent): void => {
    const mouseLeftPosition = event.offsetX - this.width / 2;
    const mouseRightPosition = event.offsetX + this.width / 2;
    this.stopNearTheBorder(mouseLeftPosition, mouseRightPosition);
  };

  stopNearTheBorder = (
    elementLeftPosition: number,
    elementRightPosition: number,
  ): void => {
    const worldLeft = 0;

    if (elementLeftPosition < worldLeft) {
      this.dx = 0;
      this.x = 0;
    }
    if (elementRightPosition > gameWidth) {
      this.dx = 0;
      this.x = gameWidth - this.width;
    }
  };

  changeSize = (option: string) => {
    if (option === 'increase' && this.size <= 3) {
      this.size += 1;
      this.width += 20;
    } else if (option === 'decrease' && this.size >= 1) {
      this.size -= 1;
      this.width -= 20;
    }
  };

  getCurrentPlatformData = (): PlatformConstructor => {
    return {
      velocity: this.velocity,
      dx: this.dx,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      size: this.size,
    };
  };

  getTouchOffset = (x: number): number => {
    const diff = this.x + this.width - x;
    const offset = this.width - diff;
    const result = (2 * offset) / this.width;
    return result - 1;
  };

  getMiddlePlatformPosition = (): number => this.x + this.width / 2;

  getDx = (): number => this.dx;

  getX = (): number => this.x;

  getY = (): number => this.y;

  getWidth = (): number => this.width;

  getHeight = (): number => this.height;
}
