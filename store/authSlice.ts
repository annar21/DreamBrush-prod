import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Define types for the thunk payload and return value
interface RegisterPayload {
    email: string;
    password: string;
}

interface AuthResponse {
    user: { id: string; email: string };
    token: string;
}

interface AuthState {
    user: { id: string; email: string } | null;
    token: string | null;
    loading: boolean;
    error: string | null;
}

// Register thunk with explicit types
export const register = createAsyncThunk<AuthResponse, RegisterPayload, { rejectValue: string }>(
    'auth/register',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post<AuthResponse>('http://your-backend-url/api/register', {
                email,
                password,
            });
            await AsyncStorage.setItem('token', response.data.token);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Registration failed');
        }
    }
);

// Login thunk with explicit types
export const login = createAsyncThunk<AuthResponse, RegisterPayload, { rejectValue: string }>(
    'auth/login',
    async ({ email, password }, { rejectWithValue }) => {
        try {
            const response = await axios.post<AuthResponse>('http://your-backend-url/api/login', {
                email,
                password,
            });
            await AsyncStorage.setItem('token', response.data.token);
            return response.data;
        } catch (err: any) {
            return rejectWithValue(err.response?.data?.message || 'Login failed');
        }
    }
);

// Validate token thunk
export const validateToken = createAsyncThunk<AuthResponse, void, { rejectValue: string }>(
    'auth/validateToken',
    async (_, { rejectWithValue }) => {
        try {
            const token = await AsyncStorage.getItem('token');
            console.log(token)
            if (!token) throw new Error('No token found');
            const response = await axios.get<AuthResponse>('http://your-backend-url/api/protected', {
                headers: { Authorization: `Bearer ${token}` },
            });
            return { user: response.data.user, token };
        } catch (err: any) {
            await AsyncStorage.removeItem('token');
            return rejectWithValue(err.message || 'Token validation failed');
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
            AsyncStorage.removeItem('token');
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
                state.user = action.payload.user;
                state.token = action.payload.token;
            })
            .addCase(validateToken.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
            });
    },
});

export const { logout } = authSlice.actions;
export default authSlice.reducer;
