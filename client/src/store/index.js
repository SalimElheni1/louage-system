import { configureStore } from '@reduxjs/toolkit';
import authReducer from '../features/auth/authSlice.js';
// import tripsReducer from '../features/trips/tripsSlice';
// import stationsReducer from '../features/stations/stationsSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    // trips: tripsReducer,
    // stations: stationsReducer,
  },
});
