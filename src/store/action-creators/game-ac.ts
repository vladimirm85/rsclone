import { START_GAME } from '../actions/gameActions';
import { RESET } from '../actions/settingsActions';

const gameActions = {
  startGame: (isGameStarted: boolean) =>
    ({
      type: START_GAME,
      payload: { isGameStarted },
    } as const),
  reset: () => ({ type: RESET } as const),
};

export default gameActions;
