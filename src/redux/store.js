import { combineReducers, configureStore } from '@reduxjs/toolkit'
import dashboard from './n2n/dashboard'
import global from './n2n/global'

const appReducers = combineReducers({
  global,
  dashboard,
});

const rootReducers = (state, action) => {
  if (action.type === "RESET_STATE") {
    localStorage.clear();
  }
  return appReducers(state, action);
};

export const store = configureStore({
  reducer: rootReducers,
})