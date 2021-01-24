import { blockHeight, blockWidth } from './constants';
import { sprites } from './utils/preload';
import { BlockDataInterface, BlockInterface } from './interfaces';

export default class Block implements BlockInterface {
  x: number;
  y: number;
  lives: number;
  // width: number;
  // height: number;

  constructor(props: BlockDataInterface) {
    ({ x: this.x, y: this.y, lives: this.lives } = props);
    // this.width = blockWidth; // TODO: Go constant ?
    // this.height = blockHeight; // TODO: Go constant ?
  }

  draw = (ctx: CanvasRenderingContext2D): void => {
    ctx.drawImage(
      sprites.block!,
      (this.lives - 1) * blockWidth,
      0,
      blockWidth,
      blockHeight,
      this.x,
      this.y,
      blockWidth,
      blockHeight,
    );
  };

  reduceLives = (): void => {
    this.lives -= 1;
  };

  getCurrentBlockData = (): BlockDataInterface => ({
    x: this.x,
    y: this.y,
    lives: this.lives,
  });

  isActive = (): boolean => !!this.lives;

  getX = (): number => this.x;

  getY = (): number => this.y;

  getWidth = (): number => blockWidth;

  getHeight = (): number => blockHeight;
}
