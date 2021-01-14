import { KEYS, width } from './constants';

export default class Platform {
  velocity = 6;
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

    if (platformLeft < worldLeft || platformRight > width) {
      this.dx = 0;
    }
  }
}
