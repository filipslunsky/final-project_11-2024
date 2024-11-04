import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const USER_URL = 'http://127.0.0.1:3001/user';

interface User {
    firstName: string;
    lastName: string;
    email: string;
};

interface UserState {
    user: User;
    loggedIn: boolean;
    token: string | null;
};

const initialState: UserState = {
    user: {
        firstName: '',
        lastName: '',
        email: ''
    },
    loggedIn: false,
    token: null
};

const loadUserFromLocalStorage = (): UserState => {
    const storedUser = localStorage.getItem('user');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
        return {
            user: JSON.parse(storedUser),
            loggedIn: true,
            token: storedToken
        };
    }
    return initialState;
};

export const loginUser = createAsyncThunk(
    'user/loginUser',
    async (credentials: { email: string; password: string }) => {
        try {
            const response = await axios.post(`${USER_URL}/login`, credentials);
            const { firstName, lastName, email, token } = response.data;

            localStorage.setItem('user', JSON.stringify({ firstName, lastName, email }));
            localStorage.setItem('token', token);

            return { firstName, lastName, email, token };
        } catch (error: any) {
            throw new Error(error.response?.data || "Login failed");
        }
    }
);

const userSlice = createSlice({
    name: 'user',
    initialState: loadUserFromLocalStorage(),
    reducers: {
        logoutUser: (state) => {
            state.user = initialState.user;
            state.loggedIn = false;
            state.token = null;
            localStorage.removeItem('user');
            localStorage.removeItem('token');
        }
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
        });
        builder.addCase(loginUser.rejected, (state, action) => {
            console.log("Login failed:", action.error.message);
            state.loggedIn = false;
        });
    }
});

export const { logoutUser } = userSlice.actions;
export default userSlice.reducer;
