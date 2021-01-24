import blocksLevelsData from './blocksLevelsData';
import {
  BallConstructor,
  GameConstructor,
  PlatformConstructor,
  TypesOfBonuses,
} from './interfaces';

// *** Game ***

export const KEYS = {
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  SPACE: 'Space',
  Z: 'KeyZ',
};

export const gameWidth = 768;
export const gameHeight = 494;

export const typesOfBonuses: TypesOfBonuses[] = [
  {
    sprite: 0,
    typeOfBonus: 'platformSizeDecrease',
  },
  {
    sprite: 1,
    typeOfBonus: 'platformSizeIncrease',
  },
  {
    sprite: 2,
    typeOfBonus: 'ballSpeedDecrease',
  },
  {
    sprite: 3,
    typeOfBonus: 'ballSpeedIncrease',
  },
];

// *** Ball ***

export const ballStartData: BallConstructor = {
  velocity: 6,
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

export const platformStartData: PlatformConstructor = {
  velocity: 12,
  dx: 0,
  x: 334,
  y: 450,
  width: 100,
  height: 15,
  size: 2,
};

// *** Block ***

export const blockWidth = 50;
export const blockHeight = 18;

// *** GameInit ***

export const initialGameData: GameConstructor = {
  initLevel: 0,
  numberOfLives: 3,
  score: 0,
  numberOfMisses: 1,
  ballData: ballStartData,
  platformData: platformStartData,
  blocksData: blocksLevelsData[0], // TODO: REFACTOR!
};
