import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { alarmServices } from "../../api/services";

export const getAll = createAsyncThunk(
  "alarm/getAll",
  async (token, { rejectWithValue }) => {
    try {
      return await alarmServices.get_all(token);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const create = createAsyncThunk(
  "alarm/create",
  async ({ token, data }, { rejectWithValue }) => {
    try {
      return await alarmServices.create(data, token);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const remove = createAsyncThunk(
  "alarm/remove",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      return await alarmServices.remove(id, token);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteAll = createAsyncThunk(
  "alarm/remove/all",
  async (token, { rejectWithValue }) => {
    try {
      return await alarmServices.removeAll(token);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const initialState = {
  list: [],
  status: "idle",
  errors: null,
};

const alarmSlice = createSlice({
  name: "alarm",
  initialState,
  reducers: () => {},
  extraReducers: {
    [getAll.pending]: (state) => {
      state.status = "loading";
    },
    [getAll.fulfilled]: (state, action) => {
      //console.log(action);
      let data = action.payload.data.payload;
      state.status = "success";
      state.list = data;
    },
    [getAll.rejected]: (state, action) => {
      //console.log(action);
      state.status = "error";
    },
    [create.pending]: (state) => {
      state.status = "loading";
    },
    [create.fulfilled]: (state) => {
      state.status = "success";
    },
    [create.rejected]: (state) => {
      state.status = "rejected";
    },
    [remove.pending]: (state) => {
      state.status = "loading";
    },
    [remove.fulfilled]: (state) => {
      state.status = "success";
      //console.log(action);
    },
    [remove.rejected]: (state) => {
      state.status = "rejected";
    },
    [deleteAll.fulfilled]: (state) => {
      state.list = [];
    },
  },
});

export const alarmSelector = (state) => state.alarm.list;

export default alarmSlice.reducer;
