import { gameWidth, gameHeight } from './constants';
import random from './helpers/random';

export default class Ball {
  velocity: number;
  dx: number;
  dy: number;
  x: number;
  y: number;
  frame: number;
  width: number;
  height: number;
  isRun: boolean;

  constructor(
    // objInitBall: interfaceInitBall
    velocity: number,
    dx: number,
    dy: number,
    x: number,
    y: number,
    frame: number,
    width: number,
    height: number,
    isRun: boolean,
  ) {
    // this.options = objInitBall
    this.velocity = velocity;
    this.dx = dx;
    this.dy = dy;
    this.x = x;
    this.y = y;
    this.frame = frame;
    this.width = width;
    this.height = height;
    this.isRun = isRun;
  }

  start(): void {
    if (!this.isRun) {
      this.isRun = true;
      this.dy = -this.velocity;
      this.dx = random(-this.velocity, this.velocity);

      this.animate();
    }
  }

  stop(): void {
    this.isRun = false;
    this.dx = 0;
    this.dy = 0;
  }

  animate(): void {
    setInterval(() => {
      this.frame += 1;
      if (this.frame > 3) {
        this.frame = 0;
      }
    }, 100);
  }

  move(): void {
    if (this.dy) {
      this.y += this.dy;
    }
    if (this.dx) {
      this.x += this.dx;
    }
  }

  changeDirection() {
    this.dy *= -1;
  }

  platformBounce(platformDx: number, platformGetTouchOffset: number) {
    if (platformDx) {
      this.x += platformDx;
    }

    if (this.dy > 0) {
      this.dy = -this.velocity;
      this.dx = this.velocity * platformGetTouchOffset;
    }
  }

  getTouchX() {
    return this.x + this.width / 2;
  }

  changeSize(option: string) {
    if (this.width > 10 && this.width < 30) {
      if (option === 'reduce') {
        this.width -= 5;
        this.height -= 5;
      } else {
        this.width += 5;
        this.height += 5;
      }
    }
  }

  collideBounds() {
    const ballLeft = this.x + this.dx;
    const ballRight = ballLeft + this.width;
    const ballTop = this.y + this.dy;
    const ballBottom = ballTop + this.height;

    const worldLeft = 0;
    const worldTop = 0;

    if (ballLeft < worldLeft) {
      this.x = 0;
      this.dx = this.velocity;
    } else if (ballRight > gameWidth) {
      this.x = gameWidth - this.width;
      this.dx = -this.velocity;
    } else if (ballTop < worldTop) {
      this.y = 0;
      this.dy = this.velocity;
    } else if (ballBottom > gameHeight) {
      this.stop();
      window.location.reload();
    }
  }

  isCollide(elem: any): boolean {
    const x = this.x + this.dx;
    const y = this.y + this.dy;

    if (
      x + this.width > elem.x &&
      x < elem.x + elem.width &&
      y + this.height > elem.y &&
      y < elem.y + elem.height
    ) {
      return true;
    }
    return false;
  }

  moveWithPlatform(platformDx: number) {
    this.x += platformDx;
  }

  getRunStatus() {
    return this.isRun;
  }
}
