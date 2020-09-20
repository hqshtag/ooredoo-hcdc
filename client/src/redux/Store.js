import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { ignoredActions } from "./Settings";
import AuthReducer from "./slices/authSlice";
import UsersReducer from "./slices/usersSlice";
import NodeReducer from "./slices/nodeSlice";
import F5Reducer from "./slices/f5Slice";
import InterfaceReducer from "./slices/interfaceSlice";
import AlertReducer from "./slices/alertSlice";
import ErrorReducer from "./slices/errorSlice";
import AlarmReducer from "./slices/alarmSlice";
import DataReducer from "./slices/dataSlice";
import SettingsReducer from "./slices/settingsSlice";

export default configureStore({
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions,
    },
  }),
  reducer: {
    settings: SettingsReducer,
    data: DataReducer,
    alerts: AlertReducer,
    auth: AuthReducer,
    users: UsersReducer,
    node: NodeReducer,
    f5: F5Reducer,
    interface: InterfaceReducer,
    error: ErrorReducer,
    alarm: AlarmReducer,
  },
});
