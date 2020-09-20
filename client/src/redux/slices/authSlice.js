import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import {
  user_login,
  check_token,
  change_password,
  bootstrap as start,
} from "../../api/users";

export const bootstrap = createAsyncThunk("bootstrap", async () => {
  return await start();
});

export const login = createAsyncThunk(
  "auth/login",
  async ({ username, password }, { rejectWithValue }) => {
    try {
      return await user_login(username, password);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const checkToken = createAsyncThunk(
  "auth/check",
  async (token, { rejectWithValue }) => {
    try {
      return await check_token(token);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const changePassword = createAsyncThunk(
  "auth/change",
  async ({ token, data }, { rejectWithValue }) => {
    try {
      return await change_password(token, data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  isLoggedIn: false,
  token: null,
  current: null,
  status: "idle",
  errors: [],
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      localStorage.removeItem("jwt");
      state.token = null;
      state.current = null;
      state.isLoggedIn = false;
    },
    clearErrors(state) {
      state.errors = [];
    },
  },
  extraReducers: {
    [login.pending]: (state) => {
      state.status = "loading";
    },
    [login.fulfilled]: (state, action) => {
      let token = action.payload.data["auth-token"];
      let payload = action.payload.data.payload;
      state.status = "logged in";
      state.token = token;
      state.current = payload;
      state.isLoggedIn = true;

      localStorage.setItem("jwt", token);
    },
    [login.rejected]: (state, action) => {
      let err = action.payload.response.data.message;
      state.status = "failed";
      state.errors.push(err);
    },
    [checkToken.pending]: (state) => {
      state.status = "loading";
    },
    [checkToken.fulfilled]: (state, action) => {
      let token = action.payload.data.token;
      let payload = action.payload.data.payload;
      state.status = "logged in";
      state.isLoggedIn = true;
      state.current = payload;
      state.token = token;

      localStorage.setItem("jwt", token);
    },
    [checkToken.rejected]: (state) => {
      state.status = "rejected";
      state.isLoggedIn = false;
      state.token = null;

      localStorage.removeItem("jwt");
    },
    [changePassword.rejected]: (state, action) => {
      let err = action.payload.response.data.message;
      state.status = "rejected";
      state.errors.push(err);
    },
  },
});

export const { logout, clearErrors } = authSlice.actions;

export const isLoggedInSelector = (state) => state.auth.isLoggedIn;
export const tokenSelector = (state) => state.auth.token;
export const authStatusSelector = (state) => state.auth.status;
export const currentUserSelector = (state) => state.auth.current;

export default authSlice.reducer;
