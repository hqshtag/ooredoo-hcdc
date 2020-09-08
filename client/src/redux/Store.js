import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { ignoredActions } from "./Settings";
import AuthReducer from "./slices/authSlice";
import UsersReducer from "./slices/usersSlice";
import NodeReducer from "./slices/nodeSlice";
import F5Reducer from "./slices/f5Slice";
import InterfaceReducer from "./slices/interfaceSlice";

export default configureStore({
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions,
    },
  }),
  reducer: {
    auth: AuthReducer,
    users: UsersReducer,
    node: NodeReducer,
    f5: F5Reducer,
    interface: InterfaceReducer,
  },
});
