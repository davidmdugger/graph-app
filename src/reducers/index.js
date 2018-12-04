import { combineReducers } from "redux";
import pricesReducer from "./pricesReducer";

export default combineReducers({
  prices: pricesReducer
});
