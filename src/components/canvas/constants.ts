export const KEYS = {
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  SPACE: 'Space',
  Z: 'KeyZ',
};

export const gameWidth = 768;
export const gameHeight = 494;

// *** Game ***

interface GameData {
  velocity: number;
  dx: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

// *** Ball ***
export interface BallConstructor extends GameData {
  dy: number;
  frame: number;
  isRun: boolean;
}

export interface BallInterface extends BallConstructor {
  start: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
  // isCollide: (element: BlockInterface | PlatformInterface) => boolean;
  changeDirection: (blockX: number, blockWide: number) => void;
  getTouchX: () => number;
  platformBounce: (platformDx: number, platformTouchOffset: number) => void;
  collideBounds: () => void;
  getRunStatus: () => boolean;
  moveWithPlatform: (platformDx: number) => void;
  move: () => void;
  getCurrentBallData: () => BallConstructor;
}

export const ballStartData: BallConstructor = {
  velocity: 10,
  dx: 0,
  dy: 0,
  x: 374,
  y: 430,
  frame: 0,
  width: 20,
  height: 20,
  isRun: false,
};

// *** Platform ***
export type PlatformConstructor = GameData;

export interface PlatformInterface extends PlatformConstructor {
  start: (code: string) => void;
  stop: () => void;
  draw: (ctx: CanvasRenderingContext2D) => void;
  getTouchOffset: (ballTouchX: number) => number;
  getDx: () => number;
  collideBounds: () => void;
  move: () => void;
  getCurrentPlatformData: () => PlatformConstructor;
}

export const platformStartData: PlatformConstructor = {
  velocity: 20,
  dx: 0,
  x: 334,
  y: 450,
  width: 100,
  height: 15,
};

// *** Block ***

export interface BlockDataInterface {
  // TODO: NAMING???
  x: number;
  y: number;
  lives: number;
}

export type BlocksData = Array<BlockDataInterface>;

export interface BlockInterface extends BlockDataInterface {
  width: number;
  height: number;
  draw: (ctx: CanvasRenderingContext2D) => void;
  isActive: () => boolean;
  reduceLives: () => void;
  getCurrentBlockData: () => BlockDataInterface;
  getBlockX: () => number;
  getBlockWidth: () => number;
}

// *** Game ***

interface GameInit {
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
  draw: (ctx: CanvasRenderingContext2D) => void;
  destroyBlocks: () => void;
  checkCurrentStateGame: () => void;
  addListeners: () => void;
  getCurrentGameState: () => void;
  ballIsCollide: (element: BlockInterface | PlatformInterface) => boolean;
  collidePlatformWithBall: () => void;
  setIsPause: (option: boolean) => void;
  getIsPause: () => boolean;
}

export const blocksLevelsData: BlocksData[] = [
  [
    {
      x: 20,
      y: 20,
      lives: 1,
    },
    {
      x: 87,
      y: 20,
      lives: 1,
    },
    {
      x: 154,
      y: 20,
      lives: 1,
    },
    {
      x: 221,
      y: 20,
      lives: 1,
    },
    {
      x: 288,
      y: 20,
      lives: 1,
    },
    {
      x: 355,
      y: 20,
      lives: 1,
    },
    {
      x: 422,
      y: 20,
      lives: 1,
    },
    {
      x: 489,
      y: 20,
      lives: 1,
    },
    {
      x: 556,
      y: 20,
      lives: 1,
    },
    {
      x: 623,
      y: 20,
      lives: 1,
    },
    {
      x: 690,
      y: 20,
      lives: 1,
    },
    {
      x: 20,
      y: 55,
      lives: 1,
    },
    {
      x: 87,
      y: 55,
      lives: 1,
    },
    {
      x: 154,
      y: 55,
      lives: 1,
    },
    {
      x: 221,
      y: 55,
      lives: 1,
    },
    {
      x: 288,
      y: 55,
      lives: 0,
    },
    {
      x: 355,
      y: 55,
      lives: 0,
    },
    {
      x: 422,
      y: 55,
      lives: 0,
    },
    {
      x: 489,
      y: 55,
      lives: 1,
    },
    {
      x: 556,
      y: 55,
      lives: 1,
    },
    {
      x: 623,
      y: 55,
      lives: 1,
    },
    {
      x: 690,
      y: 55,
      lives: 1,
    },
    {
      x: 20,
      y: 90,
      lives: 1,
    },
    {
      x: 87,
      y: 90,
      lives: 1,
    },
    {
      x: 154,
      y: 90,
      lives: 1,
    },
    {
      x: 221,
      y: 90,
      lives: 0,
    },
    {
      x: 288,
      y: 90,
      lives: 0,
    },
    {
      x: 355,
      y: 90,
      lives: 7,
    },
    {
      x: 422,
      y: 90,
      lives: 0,
    },
    {
      x: 489,
      y: 90,
      lives: 0,
    },
    {
      x: 556,
      y: 90,
      lives: 1,
    },
    {
      x: 623,
      y: 90,
      lives: 1,
    },
    {
      x: 690,
      y: 90,
      lives: 1,
    },
    {
      x: 20,
      y: 125,
      lives: 1,
    },
    {
      x: 87,
      y: 125,
      lives: 1,
    },
    {
      x: 154,
      y: 125,
      lives: 1,
    },
    {
      x: 221,
      y: 125,
      lives: 1,
    },
    {
      x: 288,
      y: 125,
      lives: 0,
    },
    {
      x: 355,
      y: 125,
      lives: 0,
    },
    {
      x: 422,
      y: 125,
      lives: 0,
    },
    {
      x: 489,
      y: 125,
      lives: 1,
    },
    {
      x: 556,
      y: 125,
      lives: 1,
    },
    {
      x: 623,
      y: 125,
      lives: 1,
    },
    {
      x: 690,
      y: 125,
      lives: 1,
    },
    {
      x: 20,
      y: 160,
      lives: 1,
    },
    {
      x: 87,
      y: 160,
      lives: 1,
    },
    {
      x: 154,
      y: 160,
      lives: 1,
    },
    {
      x: 221,
      y: 160,
      lives: 1,
    },
    {
      x: 288,
      y: 160,
      lives: 1,
    },
    {
      x: 355,
      y: 160,
      lives: 1,
    },
    {
      x: 422,
      y: 160,
      lives: 1,
    },
    {
      x: 489,
      y: 160,
      lives: 1,
    },
    {
      x: 556,
      y: 160,
      lives: 1,
    },
    {
      x: 623,
      y: 160,
      lives: 1,
    },
    {
      x: 690,
      y: 160,
      lives: 1,
    },
  ],
  [
    // {
    //   x: 30,
    //   y: 20,
    //   lives: 0,
    // },
    // {
    //   x: 87,
    //   y: 20,
    //   lives: 1,
    // },
    // {
    //   x: 154,
    //   y: 20,
    //   lives: 1,
    // },
    // {
    //   x: 221,
    //   y: 20,
    //   lives: 1,
    // },
    // {
    //   x: 288,
    //   y: 20,
    //   lives: 1,
    // },
    // {
    //   x: 355,
    //   y: 20,
    //   lives: 1,
    // },
    // {
    //   x: 422,
    //   y: 20,
    //   lives: 1,
    // },
    // {
    //   x: 489,
    //   y: 20,
    //   lives: 1,
    // },
    // {
    //   x: 556,
    //   y: 20,
    //   lives: 1,
    // },
    // {
    //   x: 623,
    //   y: 20,
    //   lives: 1,
    // },
    // {
    //   x: 680,
    //   y: 20,
    //   lives: 1,
    // },
    {
      x: 30,
      y: 55,
      lives: 0,
    },
    {
      x: 87,
      y: 55,
      lives: 1,
    },
    {
      x: 154,
      y: 55,
      lives: 1,
    },
    {
      x: 221,
      y: 55,
      lives: 1,
    },
    {
      x: 288,
      y: 55,
      lives: 1,
    },
    {
      x: 355,
      y: 55,
      lives: 1,
    },
    {
      x: 422,
      y: 55,
      lives: 1,
    },
    {
      x: 489,
      y: 55,
      lives: 1,
    },
    {
      x: 556,
      y: 55,
      lives: 1,
    },
    {
      x: 623,
      y: 55,
      lives: 1,
    },
    {
      x: 680,
      y: 55,
      lives: 1,
    },
    {
      x: 30,
      y: 90,
      lives: 0,
    },
    {
      x: 87,
      y: 90,
      lives: 1,
    },
    {
      x: 154,
      y: 90,
      lives: 1,
    },
    {
      x: 221,
      y: 90,
      lives: 1,
    },
    {
      x: 288,
      y: 90,
      lives: 1,
    },
    {
      x: 355,
      y: 90,
      lives: 7,
    },
    {
      x: 422,
      y: 90,
      lives: 1,
    },
    {
      x: 489,
      y: 90,
      lives: 1,
    },
    {
      x: 556,
      y: 90,
      lives: 1,
    },
    {
      x: 623,
      y: 90,
      lives: 1,
    },
    {
      x: 680,
      y: 90,
      lives: 1,
    },
    {
      x: 30,
      y: 125,
      lives: 0,
    },
    {
      x: 87,
      y: 125,
      lives: 1,
    },
    {
      x: 154,
      y: 125,
      lives: 1,
    },
    {
      x: 221,
      y: 125,
      lives: 1,
    },
    {
      x: 288,
      y: 125,
      lives: 1,
    },
    {
      x: 355,
      y: 125,
      lives: 1,
    },
    {
      x: 422,
      y: 125,
      lives: 1,
    },
    {
      x: 489,
      y: 125,
      lives: 1,
    },
    {
      x: 556,
      y: 125,
      lives: 1,
    },
    {
      x: 623,
      y: 125,
      lives: 1,
    },
    {
      x: 680,
      y: 125,
      lives: 1,
    },
    {
      x: 30,
      y: 160,
      lives: 0,
    },
    {
      x: 87,
      y: 160,
      lives: 1,
    },
    {
      x: 154,
      y: 160,
      lives: 1,
    },
    {
      x: 221,
      y: 160,
      lives: 1,
    },
    {
      x: 288,
      y: 160,
      lives: 1,
    },
    {
      x: 355,
      y: 160,
      lives: 1,
    },
    {
      x: 422,
      y: 160,
      lives: 1,
    },
    {
      x: 489,
      y: 160,
      lives: 1,
    },
    {
      x: 556,
      y: 160,
      lives: 1,
    },
    {
      x: 623,
      y: 160,
      lives: 1,
    },
    {
      x: 680,
      y: 160,
      lives: 1,
    },
  ],
];

export const initialGameData: GameConstructor = {
  initLevel: 0,
  numberOfLives: 3,
  score: 0,
  ballData: ballStartData,
  platformData: platformStartData,
  blocksData: blocksLevelsData[0], // TODO: REFACTOR!
};
