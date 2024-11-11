import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

const REWARDS_URL = 'http://127.0.0.1:3001/rewards';

interface Reward {
    reward_id: number;
    symbol: number;
    frequency: string;
    reward_type: string;
    reward_group: string;
};

interface UserReward extends Reward {
    user_reward_id: number;
    user_id: number;
};

interface RewardsState {
    allRewards: Reward[];
    allRewardsStatus: 'idle' | 'loading' | 'success' | 'failed';
    userRewards: UserReward[];
    userRewardsStatus: 'idle' | 'loading' | 'success' | 'failed';
};

interface RewardsApiResponse {
    success: boolean;
    rewards: Reward[];
};

interface UserRewardsApiResponse {
    success: boolean;
    rewards: UserReward[];
};

const initialState: RewardsState = {
    allRewards: [],
    allRewardsStatus: 'idle',
    userRewards: [],
    userRewardsStatus: 'idle'
};

const getHeaders = () => {
    const token = localStorage.getItem('token');
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json',
    };
};

export const getAllRewards = createAsyncThunk('rewards/getAllRewards', async () => {
    const headers = getHeaders();
    const response = await axios.post<RewardsApiResponse>(`${REWARDS_URL}/all`,
    {}, { headers });
  return response.data.rewards;
});

export const getAllUserRewards = createAsyncThunk('rewards/getAllUserRewards', async () => {
    const headers = getHeaders();
    const user = JSON.parse(localStorage.getItem('user') || '{}');
    const response = await axios.post<UserRewardsApiResponse>(`${REWARDS_URL}`,
    { email: user.email }, { headers });
  return response.data.rewards;
});

const rewardsSlice = createSlice({
    name: 'rewards',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getAllRewards.pending, (state) => {
            state.allRewardsStatus = 'loading';
        })
        .addCase(getAllRewards.rejected, (state) => {
            state.allRewardsStatus = 'failed';
        })
        .addCase(getAllRewards.fulfilled, (state, action: PayloadAction<Reward[]>) => {
            state.allRewardsStatus = 'success';
            state.allRewards = action.payload;
        })
        .addCase(getAllUserRewards.pending, (state) => {
            state.userRewardsStatus = 'loading';
        })
        .addCase(getAllUserRewards.rejected, (state) => {
            state.userRewardsStatus = 'failed';
        })
        .addCase(getAllUserRewards.fulfilled, (state, action: PayloadAction<UserReward[]>) => {
            state.userRewardsStatus = 'success';
            state.userRewards = action.payload;
        })
    }
});

export default rewardsSlice.reducer;