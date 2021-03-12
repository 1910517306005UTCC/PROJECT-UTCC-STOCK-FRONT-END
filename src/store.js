import { createStore, combineReducers, applyMiddleware, compose } from "redux";
import thunk from 'redux-thunk';
import { toolListReducer } from "./reducers/toolReducers";
import { boardListReducer } from "./reducers/boardReducers";

const inititalState = [];
const reducer = combineReducers({
    toolList: toolListReducer,
    boardList: boardListReducer
});

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(reducer, inititalState, composeEnhancer(applyMiddleware(thunk)));
export default store;
