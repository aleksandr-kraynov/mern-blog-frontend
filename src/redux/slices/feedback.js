import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";


export const fetchFeedback = createAsyncThunk('feedback/fetchFeedback', async (params) => {
    const {data} = await axios.post('/feedback', params);
    return data;
})

const initialState = {
    data: null,
    status: null,
};

const feedbackSlice = createSlice({
    name: 'feedback',
    initialState,
    reducers: {
    },
    extraReducers: {
        [fetchFeedback.pending]: (state) => {
            state.status = 'loading';
            state.data = null;
        },
        [fetchFeedback.fulfilled]: (state, action) => {
            state.status = 'loaded';
            state.data = action.payload;

        },
        [fetchFeedback.rejected]: (state) => {
            state.status = 'error';
            state.data = null;
        }
    }
})

export const selectFeedback = state => (state.feedback);

export const feedbackReducer = feedbackSlice.reducer;