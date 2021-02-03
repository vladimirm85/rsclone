import {
  START_GAME,
  SET_USER_SAVES,
  SET_USER_SAVES_ERROR,
  SET_USER_SAVES_LOADING,
  DEL_USER_SAVE,
  SET_GAME_OBJ,
  CANCEL_FRAME,
  SET_GAME_RESULT,
  SET_IS_SAVED,
} from '../actions/gameActions';
import { gameActions } from '../action-creators/game-ac';
import { RESET } from '../actions/settingsActions';
import { SavesType } from '../../types/types';
import { GameInterface } from '../../components/canvas/interfaces';

const initialState = {
  isGameStarted: false,
  userSaves: [] as Array<SavesType>,
  userSavesError: '',
  userSavesLoading: false,
  gameObj: (null as unknown) as GameInterface | null,
  gameResult: { victory: false, score: 0 },
  isSaved: false,
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
    case SET_GAME_OBJ:
    case SET_GAME_RESULT:
    case SET_IS_SAVED:
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
    case CANCEL_FRAME:
      if (state.gameObj) {
        state.gameObj.stopAnimation();
        return {
          ...state,
          gameObj: null,
        };
      }
      return state;
    case RESET:
      return initialState;
    default:
      return state;
  }
};

export default gameReducer;
