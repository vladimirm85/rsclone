import {
  KEYS,
  gameWidth,
  PlatformConstructor,
  PlatformInterface,
} from './constants';
import { sprites } from './utils/preload';

export default class Platform implements PlatformInterface {
  velocity: number;
  dx: number;
  x: number;
  y: number;
  width: number;
  height: number;
  constructor(props: PlatformConstructor) {
    ({
      velocity: this.velocity,
      dx: this.dx,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    } = props);
  }

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

  move = (): void => {
    if (this.dx) {
      this.x += this.dx;
    }
  };

  getTouchOffset = (x: number): number => {
    const diff = this.x + this.width - x;
    const offset = this.width - diff;
    const result = (2 * offset) / this.width;
    return result - 1;
  };

  collideBounds = (): void => {
    const platformLeft = this.x + this.dx;
    const platformRight = platformLeft + this.width;

    const worldLeft = 0;

    if (platformLeft < worldLeft) {
      this.dx = 0;
      this.x = 0;
    }
    if (platformRight > gameWidth) {
      this.dx = 0;
      this.x = gameWidth - this.width;
      // console.log(this.x);
    }
  };

  getDx = (): number => {
    return this.dx;
  };

  getMiddlePlatformPosition = (): number => this.x + this.width / 2;

  draw = (ctx: CanvasRenderingContext2D): void => {
    ctx.drawImage(sprites.platform!, this.x, this.y);
  };

  getCurrentPlatformData = (): PlatformConstructor => {
    return {
      velocity: this.velocity,
      dx: this.dx,
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
    };
  };
}
