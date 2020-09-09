import Services from "../../api/services";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const interfaceServices = new Services("interface");

const initialState = {
  list: null,
  status: "idle",
  selected: null,
  errors: null,
};

export const getAll = createAsyncThunk(
  "interface/getAll",
  async (token, { rejectWithValue }) => {
    try {
      return await interfaceServices.get_all(token);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const update = createAsyncThunk(
  "interface/update",
  async ({ id, data, token }, { rejectWithValue }) => {
    try {
      return await interfaceServices.update(data, id, token);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const remove = createAsyncThunk(
  "interface/remove",
  async ({ id, token }, { rejectWithValue }) => {
    try {
      return await interfaceServices.remove(id, token);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const interfaceSlice = createSlice({
  name: "interface",
  initialState,
  reducers: {
    select(state, action) {
      state.selected = action.payload;
    },
    unselect(state) {
      state.selected = null;
    },
  },
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

export const interfaceSelector = (state) => state.interface.list;
export const selectedInterfaceSelector = (state) => state.interface.selected;
export const { select, unselect } = interfaceSlice.actions;

export default interfaceSlice.reducer;