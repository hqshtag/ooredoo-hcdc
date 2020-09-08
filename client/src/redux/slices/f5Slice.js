import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import Services from "../../api/services";

const f5Services = new Services("f5");

const initialState = {
  list: null,
  status: "idle",
  selected: null,
  errors: null,
};

export const getAll = createAsyncThunk(
  "f5/getAll",
  async (token, { rejectWithValue }) => {
    try {
      return await f5Services.get_all(token);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const f5Slice = createSlice({
  name: "f5",
  initialState,
  reducers: () => {},
  extraReducers: {
    [getAll.pending]: (state) => {
      state.status = "loading";
    },
    [getAll.fulfilled]: (state, action) => {
      // console.log(action);
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

export const f5Selector = (state) => state.f5.list;

export default f5Slice.reducer;
