// Import sprites
import bgSprite from '../assets/img/background.png';
import ballSprite from '../assets/img/ball.png';
import platformSprite from '../assets/img/platform.png';
import blockSprite from '../assets/img/block.png';
import bonusSprite from '../assets/img/bonus.png';

// Import sounds
// @ts-ignore
import collideSound from '../assets/sound/pim.mp3';

const spritesLinks = [
  bgSprite,
  ballSprite,
  platformSprite,
  blockSprite,
  bonusSprite,
];
const soundsLinks = [collideSound];

type HTMLOrNull = HTMLImageElement | null;

interface Sprites {
  bg: HTMLOrNull;
  ball: HTMLOrNull;
  platform: HTMLOrNull;
  block: HTMLOrNull;
  bonus: HTMLOrNull;
}

export const sprites: Sprites = {
  bg: null,
  ball: null,
  platform: null,
  block: null,
  bonus: null,
};

interface Sounds {
  pim: HTMLAudioElement | undefined;
}

export const sounds: Sounds = {
  pim: undefined,
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
  const required = Object.keys(sprites).length + 1;

  const onResourceLoad = () => {
    loaded += 1;

    if (loaded >= required) {
      callback();
    }
  };

  preloadSprites(onResourceLoad);
  preloadSound(onResourceLoad);
};
