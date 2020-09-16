import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
};

export const alertSlice = createSlice({
  name: "alerts",
  initialState,
  reducers: {
    createAlert: (state, action) => {
      state.list.splice(0);
      state.list.push({ ...action.payload, show: true });
    },
    createWarning: (state, action) => {
      state.list.splice(0);
      state.list.push({ message: action.payload, type: "warning", show: true });
    },
    createError: (state, action) => {
      state.list.splice(0);
      state.list.push({ message: action.payload, type: "error", show: true });
    },
    createSuccess: (state, action) => {
      state.list.splice(1);
      state.list.push({ message: action.payload, type: "success", show: true });
    },
    createInfo: (state, action) => {
      state.list.splice(0);
      state.list.push({ message: action.payload, type: "info", show: true });
    },
    updateList: (state) => {
      state.list = state.list.filter((n) => {
        return n.show === true;
      });
    },
    clearList: (state) => {
      state.list = [];
    },
    hideAlert: (state, action) => {
      state.list.map((n, i) => {
        if (i === action.payload) n.show = false;
        return n;
      });
    },
  },
});

export const {
  createAlert,
  createError,
  createInfo,
  createSuccess,
  createWarning,
  updateList,
  clearList,
  hideAlert,
} = alertSlice.actions;

export const alertsSelector = (state) => state.alerts.list;

export default alertSlice.reducer;
