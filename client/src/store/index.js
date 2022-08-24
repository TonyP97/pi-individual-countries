import { createStore, applyMiddleware } from "redux";
import { compose, composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));