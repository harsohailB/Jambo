import { combineReducers } from "redux";
import userReducer from "./userReducer";
import { connectRouter } from "connected-react-router";
import shoppingCartReducer from "./shoppingCartReducer";

export const rootReducer = history => 
  combineReducers({
    user: userReducer,
    shoppingCart: shoppingCartReducer,
    router: connectRouter(history)
  });