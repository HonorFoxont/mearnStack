import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "./authService";

//Getting user from local storage
const user = JSON.parse(localStorage.getItem("user"));

const initialState = {
  user: user ? user : null,
  isError: false,
  isLoading: false,
  isSucess: false,
  messege: "",
};

//Register User
export const register = createAsyncThunk(
  "auth/register",
  async (user, thunkAPI) => {
    try {
      return authService.register(user);
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

//Login User
export const login = createAsyncThunk("auth/login", async (user, thunkAPI) => {
  try {
    return authService.login(user);
  } catch (error) {
    const messege =
      (error.response && error.response.data && error.response.data.messege) ||
      error.messege ||
      error.toString();
    return thunkAPI.rejectWithValue(messege);
  }
});

//Logout user
export const logout = createAsyncThunk("auth/logout", async () => {
  authService.logout();
});

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    reset: (state) => {
      state.isError = false;
      state.isLoading = false;
      state.isSucess = false;
      state.messege = "";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(register.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucess = true;
        state.user = action.payload;
      })
      .addCase(register.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.messege = action.payload;
        state.user = null;
      })
      .addCase(login.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSucess = true;
        state.user = action.payload;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.messege = action.payload;
        state.user = null;
      })
      .addCase(logout.fulfilled, (state) => {
        state.user = null;
      });
  },
});

export const { reset } = authSlice.actions;
export default authSlice.reducer;
