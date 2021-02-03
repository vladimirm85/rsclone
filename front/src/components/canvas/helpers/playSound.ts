import { sounds } from '../utils/preload';
import { Sounds } from '../interfaces';

const playSound = (isSoundOn: boolean, option: string): void => {
  if (isSoundOn) {
    sounds[option as keyof Sounds]!.currentTime = 0;
    sounds[option as keyof Sounds]!.play();

    if (option === 'gameSound') {
      sounds[option as keyof Sounds]!.addEventListener('ended', () =>
        sounds[option as keyof Sounds]!.play(),
      );
    }
  }
};

export default playSound;
