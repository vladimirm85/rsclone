import { sounds } from '../utils/preload';
import { Sounds } from '../interfaces';

const stopSound = (option: string): void => {
  sounds[option as keyof Sounds]!.pause();
  sounds[option as keyof Sounds]!.currentTime = 0;
};

export default stopSound;
