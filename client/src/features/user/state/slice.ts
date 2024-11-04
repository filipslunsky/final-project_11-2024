import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const USER_URL = 'http://127.0.0.1:3001/user';

interface User {
    firstName: string;
    lastName: string;
    email: string;
};

interface UserState {
    user: User | null;
    loggedIn: boolean;
    token: string | null;
    logMessage: string | null | undefined;
};

const initialState: UserState = {
    user: null,
    loggedIn: false,
    token: null,
    logMessage: null,
};

const loadUserFromLocalStorage = (): UserState => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');

    if (storedUser && storedToken) {
        return {
            user: JSON.parse(storedUser),
            loggedIn: true,
            token: storedToken,
            logMessage: 'Logged in successfully',
        };
    }
    return initialState;
};

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (credentials: { email: string; password: string }) => {
        try {
            const response = await axios.post(`${USER_URL}/login`, credentials);

            const { success, passwordMatch, firstName, lastName, email, token } = response.data;

            if (success && passwordMatch) {
                localStorage.setItem('user', JSON.stringify({ firstName, lastName, email }));
                localStorage.setItem('token', token);
                return { firstName, lastName, email, token, logMessage: 'Logged in successfully' };
            } else if (success && !passwordMatch) {
                throw new Error('Wrong password');
            } else {
                throw new Error('User does not exist');
            }
        } catch (error: any) {
            console.error('Login failed with error:', error.response?.data?.message || error.message);
            throw new Error(error.response?.data?.message || 'Login failed');
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: loadUserFromLocalStorage(),
    reducers: {
        logoutUser: (state) => {
            state.user = null;
            state.loggedIn = false;
            state.token = null;
            state.logMessage = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        },
    },
    extraReducers: (builder) => {
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.user = {
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
            };
            state.token = action.payload.token;
            state.loggedIn = true;
            state.logMessage = action.payload.logMessage;
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            console.error("Login failed:", action.error.message);
            state.loggedIn = false;
            state.logMessage = action.error.message;
        });
    },
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
