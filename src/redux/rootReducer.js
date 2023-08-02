import { combineReducers } from "@reduxjs/toolkit";
import countSlice from "./reducers/counter";
import tokenSlice from "./reducers/sessionToken";

const rootReducer = combineReducers({
  counter: countSlice,
  token: tokenSlice,
});

export default rootReducer;
