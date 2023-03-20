import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
import {
  addProjectReducer,
  forgotPasswordReducer,
  userReducer,
  checkLoginReducer
} from "./reducers/userReducer";
import {getProjectSecretKeyReducer, getProjectsReducer} from './reducers/projectReducer'
import { findAllErrorLogsReducer } from "./reducers/errorLogReducer";

import {
  updateProjectReducer,
  deleteProjectReducer,
  findAllProjectsReducer,
} from "./reducers/projectReducer";

const reducer = combineReducers({
  user: userReducer,
  checkLogin:checkLoginReducer,
  forgotPassword: forgotPasswordReducer,
  addProject: addProjectReducer,
  getProjects: getProjectsReducer,
  findAllProjects: findAllProjectsReducer,
  deleteProject: deleteProjectReducer,
  findAllErrorLogs: findAllErrorLogsReducer,
  updateProject: updateProjectReducer,
  getProjectSecretKey:getProjectSecretKeyReducer
});

let initialState = {};

const middleware = [thunk];
const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;
