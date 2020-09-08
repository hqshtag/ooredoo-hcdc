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

const interfaceSlice = createSlice({
  name: "interface",
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
  },
});

export const interfaceSelector = (state) => state.interface.list;

export default interfaceSlice.reducer;
