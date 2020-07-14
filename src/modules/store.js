import createSagaMiddleware from "redux-saga";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
// import blockchain from "./blockchain/blockchain.reducer";
// import blockchain from "./blockchain/blockchain.reducer";
import device from "./devices/devices.reducer";
import { watchFetchDevices } from "./devices/devices.saga";



const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
  device
});

const store = createStore(
    rootReducer,
    undefined,
    compose(
      applyMiddleware(sagaMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

sagaMiddleware.run(watchFetchDevices);

export default store;