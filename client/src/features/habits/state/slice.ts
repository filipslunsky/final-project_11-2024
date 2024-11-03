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

interface NewHabit {
    email: string;
    name: string;
    category: string;
    frequency: string;
};

interface HabitsState {
  habits: Habit[];
  habitsStatus: 'idle' | 'loading' | 'success' | 'failed';
  addStatus: 'idle' | 'loading' | 'success' | 'failed';
};

interface AllHabitsApiResponse {
    success: boolean;
    habits: Habit[];
};

interface AddHabitApiResponse {
    success: boolean;
    message: string;
    habit: NewHabit[];
};

const initialState: HabitsState = {
  habits: [],
  habitsStatus: 'idle',
  addStatus: 'idle',
};

export const getHabits = createAsyncThunk('habits/getHabits', async () => {
  const response = await axios.post<AllHabitsApiResponse>(`${HABITS_URL}/all`,
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

export const addHabit = createAsyncThunk('habits/addHabit', async (newHabit: NewHabit) => {
    const response = await axios.post<AddHabitApiResponse>(`${HABITS_URL}`, newHabit, {
        headers: {
            'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InR3b0BnbWFpbC5jb20iLCJpYXQiOjE3MzA2Mzk5OTYsImV4cCI6MTczMDcyNjM5Nn0.vCAJHcIKvODgLBwacabHeXnVNQte8kUbhDuvzyG3gZc',
            'Content-Type': 'application/json'
          }
    })
    return response.data.habit;
});

const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    resetAddStatus: (state) => {
        state.addStatus = 'idle';
      }
  },
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
      })
      .addCase(addHabit.pending, (state) => {
        state.addStatus = 'loading';
      })
      .addCase(addHabit.rejected, (state) => {
        state.addStatus = 'failed';
      })
      .addCase(addHabit.fulfilled, (state) => {
        state.addStatus = 'success';
      })
  },
});

export const { resetAddStatus } = habitsSlice.actions;
export default habitsSlice.reducer;
