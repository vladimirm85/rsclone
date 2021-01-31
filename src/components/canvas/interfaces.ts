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
  numberOfMisses: number;
  blocksData: BlocksData;
}

export interface GameConstructor extends GameInit {
  initLevel: number;
  ballData: BallConstructor;
  platformData: PlatformConstructor;
  isSound: boolean;
  bonusesData?: BonusConstructor[];
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
  checkHitOnBlocks: () => void;
  collidePlatformWithBall: () => void;
  checkLifeLost: () => void;
  updateCurrentStateGame: () => void;
  addScorePoint: () => void;
  getScoreRatio: () => number;
  increaseBlockMiss: () => void;
  resetBlockMisses: () => void;
  getCurrentGameState: () => GameConstructor;
  reduceLives: () => void;
  clearBonuses: () => void;
  setIsPause: (option: boolean) => void;
  getIsPause: () => boolean;
  setIsSound: (option: boolean) => void;
  getIsSound: () => boolean;
}

// *** Ball ***

export interface BallConstructor extends GameData {
  dy: number;
  frame: number;
  isRun: boolean;
}

export interface BallInterface extends BallConstructor {
  draw: () => void;
  start: () => void;
  // stop: () => void;
  setStartPosition: () => void;
  move: () => void;
  moveWithPlatform: (platformMiddlePosition: number) => void;
  changeDirection: (blockX: number, blockWide: number) => void;
  platformBounce: (platformDx: number, platformTouchOffset: number) => void;
  collideBounds: () => boolean;
  getRunStatus: () => boolean;
  changeSpeed: (option: string) => void;
  getCurrentBallData: () => BallConstructor;
  animate: () => void;
  stopAnimation: () => void;
  getTouchX: () => number;
  getDx: () => number;
  getDy: () => number;
  getX: () => number;
  getY: () => number;
  getWidth: () => number;
  getHeight: () => number;
}

// *** Block ***

export interface BlockConstructor {
  x: number;
  y: number;
  lives: number;
  colorLeft: string;
  colorRight: string;
  isIndestructible: boolean;
}

export type BlocksData = Array<BlockConstructor>;

export interface BlockInterface extends BlockConstructor {
  draw: (ctx: CanvasRenderingContext2D) => void;
  reduceLives: () => void;
  getCurrentBlockData: () => BlockConstructor;
  isActive: () => boolean;
  isIndestructibleBlock: () => boolean;
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
  x: number;
  y: number;
  typeOfBonus?: string;
  isUsed?: boolean;
  isActive?: boolean;
}

export interface BonusInterface extends BonusConstructor {
  dy: number;
  width: number;
  height: number;
  spriteNumber: number;
  initBonus: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
  move: () => void;
  platformSizeDecrease: () => void;
  platformSizeIncrease: () => void;
  ballSpeedDecrease: () => void;
  ballSpeedIncrease: () => void;
  bonusTurnOff: () => void;
  apply: () => void;
  getCurrentBonusData: () => BonusConstructor;
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
  draw: () => void;
  start: (code: string) => void;
  stop: () => void;
  setStartPosition: () => void;
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

// *** Levels ***

export interface LevelGradientInterface {
  colorLeft: string;
  colorRight: string;
}

export type LevelsGradients = Array<LevelGradientInterface>;
