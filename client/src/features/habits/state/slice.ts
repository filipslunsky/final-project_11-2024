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
  deleteStatus: 'idle' | 'loading' | 'success' | 'failed';
  editStatus: 'idle' | 'loading' | 'success' | 'failed';
};

interface DeleteHabit {
    habitId: number;
};

interface EditHabit {
    habitId: number;
    name: string;
    category: string;
    frequency: string;
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

interface DeleteHabitApiResponse {
    success: boolean;
    message: string;
};

interface EditApiResponse {
    success: boolean;
    habitId: number;
    name: string;
    category: string;
    frequency: string;
};

const initialState: HabitsState = {
  habits: [],
  habitsStatus: 'idle',
  addStatus: 'idle',
  deleteStatus: 'idle',
  editStatus: 'idle',
};

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
};

export const getHabits = createAsyncThunk('habits/getHabits', async () => {
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const headers = getHeaders();
    const response = await axios.post<AllHabitsApiResponse>(`${HABITS_URL}/all`,
    { email: user.email }, { headers });
  return response.data.habits;
});

export const addHabit = createAsyncThunk('habits/addHabit', async (newHabit: NewHabit) => {
    const headers = getHeaders();
    const response = await axios.post<AddHabitApiResponse>(`${HABITS_URL}`, newHabit, { headers });
    return response.data.habit;
});

export const deleteHabit = createAsyncThunk('habits/deleteHabit', async (deleteHabit: DeleteHabit) => {
    const headers = getHeaders();
    const response = await axios.delete<DeleteHabitApiResponse>(`${HABITS_URL}/${deleteHabit.habitId}`, { headers });
    return response.data;
});

export const editHabit = createAsyncThunk('habits/editHabit', async (editHabit: EditHabit) => {
    const headers = getHeaders();
    const response = await axios.put<EditApiResponse>(`${HABITS_URL}`, editHabit, { headers });
    return response.data.success;
});

const habitsSlice = createSlice({
  name: 'habits',
  initialState,
  reducers: {
    resetAddHabitStatus: (state) => {
        state.addStatus = 'idle';
      },
      resetDeleteHabitStatus: (state) => {
        state.deleteStatus = 'idle';
      },
      resetEditHabitStatus: (state) => {
        state.editStatus = 'idle';
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
      .addCase(deleteHabit.pending, (state) => {
        state.deleteStatus = 'loading';
      })
      .addCase(deleteHabit.rejected, (state) => {
        state.deleteStatus = 'failed';
      })
      .addCase(deleteHabit.fulfilled, (state) => {
        state.deleteStatus = 'success';
      })
      .addCase(editHabit.pending, (state) => {
        state.editStatus = 'loading';
      })
      .addCase(editHabit.rejected, (state) => {
        state.editStatus = 'failed';
      })
      .addCase(editHabit.fulfilled, (state) => {
        state.editStatus = 'success';
      })
  },
});

export const { resetAddHabitStatus, resetDeleteHabitStatus, resetEditHabitStatus } = habitsSlice.actions;
export default habitsSlice.reducer;
