import { gameWidth, gameHeight } from './constants';
import getRandomValue from './helpers/getRandomValue';
import { sprites } from './utils/preload';
import { BallConstructor, BallInterface } from './interfaces';

export default class Ball implements BallInterface {
  velocity: number;
  dx: number;
  dy: number;
  x: number;
  y: number;
  frame: number;
  width: number;
  height: number;
  isRun: boolean;

  constructor(props: BallConstructor) {
    ({
      velocity: this.velocity,
      dx: this.dx,
      dy: this.dy,
      x: this.x,
      y: this.y,
      frame: this.frame,
      width: this.width,
      height: this.height,
      isRun: this.isRun,
    } = props);
  }

  draw = (ctx: CanvasRenderingContext2D): void => {
    ctx.drawImage(
      sprites.ball!,
      this.frame * this.width,
      0,
      this.width,
      this.height,
      this.x,
      this.y,
      this.width,
      this.height,
    );
  };

  start = (): void => {
    if (!this.isRun) {
      this.isRun = true;
      this.dy = -this.velocity;
      this.dx = getRandomValue(-this.velocity, this.velocity);

      this.animate();
    }
  };

  stop = (): void => {
    this.isRun = false;
    this.dx = 0;
    this.dy = 0;
  };

  move = (): void => {
    if (this.dy) {
      this.y += this.dy;
    }
    if (this.dx) {
      this.x += this.dx;
    }
  };

  moveWithPlatform = (platformMiddlePosition: number): void => {
    this.x = platformMiddlePosition - this.width / 2;
  };

  changeDirection = (blockX: number, blockWidth: number): void => {
    const fullBallX = this.x + this.width;
    const fullBlockX = blockX + blockWidth;

    if (this.x > fullBlockX || fullBallX < blockX) {
      this.dx *= -1;
    } else {
      this.dy *= -1;
    }
  };

  platformBounce = (
    platformDx: number,
    platformGetTouchOffset: number,
  ): void => {
    if (platformDx) {
      this.x += platformDx;
    }

    if (this.dy > 0) {
      this.dy = -this.velocity;
      this.dx = this.velocity * platformGetTouchOffset;
    }
  };

  collideBounds = (): void => {
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
      this.dy *= -1;
      // this.stop();
      // window.location.reload();
    }
  };

  getRunStatus = (): boolean => {
    return this.isRun;
  };

  changeSpeed = (option: string): void => {
    if (option === 'increase' && this.velocity <= 6) {
      this.velocity *= 1.2;
      this.dx *= 1.2;
      this.dy *= 1.2;
    } else if (option === 'decrease' && this.velocity >= 6) {
      this.velocity /= 1.2;
      this.dx /= 1.2;
      this.dy /= 1.2;
    }
  };

  getCurrentBallData = (): BallConstructor => ({
    velocity: this.velocity,
    dx: this.dx,
    dy: this.dy,
    x: this.x,
    y: this.y,
    frame: this.frame,
    width: this.width,
    height: this.height,
    isRun: this.isRun,
  });

  animate = (): void => {
    setInterval(() => {
      this.frame += 1;
      if (this.frame > 3) {
        this.frame = 0;
      }
    }, 100);
  };

  getTouchX = (): number => {
    return this.x + this.width / 2;
  };

  getDx = (): number => this.dx;

  getDy = (): number => this.dy;

  getX = (): number => this.x;

  getY = (): number => this.y;

  getWidth = (): number => this.width;

  getHeight = (): number => this.height;
}
