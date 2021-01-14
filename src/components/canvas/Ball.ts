import { height, width } from './constants';
import random from './helpers/random';

export default class Ball {
  velocity = 3;
  dx = 0;
  dy = 0;
  x = 374;
  y = 380;
  frame = 0;
  width = 20;
  height = 20;
  isRun = false;

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

  bumpBlock() {
    this.dy *= -1;
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
    } else if (ballRight > width) {
      this.x = width - this.width;
      this.dx = -this.velocity;
    } else if (ballTop < worldTop) {
      this.y = 0;
      this.dy = this.velocity;
    } else if (ballBottom > height) {
      this.stop();
      window.location.reload();
    }
  }

  collide(elem: any): boolean {
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
}
