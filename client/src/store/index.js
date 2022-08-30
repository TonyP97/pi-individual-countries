import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import thunk from "redux-thunk";
import rootReducer from "../reducers";

//al compose le pasamos como parametros los middlewares q queremos utilizar
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));