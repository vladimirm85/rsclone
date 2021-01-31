import {
  START_GAME,
  SET_USER_SAVES,
  SET_USER_SAVES_ERROR,
  SET_USER_SAVES_LOADING,
  DEL_USER_SAVE,
} from '../actions/gameActions';
import { gameActions } from '../action-creators/game-ac';
import { RESET } from '../actions/settingsActions';
import { SavesType } from '../../types/types';

const initialState = {
  isGameStarted: false,
  userSaves: [] as Array<SavesType>,
  userSavesError: '',
  userSavesLoading: false,
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
    case SET_USER_SAVES:
    case SET_USER_SAVES_ERROR:
    case SET_USER_SAVES_LOADING:
      return {
        ...state,
        ...action.payload,
      };
    case DEL_USER_SAVE:
      return {
        ...state,
        // eslint-disable-next-line no-underscore-dangle
        userSaves: state.userSaves.filter((i) => i._id !== action.payload.id),
      };
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export default gameReducer;
