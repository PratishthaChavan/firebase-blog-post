// src/redux/store.js

import { configureStore } from '@reduxjs/toolkit';
import chatroomReducer from './chatroomSlice'; // We'll create this slice next

const store = configureStore({
  reducer: {
    chatroom: chatroomReducer,
    // Add other reducers here if you have more slices
  },
});

export default store;
