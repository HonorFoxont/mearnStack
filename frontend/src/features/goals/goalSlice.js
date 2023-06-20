import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import goalService from "./goalService";

const initialState = {
  goals: [],
  isError: false,
  isLoading: false,
  isSuccess: false,
  messege: "",
};

//Creating Goals
export const createGoal = createAsyncThunk(
  "goals/create",
  async (goalData, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.createGoal(goalData, token);
    } catch (error) {
      const messege =
        (error.response &&
          error.response.data &&
          error.response.data.messege) ||
        error.messege ||
        error.toString();
      return thunkAPI.rejectWithValue(messege);
    }
  }
);

//Getting goals
export const getGoals = createAsyncThunk(
  "goals/getAll",
  async (_, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.getGoals(token);
    } catch (error) {
      const messege =
        (error.response &&
          error.response.data &&
          error.response.data.messege) ||
        error.messege ||
        error.toString();
      return thunkAPI.rejectWithValue(messege);
    }
  }
);

//Deleting Goal
export const deleteGoal = createAsyncThunk(
  "goals/delete",
  async (goalId, thunkAPI) => {
    try {
      const token = thunkAPI.getState().auth.user.token;
      return await goalService.deleteGoal(goalId, token);
    } catch (error) {
      const messege =
        (error.response &&
          error.response.data &&
          error.response.data.messege) ||
        error.messege ||
        error.toString();
      return thunkAPI.rejectWithValue(messege);
    }
  }
);

//Creating Goal Slice
export const goalSlice = createSlice({
  name: "goal",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSuccess = false;
      state.messege = "";
    },
  },
  extraReducers: (builders) => {
    builders
      .addCase(
        createGoal.pending || getGoals.pending || deleteGoal.pending,
        (state) => {
          state.isLoading = true;
        }
      )
      .addCase(
        createGoal.rejected || getGoals.pending || deleteGoal.pending,
        (state, action) => {
          state.isLoading = false;
          state.isError = true;
          state.messege = action.payload;
        }
      )
      .addCase(createGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals.push(action.payload);
      })
      .addCase(getGoals.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = action.payload;
      })
      .addCase(deleteGoal.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.goals = state.goals.filter(
          (goal) => goal._id !== action.payload.id
        );
      });
  },
});

export const { reset } = goalSlice.actions;
export default goalSlice.reducer;
