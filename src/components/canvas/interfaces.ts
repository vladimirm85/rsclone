// *** Game ***

export interface GameData {
  velocity: number;
  dx: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export interface GameInit {
  numberOfLives: number;
  score: number;
  blocksData: BlocksData;
}

export interface GameConstructor extends GameInit {
  initLevel: number;
  ballData: BallConstructor;
  platformData: PlatformConstructor;
}

export interface GameInterface extends GameInit {
  currentLevel: number;
  ball: BallInterface;
  platform: PlatformInterface;
  addListeners: () => void;
  init: () => void;
  stop: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
  ballIsCollide: (element: BlockInterface | PlatformInterface) => boolean;
  bonusIsCollide: () => void;
  bonusDelete: (bonus: BonusInterface) => void;
  spawnNewBonus: (bonus: BlockInterface) => void;
  checkHitsOnBlocks: () => void;
  collidePlatformWithBall: () => void;
  updateCurrentStateGame: () => void;
  getCurrentGameState: () => void;
  setIsPause: (option: boolean) => void;
  getIsPause: () => boolean;
}

// *** Ball ***

export interface BallConstructor extends GameData {
  dy: number;
  frame: number;
  isRun: boolean;
}

export interface BallInterface extends BallConstructor {
  draw: (ctx: CanvasRenderingContext2D) => void;
  start: () => void;
  stop: () => void;
  move: () => void;
  moveWithPlatform: (platformMiddlePosition: number) => void;
  changeDirection: (blockX: number, blockWide: number) => void;
  platformBounce: (platformDx: number, platformTouchOffset: number) => void;
  collideBounds: () => void;
  getRunStatus: () => boolean;
  getCurrentBallData: () => BallConstructor;
  changeSpeed: (option: string) => void;
  animate: () => void;
  getTouchX: () => number;
  getDx: () => number;
  getDy: () => number;
  getX: () => number;
  getY: () => number;
  getWidth: () => number;
  getHeight: () => number;
}

// *** Block ***

export interface BlockDataInterface {
  // TODO: NAMING???
  x: number;
  y: number;
  lives: number;
}

export type BlocksData = Array<BlockDataInterface>;

export interface BlockInterface extends BlockDataInterface {
  draw: (ctx: CanvasRenderingContext2D) => void;
  reduceLives: () => void;
  getCurrentBlockData: () => BlockDataInterface;
  isActive: () => boolean;
  getX: () => number;
  getY: () => number;
  getWidth: () => number;
  getHeight: () => number;
}

// *** Bonus ***

export interface TypesOfBonuses {
  sprite: number;
  typeOfBonus: string;
}

export type BonusTypesMethods = 'ballSpeedDecrease' | 'ballSpeedIncrease';

export interface BonusConstructor {
  ball: BallInterface;
  platform: PlatformInterface;
  block: BlockInterface;
}

export interface BonusInterface extends BonusConstructor {
  dy: number;
  x: number;
  y: number;
  width: number;
  height: number;
  spriteNumber: number;
  typeOfBonus: string;
  isUsed: boolean;
  initBonus: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
  move: () => void;
  platformSizeDecrease: () => void;
  platformSizeIncrease: () => void;
  ballSpeedDecrease: () => void;
  ballSpeedIncrease: () => void;
  bonusTurnOff: () => void;
  apply: () => void;
  getActiveStatus: () => boolean;
  getX: () => number;
  getY: () => number;
  getWidth: () => number;
  getHeight: () => number;
}

// *** Platform ***

export interface PlatformConstructor extends GameData {
  size: number;
}

export interface PlatformInterface extends PlatformConstructor {
  draw: (ctx: CanvasRenderingContext2D) => void;
  start: (code: string) => void;
  stop: () => void;
  move: () => void;
  collideBounds: () => void;
  changeSize: (option: string) => void;
  getCurrentPlatformData: () => PlatformConstructor;
  getTouchOffset: (ballTouchX: number) => number;
  getMiddlePlatformPosition: () => number;
  getDx: () => number;
  getX: () => number;
  getY: () => number;
  getWidth: () => number;
  getHeight: () => number;
}
