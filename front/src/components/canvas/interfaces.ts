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
}

export interface GameConstructor extends GameInit {
  initLevel: number;
  ballData: BallConstructor;
  platformData: PlatformConstructor;
  isSound: boolean;
  blocksData: BlocksData;
  bonusesData?: BonusConstructor[];
}

export interface GameInterface extends GameInit {
  currentLevel: number;
  ball: BallInterface;
  platform: PlatformInterface;
  addListeners: () => void;
  start: () => void;
  win: () => void;
  lose: () => void;
  clear: () => void;
  nextLevel: () => void;
  load: (save: GameConstructor) => void;
  stopAnimation: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
  ballIsCollide: (
    elemX: number,
    elemY: number,
    elemWidth: number,
    elemHeight: number,
  ) => boolean;
  bonusIsCollide: () => void;
  bonusDelete: (bonus: BonusInterface) => void;
  createBonus: (
    bonusInitX: number,
    bonusInitY: number,
    spriteNumber: number,
    typeOfBonus: string,
    isUsed: boolean,
    isActive: boolean,
  ) => void;
  checkHitOnBlocks: () => void;
  collidePlatformWithBall: () => void;
  checkLifeLost: () => void;
  updateCurrentStateGame: () => void;
  checkAllBlocksAreDestroyed: () => void;
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
  stop: () => void;
  getAuthStatus: () => boolean;
  updateTotalScore: () => void;
  clearScore: () => void;
  setScoreToBack: () => void;
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
  setStartPosition: () => void;
  move: () => void;
  moveWithPlatform: (platformMiddlePosition: number) => void;
  changeDirection: (blockX: number, blockWide: number) => void;
  platformBounce: (platformDx: number, platformTouchOffset: number) => void;
  collideBounds: (getIsSound: () => boolean) => boolean;
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
  spriteNumber: number;
  typeOfBonus: string;
  isUsed: boolean;
  isActive: boolean;
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
  moveWithMouse: (event: MouseEvent) => void;
  collideBounds: () => void;
  collideBoundsWithMouse: (event: MouseEvent) => void;
  stopNearTheBorder: (
    elementLeftPosition: number,
    elementRightPosition: number,
  ) => void;
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

// *** Assets ***

type HTMLImageOrNull = HTMLImageElement | null;

export interface Sprites {
  bonus: HTMLImageOrNull;
}

type HTMLAudioOrNull = HTMLAudioElement | null;

export interface Sounds {
  blockBump: HTMLAudioOrNull;
  boundsBump: HTMLAudioOrNull;
  gameSound: HTMLAudioOrNull;
  levelLose: HTMLAudioOrNull;
  lose: HTMLAudioOrNull;
  nextLevel: HTMLAudioOrNull;
  platformBump: HTMLAudioOrNull;
  win: HTMLAudioOrNull;
}
