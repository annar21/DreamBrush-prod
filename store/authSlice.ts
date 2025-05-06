import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const DEBUG = process.env.NODE_ENV === 'development';

interface RegisterPayload {
    email: string;
    password: string;
}

interface AuthResponse {
    user: { id: string; email: string; image_count: number; package: { name: string; image_limit: number } };
    token: string;
}

interface AuthState {
    user: { id: string; email: string; image_count: number; package: { name: string; image_limit: number } } | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

const API_BASE_URL = 'https://api.shopper.am/api';

const debugLog = (...args: any[]) => {
    if (DEBUG) console.log(...args);
};

export const register = createAsyncThunk<AuthResponse, RegisterPayload, { rejectValue: string }>(
    'auth/register',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            debugLog('Register: Sending request to', `${API_BASE_URL}/auth/register`);
            const response = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/register`, {
                email,
                password,
            });
            debugLog('Register response:', response.status, response.data);
            if (!response.data.token) {
                debugLog('Register: No token received');
                return rejectWithValue('No token received from server');
            }
            await AsyncStorage.setItem('token', response.data.token).catch((err) => {
                debugLog('AsyncStorage error:', err.message);
                throw new Error('Failed to store token');
            });
            return response.data;
        } catch (err: any) {
            debugLog('Register error:', err.response?.status, err.response?.data, err.message);
            if (!err.response) {
                return rejectWithValue('Network error. Please check your connection.');
            }
            if (err.response?.status === 404) {
                return rejectWithValue('API route not found. Please check server configuration.');
            }
            if (err.response?.status === 503) {
                return rejectWithValue('Service unavailable. Please try again later.');
            }
            return rejectWithValue(err.response?.data?.message || 'Registration failed');
        }
    }
);

export const login = createAsyncThunk<AuthResponse, RegisterPayload, { rejectValue: string }>(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            debugLog('Login: Sending request to', `${API_BASE_URL}/auth/login`);
            const response = await axios.post<AuthResponse>(`${API_BASE_URL}/auth/login`, {
                email,
                password,
            });
            debugLog('Login response:', response.status, response.data);
            if (!response.data.token) {
                debugLog('Login: No token received');
                return rejectWithValue('No token received from server');
            }
            await AsyncStorage.setItem('token', response.data.token).catch((err) => {
                debugLog('AsyncStorage error:', err.message);
                throw new Error('Failed to store token');
            });
            return response.data;
        } catch (err: any) {
            debugLog('Login error:', err.response?.status, err.response?.data, err.message);
            if (!err.response) {
                return rejectWithValue('Network error. Please check your connection.');
            }
            if (err.response?.status === 404) {
                return rejectWithValue('API route not found. Please check server configuration.');
            }
            if (err.response?.status === 503) {
                return rejectWithValue('Service unavailable. Please try again later.');
            }
            return rejectWithValue(err.response?.data?.message || 'Login failed');
        }
    }
);

export const validateToken = createAsyncThunk<string, void, { rejectValue: string }>(
    'auth/validateToken',
    async (_, { rejectWithValue }) => {
        try {
            debugLog('ValidateToken: Checking AsyncStorage');
            const token = await AsyncStorage.getItem('token');
            if (!token) {
                debugLog('ValidateToken: No token found');
                return rejectWithValue('No token found');
            }
            debugLog('ValidateToken: Token found locally');
            return token;
        } catch (err: any) {
            debugLog('ValidateToken error:', err.message);
            await AsyncStorage.removeItem('token').catch((err) =>
                debugLog('AsyncStorage error:', err.message)
            );
            return rejectWithValue('Failed to validate token locally');
        }
    }
);

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        loading: false,
        error: null,
    } as AuthState,
    reducers: {
        logout: (state) => {
            state.user = null;
            state.token = null;
            AsyncStorage.removeItem('token').catch((err) => debugLog('Logout error:', err.message));
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(register.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(register.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(login.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.loading = false;
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(login.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            })
            .addCase(validateToken.pending, (state) => {
                state.loading = true;
                state.error = null;
            })
            .addCase(validateToken.fulfilled, (state, action) => {
                state.loading = false;
                state.token = action.payload;
                // User data not updated, as validateToken is local
            })
            .addCase(validateToken.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.user = null;
                state.token = null;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
