import createSagaMiddleware from "redux-saga";
import { applyMiddleware, combineReducers, compose, createStore } from "redux";
import blockchain from "./blockchain/blockchain.reducer";


const sagaMiddleware = createSagaMiddleware();

const rootReducer = combineReducers({
    blockchain
});

const store = createStore(
    rootReducer,
    undefined,
    compose(
      applyMiddleware(sagaMiddleware),
      window.devToolsExtension ? window.devToolsExtension() : f => f
    )
);

export default store;