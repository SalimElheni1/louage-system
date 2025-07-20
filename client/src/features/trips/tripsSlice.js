import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../services/api';

// Async Thunk for creating a new trip
export const createTrip = createAsyncThunk(
    'trips/createTrip',
    async (tripData, {rejectWithValue}) => {
        try {
            const response = await api.post('/trips', tripData);
            return response.data.data; // The created trip object
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to create trip';
            return rejectWithValue(message);
        }
    }
);

// Async Thunk for fetching all trips
export const getAllTrips = createAsyncThunk(
    'trips/getAllTrips',
    async (_, {rejectWithValue}) => {
        try {
            const response = await api.get('/trips');
            return response.data.data; // The array of trips
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to fetch trips';
            return rejectWithValue(message);
        }
    }
);

// Async Thunk for fetching the current user's (driver's) trips
export const getMyTrips = createAsyncThunk(
    'trips/getMyTrips',
    async (_, {rejectWithValue}) => {
        try {
            const response = await api.get('/trips/my-trips');
            return response.data.data; // The array of the user's trips
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to fetch your trips';
            return rejectWithValue(message);
        }
    }
);

// Async Thunk for fetching a single trip by ID
export const getTripById = createAsyncThunk(
    'trips/getTripById',
    async (tripId, {rejectWithValue}) => {
        try {
            const response = await api.get(`/trips/${tripId}`);
            return response.data.data; // The single trip object
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to fetch trip details';
            return rejectWithValue(message);
        }
    }
);

// Async Thunk for updating a trip
export const updateTrip = createAsyncThunk(
    'trips/updateTrip',
    async ({tripId, tripData}, {rejectWithValue}) => {
        try {
            const response = await api.put(`/trips/${tripId}`, tripData);
            return response.data.data; // The updated trip object
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to update trip';
            return rejectWithValue(message);
        }
    }
);

// Async Thunk for deleting a trip
export const deleteTrip = createAsyncThunk(
    'trips/deleteTrip',
    async (tripId, {rejectWithValue}) => {
        try {
            await api.delete(`/trips/${tripId}`);
            // Return the ID so we can remove it from the state
            return tripId;
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Failed to delete trip';
            return rejectWithValue(message);
        }
    }
);

const tripsSlice = createSlice({
    name: 'trips',
    initialState: {
        trips: [],
        trip: null, // For a single trip view in the future
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getMyTrips.fulfilled, (state, action) => {
                state.trips = action.payload;
            })
            .addCase(getAllTrips.fulfilled, (state, action) => {
                state.trips = action.payload;
            })
            .addCase(getTripById.fulfilled, (state, action) => {
                state.trip = action.payload;
            })
            .addCase(createTrip.fulfilled, (state, action) => {
                // Add the new trip to the beginning of the list for immediate visibility.
                state.trips.unshift(action.payload);
            })
            .addCase(updateTrip.fulfilled, (state, action) => {
                state.trips = state.trips.map((trip) =>
                    trip._id === action.payload._id ? action.payload : trip
                );
                if (state.trip?._id === action.payload._id) {
                    state.trip = action.payload;
                }
            })
            .addCase(deleteTrip.fulfilled, (state, action) => {
                // action.payload is the tripId. We filter it out of the array.
                state.trips = state.trips.filter((trip) => trip._id !== action.payload);
            })
            .addMatcher(
                (action) => action.type.startsWith('trips/') && action.type.endsWith('/pending'),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            .addMatcher(
                (action) => action.type.startsWith('trips/') && action.type.endsWith('/rejected'),
                (state, action) => {
                    state.loading = false;
                    state.error = action.payload;
                }
            )
            .addMatcher(
                (action) => action.type.startsWith('trips/') && action.type.endsWith('/fulfilled'),
                (state) => {
                    state.loading = false;
                    state.error = null;
                }
            );
    }
});

export default tripsSlice.reducer;