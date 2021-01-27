import { START_GAME } from '../actions/gameActions';
import gameActions from '../action-creators/game-ac';
import { RESET } from '../actions/settingsActions';

const initialState = {
  isGameStarted: false,
};

type InitialStateType = typeof initialState;

type InferValueTypes<T> = T extends { [key: string]: infer U } ? U : never;

type ActionTypes = ReturnType<InferValueTypes<typeof gameActions>>;

const gameReducer = (
  state = initialState,
  action: ActionTypes,
): InitialStateType => {
  switch (action.type) {
    case START_GAME:
      return {
        ...state,
        ...action.payload,
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export default gameReducer;
