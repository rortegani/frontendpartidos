import { createStore, applyMiddleware } from "redux";
import {composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import indexReducer from "./reducers"; 

const middleware =[thunk];

const store= createStore(
    indexReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
