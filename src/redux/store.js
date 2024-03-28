import { configureStore } from "@reduxjs/toolkit";
import { postsReducer } from "./slices/posts";
import { authReducer } from "./slices/auth";
import { commentsReducer } from "./slices/comments";
import { feedbackReducer } from "./slices/feedback";

const store = configureStore({
  reducer: {
    comments: commentsReducer,
    posts: postsReducer,
    auth: authReducer,
    feedback: feedbackReducer,
  },
});

export default store;
