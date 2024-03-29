import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../axios";

export const fetchPosts = createAsyncThunk("posts/fetchPosts", async (params) => {
  const { data } = await axios.get(`/posts`, {params});
  return data;
});

export const fetchPost = createAsyncThunk("posts/fetchPost", async id => {
  const { data } = await axios.get(`/post/${id}`);
  return data;
});

export const updateRating = createAsyncThunk("posts/updateRating", async ({id, value}) => {
  const { data } = await axios.post(`/post/${id}/rating`, {rating: value});
  return data;
});

export const fetchTags = createAsyncThunk("posts/fetchTags", async () => {
  const { data } = await axios.get("/tags");
  return data;
});

export const fetchRemovePost = createAsyncThunk("posts/fetchRemovePost", async id => {
  await axios.delete(`/post/${id}`);
});

const initialState = {
  posts: {
    items: [],
    status: "loading",
  },
  post: {
    items: {},
    status: "loading",
  },
  tags: {
    items: [],
    status: "loading",
  },
};

const postsSlice = createSlice({
  name: "posts",
  initialState,
  reducers: {},
  extraReducers: {
    // Получение списка постов
    [fetchPosts.pending]: state => {
      state.posts.items = [];
      state.posts.status = "loading";
    },
    [fetchPosts.fulfilled]: (state, action) => {
      state.posts.items = action.payload;
      state.posts.status = "loaded";
    },
    [fetchPosts.rejected]: state => {
      state.posts.items = [];
      state.posts.status = "error";
    },

     // Получение одного поста
     [fetchPost.pending]: state => {
      state.post.items = {};
      state.post.status = "loading";
    },
    [fetchPost.fulfilled]: (state, action) => {
      state.post.items = action.payload;
      state.post.status = "loaded";
    },
    [fetchPost.rejected]: state => {
      state.post.items = {};
      state.post.status = "error";
    },

    // Получение списка тегов
    [fetchTags.pending]: state => {
      state.tags.items = [];
      state.tags.status = "loading";
    },
    [fetchTags.fulfilled]: (state, action) => {
      state.tags.items = action.payload;
      state.tags.status = "loaded";
    },
    [fetchTags.rejected]: state => {
      state.tags.items = [];
      state.tags.status = "error";
    },

    // Удаление поста
    [fetchRemovePost.pending]: (state, action) => {
      state.posts.items = state.posts.items.filter(obj => obj._id !== action.meta.arg);
    },
  },
});

export const selectPost = state => (state.posts.post);

export const postsReducer = postsSlice.reducer;
