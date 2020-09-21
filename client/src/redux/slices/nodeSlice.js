import Services from "../../api/services";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

const nodeServices = new Services("node");

const initialState = {
  list: [],
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

export const createMany = createAsyncThunk(
  "node/create/many",
  async ({ data, token }, { rejectWithValue }) => {
    try {
      return await nodeServices.create_many(data, token);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

export const deleteAll = createAsyncThunk(
  "node/remove/all",
  async (token, { rejectWithValue }) => {
    try {
      return await nodeServices.removeAll(token);
    } catch (err) {
      return rejectWithValue(err);
    }
  }
);

const nodeSlice = createSlice({
  name: "node",
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

export const nodeSelector = (state) => state.node.list;
export const nodeUniqueNamesSelector = (state) => {
  let list = state.node.list;
  if (list && list.length > 0) {
    return [
      ...new Set(
        state.node.list.map((e) => {
          return e.name;
        })
      ),
    ];
  } else return [];
};
export default nodeSlice.reducer;
