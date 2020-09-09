import Services from "../../api/services";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const nodeServices = new Services("node");

const initialState = {
  list: null,
  status: "idle",
  selected: null,
  errors: null,
};

export const getAll = createAsyncThunk(
  "node/getAll",
  async (token, { rejectWithValue }) => {
    try {
      return await nodeServices.get_all(token);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const update = createAsyncThunk(
  "node/update",
  async ({ id, data, token }, { rejectWithValue }) => {
    try {
      return await nodeServices.update(data, id, token);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const remove = createAsyncThunk(
  "node/remove",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      return await nodeServices.remove(id, token);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const nodeSlice = createSlice({
  name: "node",
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
  },
});

export const nodeSelector = (state) => state.node.list;

export default nodeSlice.reducer;