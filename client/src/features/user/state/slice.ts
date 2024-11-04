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
    registerStatus: string | null | undefined;
    editStatus: string | null | undefined;
};

interface NewUser {
    firstName: string;
    lastName: string;
    email: string;
    password: string;
};

interface EditUser {
    firstName: string;
    lastName: string;
    password: string;
};

interface RegisterApiResponse {
    success: string;
    message: string;
};

interface EditApiResponse {
    success: boolean;
    message?: string;
    firstName?: string;
    lastName?: string;
};

const initialState: UserState = {
    user: null,
    loggedIn: false,
    token: null,
    logMessage: null,
    registerStatus: null,
    editStatus: null,
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
            registerStatus: '',
            editStatus: ''
        };
    }
    return initialState;
};

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
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
            throw new Error(error.response?.data?.message || 'Login failed - check your password');
        }
    }
);

export const registerUser = createAsyncThunk('user/registerUser', async (newUser: NewUser) => {
    const response = await axios.post<RegisterApiResponse>(`${USER_URL}/register`, newUser);
    return response.data;
});

export const editUser = createAsyncThunk('user/editUser', async (editItem: EditUser) => {
    const headers = getHeaders();
    const response = await axios.put<EditApiResponse>(USER_URL, editItem, { headers });
    
    if (response.data.success) {
        const { firstName, lastName } = response.data;
        const userJSON = localStorage.getItem('user');
        const user = userJSON ? JSON.parse(userJSON) : {};
        
        localStorage.setItem('user', JSON.stringify({
            ...user,
            firstName,
            lastName
        }));

        return response.data;
    } else {
        return response.data;
    }
});

export const deteleUser = createAsyncThunk('user/delete', async (deleteItem: {email: string}) => {
    const headers = getHeaders();
    const response = await axios.post<RegisterApiResponse>(`${USER_URL}/delete`, deleteItem, { headers });
    return response.data;
});


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
        resetRegisterStatus: (state) => {
            state.registerStatus = '';
        },
        resetEditStatus: (state) => {
            state.editStatus = '';
        },
    },
    extraReducers: (builder) => {
        builder
        .addCase(loginUser.fulfilled, (state, action) => {
            state.user = {
                firstName: action.payload.firstName,
                lastName: action.payload.lastName,
                email: action.payload.email,
            };
            state.token = action.payload.token;
            state.loggedIn = true;
            state.logMessage = action.payload.logMessage;
        })
        .addCase(loginUser.rejected, (state, action) => {
            console.error("Login failed:", action.error.message);
            state.loggedIn = false;
            state.logMessage = action.error.message;
        })
        .addCase(registerUser.pending, (state) => {
            state.registerStatus = 'loading';
        })
        .addCase(registerUser.rejected, (state) => {
            state.registerStatus = 'failed';
        })
        .addCase(registerUser.fulfilled, (state) => {
            state.registerStatus = 'success';
        })
        .addCase(editUser.pending, (state) => {
            state.editStatus = 'loading';
        })
        .addCase(editUser.rejected, (state) => {
            state.editStatus = 'failed';
        })
        .addCase(editUser.fulfilled, (state, action) => {
            state.editStatus = 'success';
            state.user = {
                firstName: action.payload.firstName || state.user?.firstName || '',
                lastName: action.payload.lastName || state.user?.lastName || '',
                email: state.user?.email || ''
            };
        })
    },
});

export const { logoutUser, resetRegisterStatus, resetEditStatus } = userSlice.actions;
export default userSlice.reducer;
