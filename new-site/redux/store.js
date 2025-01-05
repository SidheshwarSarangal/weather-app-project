import { configureStore } from '@reduxjs/toolkit';
import rootReducer from './rootReducer'; // Ensure this file exists

const store = configureStore({
  reducer: rootReducer,
});

export default store;
