import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import verifyReducer from './reducers/verify-reducer';
import authReducer from './reducers/auth-reducer';
import regReducer from './reducers/registration-reducer';
import scoreReducer from './reducers/score-reducer';
import restoreReducer from './reducers/restorePass-reducer';
import newPassReducer from './reducers/newPass-reducer';
import settingsReducer from './reducers/settings-reducer';

const rootReducer = combineReducers({
  verifyData: verifyReducer,
  authData: authReducer,
  regData: regReducer,
  restoreData: restoreReducer,
  scoreData: scoreReducer,
  newPassData: newPassReducer,
  settingsData: settingsReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(thunk)),
);

export default store;
