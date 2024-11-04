import { combineReducers, configureStore } from '@reduxjs/toolkit';
import habitsReducer from '../features/habits/state/slice.ts';
import logsReducer from '../features/logs/state/slice.ts';
import userReducer from '../features/user/state/slice.ts';

const appReducer = combineReducers({
    habits: habitsReducer,
    logs: logsReducer,
    user: userReducer,
});

const store = configureStore({
    reducer: appReducer
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;