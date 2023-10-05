import { combineReducers } from "redux";
import itemReducer from "./Items/Reducer";
import userReducer from "./Users/Reducer";

const rootReducer = combineReducers({
  itemReducer, userReducer
});

export default rootReducer;