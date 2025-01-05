import { combineReducers } from '@reduxjs/toolkit';
import weatherSlice from './weatherSlice';

const rootReducer = combineReducers({
  weather: weatherSlice,
});

export default rootReducer;
