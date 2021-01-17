import { applyMiddleware, combineReducers, createStore } from 'redux';
import thunk from 'redux-thunk';
import testReducer from './reducers/test-reducer';
import verifyReducer from './reducers/verify-reducer';
import authReducer from './reducers/auth-reducer';

const rootReducer = combineReducers({
  gameData: testReducer,
  verifyData: verifyReducer,
  authData: authReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
