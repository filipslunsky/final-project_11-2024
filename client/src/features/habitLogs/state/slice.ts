import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const LOGS_URL = `${import.meta.env.VITE_API_URL}/logs`;

interface Log {
  log_id: number;
  habit_id: number;
  date: string;
};

interface LogItem {
    habitId: number;
    date: string;
};

interface LogsState {
  logs: Log[];
  logsStatus: 'idle' | 'loading' | 'success' | 'failed';
  addLogStatus:  'idle' | 'loading' | 'success' | 'failed';
  deleteLogStatus:  'idle' | 'loading' | 'success' | 'failed';
};

interface LogsApiResponse {
    success: boolean;
    habitLogs: Log[];
};

interface LogApiResponse {
    success: boolean;
    message: string;
};

const initialState: LogsState = {
  logs: [],
  logsStatus: 'idle',
  addLogStatus: 'idle',
  deleteLogStatus: 'idle',
};

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
};

export const getLogs = createAsyncThunk('logs/getLogs', async (habitId: number) => {
    const headers = getHeaders();
    const response = await axios.post<LogsApiResponse>(`${LOGS_URL}`, { habitId }, { headers }
  );
    return response.data.habitLogs;
});

export const addLog = createAsyncThunk('logs/addLog', async (logItem: LogItem) => {
    const headers = getHeaders();
    const response = await axios.post<LogApiResponse>(`${LOGS_URL}/new`, logItem, { headers }
    );
    return response.data.success;
});

export const deleteLog = createAsyncThunk('logs/deleteLog', async (logItem: LogItem) => {
    const headers = getHeaders();
    const response = await axios.post<LogApiResponse>(`${LOGS_URL}/delete`, logItem, { headers }
    );
    return response.data.success;
});

const logsSlice = createSlice({
  name: 'logs',
  initialState,
  reducers: {
    resetAddLogStatus: (state) => {
        state.addLogStatus = 'idle';
      },
      resetDeleteLogStatus: (state) => {
        state.deleteLogStatus = 'idle';
      },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getLogs.pending, (state) => {
        state.logsStatus = 'loading';
      })
      .addCase(getLogs.rejected, (state) => {
        state.logsStatus = 'failed';
      })
      .addCase(getLogs.fulfilled, (state, action: PayloadAction<Log[]>) => {
        state.logsStatus = 'success';
        state.logs = action.payload;
      })
      .addCase(addLog.pending, (state) => {
        state.addLogStatus = 'loading';
      })
      .addCase(addLog.rejected, (state) => {
        state.addLogStatus = 'failed';
      })
      .addCase(addLog.fulfilled, (state) => {
        state.addLogStatus = 'success';
      })
      .addCase(deleteLog.pending, (state) => {
        state.deleteLogStatus = 'loading';
      })
      .addCase(deleteLog.rejected, (state) => {
        state.deleteLogStatus = 'failed';
      })
      .addCase(deleteLog.fulfilled, (state) => {
        state.deleteLogStatus = 'success';
      })
  },
});

export const { resetAddLogStatus, resetDeleteLogStatus } = logsSlice.actions;
export default logsSlice.reducer;
