import { applyMiddleware, combineReducers, compose, createStore } from 'redux';
import thunk from 'redux-thunk';
import verifyReducer from './reducers/verify-reducer';
import authReducer from './reducers/auth-reducer';
import regReducer from './reducers/registration-reducer';
import scoreReducer from './reducers/score-reducer';

const rootReducer = combineReducers({
  verifyData: verifyReducer,
  authData: authReducer,
  regData: regReducer,
  scoreData: scoreReducer,
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
