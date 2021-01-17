import { BlockDataInterface, BlockInterface } from './constants';
import { sprites } from './utils/preload';

export default class Block implements BlockInterface {
  x: number;
  y: number;
  lives: number;
  width: number;
  height: number;
  constructor(props: BlockDataInterface) {
    ({ x: this.x, y: this.y, lives: this.lives } = props);
    this.width = 50;
    this.height = 18;
  }

  draw = (ctx: CanvasRenderingContext2D): void => {
    ctx.drawImage(sprites.block!, this.x, this.y);
  };

  isActive = (): boolean => {
    return !!this.lives;
  };

  reduceLives = (): void => {
    this.lives -= 1;
  };

  getCurrentBlockData = (): BlockDataInterface => ({
    x: this.x,
    y: this.y,
    lives: this.lives,
  });

  getBlockX = (): number => this.x;

  getBlockWidth = (): number => this.width;
}
