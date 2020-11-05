import {createStore, applyMiddleware, combineReducers} from 'redux';
import createSagaMiddleware from 'redux-saga';

import {problem3Reducer} from './reducer';

import sagas from './sagas';
const sagaMiddleware = createSagaMiddleware();
const store = createStore(
  combineReducers({
    problem3Reducer,
  }),
  applyMiddleware(sagaMiddleware),
);
export default store;
sagaMiddleware.run(sagas);
