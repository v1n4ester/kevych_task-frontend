import { applyMiddleware, combineReducers, compose, legacy_createStore as createStote } from "redux";
import thunkMiddleware from 'redux-thunk'
import { appRreducer } from "./app-reducer.js";

const reducers = combineReducers({
    app: appRreducer,
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStote(reducers, composeEnhancers(applyMiddleware(thunkMiddleware)));

window.store = store;

export default store;