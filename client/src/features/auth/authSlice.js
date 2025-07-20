import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import api from '../../services/api';

export const login = createAsyncThunk(
    'auth/login',
    async (credentials, {rejectWithValue}) => {
        try {
            const response = await api.post('/auth/login', credentials);
            return response.data.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Login failed';
            return rejectWithValue(message);
        }
    }
);

export const registerUser = createAsyncThunk(
    'auth/register',
    async (userData, {rejectWithValue}) => {
        try {
            const response = await api.post('/auth/register', userData);
            // The register endpoint returns the new user's data upon success.
            // We return it here, but the current implementation only uses the success status.
            return response.data.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Registration failed';
            return rejectWithValue(message);
        }
    }
);
export const loadUser = createAsyncThunk(
    'auth/loadUser',
    async (_, {rejectWithValue}) => {
        try {
            const response = await api.get('/auth/profile');
            return response.data.data;
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Session expired';
            return rejectWithValue(message);
        }
    }
);

export const logoutUser = createAsyncThunk(
    'auth/logout',
    async (_, {rejectWithValue}) => {
        try {
            await api.post('/auth/logout');
            return;
        } catch (error) {
            const message = error.response?.data?.message || error.message || 'Logout failed';
            return rejectWithValue(message);
        }
    }
);
const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        isAuthenticated: false,
        loading: true,
        error: null,
        registrationSuccess: false
    },
    reducers: {
        clearRegistration: (state) => {
            state.registrationSuccess = false;
            state.error = null;
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(login.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.user = null;
                state.error = action.payload;
            })
            // Load User cases
            .addCase(loadUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
            })
            .addCase(loadUser.rejected, (state, action) => {
                state.isAuthenticated = false;
                state.user = null;
                // state.error = action.payload; // Set error on load user failure
            })
            // Registration cases
            .addCase(registerUser.fulfilled, (state, action) => {
                state.isAuthenticated = true;
                state.user = action.payload;
                state.registrationSuccess = true;
            })
            .addCase(registerUser.rejected, (state, action) => {
                state.error = action.payload;
                state.registrationSuccess = false;
            })
            // Logout cases
            .addCase(logoutUser.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logoutUser.rejected, (state, action) => {
                // If logout fails, we don't change the auth state, just show an error.
                state.error = action.payload;
            })
            // Matcher for all pending actions from this slice
            .addMatcher(
                (action) => action.type.startsWith('auth/') && action.type.endsWith('/pending'),
                (state) => {
                    state.loading = true;
                    state.error = null;
                }
            )
            // Matcher for all fulfilled/rejected actions to stop loading
            .addMatcher(
                (action) => action.type.startsWith('auth/') && (action.type.endsWith('/fulfilled') || action.type.endsWith('/rejected')),
                (state) => {
                    state.loading = false;
                }
            );
    }
});

export const {clearRegistration} = authSlice.actions;
export default authSlice.reducer;
