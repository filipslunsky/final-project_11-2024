import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const HABITS_URL = 'http://127.0.0.1:3001/habits';

interface Habit {
  habit_id: number;
  name: string;
  category: string;
  frequency: string;
  current_streak: number;
  max_streak: number;
  completed: boolean;
};

interface HabitsState {
  habits: Habit[];
  habitsStatus: 'idle' | 'loading' | 'success' | 'failed';
};

interface HabitsApiResponse {
    success: boolean;
    habits: Habit[];
};

const initialState: HabitsState = {
  habits: [],
  habitsStatus: 'idle',
};

export const getHabits = createAsyncThunk('habits/getHabits', async () => {
  const response = await axios.post<HabitsApiResponse>(`${HABITS_URL}/all`,
    { email: 'two@gmail.com' },
    {
      headers: {
        'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InR3b0BnbWFpbC5jb20iLCJpYXQiOjE3MzA2Mzk5OTYsImV4cCI6MTczMDcyNjM5Nn0.vCAJHcIKvODgLBwacabHeXnVNQte8kUbhDuvzyG3gZc',
        'Content-Type': 'application/json'
      }
    }
  );
  return response.data.habits;
});

const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getHabits.pending, (state) => {
        state.habitsStatus = 'loading';
      })
      .addCase(getHabits.rejected, (state) => {
        state.habitsStatus = 'failed';
      })
      .addCase(getHabits.fulfilled, (state, action: PayloadAction<Habit[]>) => {
        state.habitsStatus = 'success';
        state.habits = action.payload;
      });
  },
});

export default habitsSlice.reducer;
