const { createStore, compose, applyMiddleware } = require('redux');
const createSagaMiddleware = require('redux-saga');

const rootSagaCreator = require('./rootSaga');

module.exports = (reducer, saga, state) => {
  const composeEnhancers = (typeof window === 'object' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) ? window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ : compose;
  const sagaMiddleware = createSagaMiddleware.default()

  const store = createStore(
    reducer,
    state,
    composeEnhancers(
      applyMiddleware(sagaMiddleware)
    )
  );

  // sagaMiddleware.run(rootSagaCreator(saga));
  store.runSaga = sagaMiddleware.run
  store.close = () => store.dispatch(createSagaMiddleware.END)

  return store;
};
