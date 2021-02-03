// Import sprites
import bonusSprite from '../assets/img/bonus.png';

// Import sounds

// @ts-ignore
import blockBump from '../assets/sound/blockBump.mp3';
// @ts-ignore
import boundsBump from '../assets/sound/boundsBump.wav';
// @ts-ignore
import gameSound from '../assets/sound/gameSound.mp3';
// @ts-ignore
import levelLose from '../assets/sound/levelLose.mp3';
// @ts-ignore
import lose from '../assets/sound/lose.mp3';
// @ts-ignore
import nextLevel from '../assets/sound/nextLevel.mp3';
// @ts-ignore
import platformBump from '../assets/sound/platformBump.wav';
// @ts-ignore
import win from '../assets/sound/win.mp3';
import { Sounds, Sprites } from '../interfaces';

const spritesLinks = [bonusSprite];
const soundsLinks = [
  blockBump,
  boundsBump,
  gameSound,
  levelLose,
  lose,
  nextLevel,
  platformBump,
  win,
];

export const sprites: Sprites = {
  bonus: null,
};

export const sounds: Sounds = {
  blockBump: null,
  boundsBump: null,
  gameSound: null,
  levelLose: null,
  lose: null,
  nextLevel: null,
  platformBump: null,
  win: null,
};

const preloadSprites = (onResourceLoad: () => void) => {
  Object.keys(sprites).forEach((elem, i: number) => {
    sprites[elem as keyof Sprites] = new Image();
    sprites[elem as keyof Sprites]!.src = spritesLinks[i];
    sprites[elem as keyof Sprites]!.addEventListener('load', onResourceLoad);
  });
};

const preloadSound = (onResourceLoad: () => void) => {
  Object.keys(sounds).forEach((elem, i) => {
    sounds[elem as keyof Sounds] = new Audio(soundsLinks[i]);
    sounds[elem as keyof Sounds]!.addEventListener(
      'canplaythrough',
      onResourceLoad,
      {
        once: true,
      },
    );
  });
};

export const preload = (callback: () => void) => {
  let loaded = 0;
  let required = Object.keys(sprites).length;
  required += Object.keys(sounds).length;

  const onResourceLoad = () => {
    loaded += 1;
    if (loaded >= required) {
      callback();
    }
  };

  preloadSprites(onResourceLoad);
  preloadSound(onResourceLoad);
};
