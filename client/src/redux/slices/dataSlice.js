import { dataServices } from "../../api/services";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  nodes: [],
  interfaces: [],
  status: "idle",
  errors: null,
};

export const getNodesData = createAsyncThunk(
  "data/getNodes",
  async (token, { rejectWithValue }) => {
    try {
      return await dataServices.get_nodes(token);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const getInterfaceData = createAsyncThunk(
  "data/getInterfaces",
  async (token, { rejectWithValue }) => {
    try {
      return await dataServices.get_interfaces(token);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const clearData = createAsyncThunk(
  "data/clear",
  async (token, { rejectWithValue }) => {
    try {
      return await dataServices.removeAll(token);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const dataSlice = createSlice({
  name: "data",
  initialState,
  reducers: () => {},
  extraReducers: {
    [getInterfaceData.pending]: (state) => {
      state.status = "loading";
    },
    [getInterfaceData.fulfilled]: (state, action) => {
      //console.log(action);
      let data = action.payload.data.payload;
      state.status = "success";
      state.interfaces = data;
    },
    [getInterfaceData.rejected]: (state, action) => {
      //console.log(action);
      state.status = "error";
    },
    [getNodesData.pending]: (state) => {
      state.status = "loading";
    },
    [getNodesData.fulfilled]: (state, action) => {
      //console.log(action);
      let data = action.payload.data.payload;
      state.status = "success";
      state.nodes = data;
    },
    [getNodesData.rejected]: (state, action) => {
      //console.log(action);
      state.status = "error";
    },
    [clearData.fulfilled]: (state) => {
      state.nodes = [];
      state.interfaces = [];
    },
  },
});

export const nodesDataSelector = (state) => state.data.nodes;
export const interfacesDataSelector = (state) => state.data.interfaces;

export default dataSlice.reducer;
