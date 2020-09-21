import Services from "../../api/services";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const errorServices = new Services("error");

const initialState = {
  list: [],
  status: "idle",
  selected: null,
  errors: null,
};

export const getAll = createAsyncThunk(
  "error/getAll",
  async (token, { rejectWithValue }) => {
    try {
      return await errorServices.get_all(token);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const update = createAsyncThunk(
  "error/update",
  async ({ id, data, token }, { rejectWithValue }) => {
    try {
      return await errorServices.update(data, id, token);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const remove = createAsyncThunk(
  "error/remove",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      return await errorServices.remove(id, token);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const createMany = createAsyncThunk(
  "error/create/many",
  async ({ data, token }, { rejectWithValue }) => {
    try {
      return await errorServices.create_many(data, token);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteAll = createAsyncThunk(
  "error/remove/all",
  async (token, { rejectWithValue }) => {
    try {
      return await errorServices.removeAll(token);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const errorSlice = createSlice({
  name: "error",
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
      state.list = [];
      state.status = "error";
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
    [update.pending]: (state) => {
      state.status = "loading";
    },
    [update.fulfilled]: (state) => {
      state.status = "success";
    },
    [update.rejected]: (state) => {
      state.status = "rejected";
    },
    [deleteAll.fulfilled]: (state) => {
      state.list = [];
    },
  },
});

export const errorSelector = (state) => state.error.list;

export default errorSlice.reducer;
