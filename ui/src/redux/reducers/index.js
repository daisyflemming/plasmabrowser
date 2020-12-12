import { combineReducers } from "redux";
import { reducer as formReducer } from 'redux-form';
import rootReducer from "./rootReducer";

export const appReducer = combineReducers({
  rootReducer, 'form': formReducer});
