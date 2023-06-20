import { configureStore } from "@reduxjs/toolkit";
import authReducers from "../features/auth/authSlice";
import goalReducers from "../features/goals/goalSlice";

export const store = configureStore({
  reducer: {
    auth: authReducers,
    goals: goalReducers,
  },
});
