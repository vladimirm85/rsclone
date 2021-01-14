import { combineReducers, createStore } from 'redux';
import testReducer from './reducers/test-reducer';

const rootReducer = combineReducers({
  gameData: testReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

const store = createStore(rootReducer);

export default store;
