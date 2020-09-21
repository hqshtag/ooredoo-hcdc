import { settingsServices } from "../../api/services";

const { createSlice, createAsyncThunk } = require("@reduxjs/toolkit");

const initialState = {
  oc: 70,
  ol: 70,
  version: "0.0.1-alpha",
  status: "idle",
  errors: null,
};

export const getSettings = createAsyncThunk(
  "settings/get",
  async (token, { rejectWithValue }) => {
    try {
      return await settingsServices.get(token);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const setSettings = createAsyncThunk(
  "settings/set",
  async ({ token, data }, { rejectWithValue }) => {
    try {
      return await settingsServices.update(token, data);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const settingsSlice = createSlice({
  name: "settings",
  initialState,
  reducers: () => {},
  extraReducers: {
    [getSettings.pending]: (state) => {
      state.status = "loading";
    },
    [getSettings.fulfilled]: (state, action) => {
      //console.log(action);
      let data = action.payload.data.payload;
      state.status = "success";
      const { oc, ol } = data;
      state.oc = oc;
      state.ol = ol;
      //state = { ...state, data };
    },
    [getSettings.rejected]: (state, action) => {
      //console.log(action);
      state.status = "error";
    },
  },
});

export default settingsSlice.reducer;
