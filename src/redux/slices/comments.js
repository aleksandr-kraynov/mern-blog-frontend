import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axios from '../axios';

export const fetchComments = createAsyncThunk('comments/fetchComments', async id => {
  const { data } = await axios.get(`/posts/${id}/comments`);
  return data;
});

export const fetchLastComments = createAsyncThunk('comments/fetchLastComments', async type => {
  const { data } = await axios.get(`/posts/comments/${type}`);
  return data;
});

export const createComments = createAsyncThunk('comments/addComments', async ({postId, params}) => {
  const { data } = await axios.post(`/posts/${postId}/comment`, params);
  return data;
});

export const deleteComment= createAsyncThunk('comments/deleteComment', async id => {
  const { data } = await axios.delete(`/posts/comment/${id}`);
  return data;
});

const initialState = {
  items: [],
  lastComments: [],
  status: 'loading',
};

const commentsSlice = createSlice({
  name: 'comments',
  initialState,
  reducers: {},
  extraReducers: {
    [fetchComments.pending]: state => {
      state.items = [];
      state.status = 'loading';
    },
    [fetchComments.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'loaded';
    },
    [fetchComments.rejected]: state => {
      state.items = [];
      state.status = 'error';
    },
    [fetchLastComments.pending]: state => {
      state.lastComments = [];
      state.status = 'loading';
    },
    [fetchLastComments.fulfilled]: (state, action) => {
      state.lastComments = action.payload;
      state.status = 'loaded';
    },
    [fetchLastComments.rejected]: state => {
      state.lastComments = [];
      state.status = 'error';
    },
    [createComments.pending]: state => {
      state.items = [];
      state.status = 'loading';
    },
    [createComments.fulfilled]: (state, action) => {
      state.items = action.payload;
      state.status = 'loaded';
    },
    [createComments.rejected]: state => {
      state.items = [];
      state.status = 'error';
    },
  },
});

export const selectComments = state => (state.comments);

export const commentsReducer = commentsSlice.reducer;
