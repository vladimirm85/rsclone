export const KEYS = {
  LEFT: 'ArrowLeft',
  RIGHT: 'ArrowRight',
  SPACE: 'Space',
};

export const gameWidth = 768;
export const gameHeight = 494;

interface GameData {
  velocity: number;
  dx: number;
  x: number;
  y: number;
  width: number;
  height: number;
}

export type PlatformData = GameData;

export const platformStartSettings: PlatformData = {
  velocity: 9,
  dx: 0,
  x: 334,
  y: 400,
  width: 100,
  height: 15,
};

export interface BallData extends GameData {
  dy: number;
  frame: number;
  isRun: boolean;
}

export const ballStartSettings: BallData = {
  velocity: 6,
  dx: 0,
  dy: 0,
  x: 374,
  y: 380,
  frame: 0,
  width: 20,
  height: 20,
  isRun: false,
};

export interface BlockData {
  x: number;
  y: number;
  lives: number;
}
