import {configureStore} from '@reduxjs/toolkit';
import authReducer, { logoutUser } from '../features/auth/authSlice.js';
import tripsReducer from '../features/trips/tripsSlice';
import api from '../services/api';
// import stationsReducer from '../features/stations/stationsSlice';

export const store = configureStore({
    reducer: {
        auth: authReducer,
        trips: tripsReducer,
        // stations: stationsReducer,
    },
});

/**
 * Sets up an Axios response interceptor to handle global API errors.
 * If a 401 Unauthorized response is received, it means the user's token is
 * invalid or expired. We automatically dispatch the logout action to clear
 * the user's session from the Redux state.
 */
const setupAxiosInterceptor = () => {
    api.interceptors.response.use(
        (res) => res,
        (err) => {
            if (err.response && err.response.status === 401 && store.getState().auth.isAuthenticated) {
                store.dispatch(logoutUser());
            }
            return Promise.reject(err);
        }
    );
};

setupAxiosInterceptor();
