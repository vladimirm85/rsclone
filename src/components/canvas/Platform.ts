import { KEYS, gameWidth } from './constants';

export default class Platform {
  constructor(
    velocity: number,
    dx: number,
    x: number,
    y: number,
    width: number,
    height: number,
  ) {
    this.velocity = velocity;
    this.dx = dx;
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  velocity = 12;
  dx = 0;
  x = 334;
  y = 400;
  width = 100;
  height = 15;

  start(direction: string): void {
    if (direction === KEYS.LEFT) {
      this.dx = -this.velocity;
    } else if (direction === KEYS.RIGHT) {
      this.dx = this.velocity;
    }
  }

  stop(): void {
    this.dx = 0;
  }

  move() {
    if (this.dx) {
      this.x += this.dx;
    }
  }

  getTouchOffset(x: number) {
    const diff = this.x + this.width - x;
    const offset = this.width - diff;
    const result = (2 * offset) / this.width;
    return result - 1;
  }

  collideBounds() {
    const platformLeft = this.x + this.dx;
    const platformRight = platformLeft + this.width;

    const worldLeft = 0;

    if (platformLeft < worldLeft || platformRight > gameWidth) {
      this.dx = 0;
    }
  }

  getDx() {
    return this.dx;
  }
}
