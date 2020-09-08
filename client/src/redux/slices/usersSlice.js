import { add_user, get_all, remove_user } from "../../api/users";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  status: "idle",
  list: [],
  selected: undefined,
  errors: [],
};

export const addUser = createAsyncThunk(
  "users/create",
  async ({ username, password, token }, { rejectWithValue }) => {
    try {
      return await add_user(username, password, token);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getAll = createAsyncThunk(
  "users/getAll",
  async (token, { rejectWithValue }) => {
    try {
      return await get_all(token);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const removeUser = createAsyncThunk(
  "users/remove",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      return await remove_user(id, token);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: () => {},
  extraReducers: {
    [addUser.pending]: (state) => {
      state.status = "loading";
    },
    [addUser.fulfilled]: (state, action) => {
      console.log(action);
      state.status = "success";
    },
    [addUser.rejected]: (state, action) => {
      console.log(action);
      state.status = "rejected";
    },
    [getAll.pending]: (state) => {
      state.status = "loading";
    },
    [getAll.fulfilled]: (state, action) => {
      let users = action.payload.data.payload;
      state.status = "success";
      state.list = users;
    },
    [getAll.rejected]: (state) => {
      state.status = "rejected";
    },
    [removeUser.pending]: (state) => {
      state.status = "loading";
    },
    [removeUser.fulfilled]: (state) => {
      state.status = "success";
    },
    [removeUser.rejected]: (state) => {
      state.status = "rejected";
    },
  },
});

export const usersSelector = (state) => state.users.list;
export default usersSlice.reducer;
