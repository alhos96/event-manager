import { combineReducers } from "redux";
import usersReducers from "./usersSlice";

export default combineReducers({
  users: usersReducers,
});
