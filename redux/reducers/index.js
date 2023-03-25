import { combineReducers } from "redux";
import userReducer from "./userReducer";
import bookingReducer from "./bookingReducer"  

let reducers = combineReducers({
  userReducer: userReducer,
  bookingReducer: bookingReducer, 
});

const rootReducer = (state, action) => {
  return reducers(state, action);
};

export default rootReducer;
