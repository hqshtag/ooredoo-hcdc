import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { ignoredActions } from "./Settings";
import AuthReducer from "./auth/authSlice";
import UsersReducer from "./users/usersSlice";

export default configureStore({
  middleware: getDefaultMiddleware({
    serializableCheck: {
      ignoredActions,
    },
  }),
  reducer: {
    auth: AuthReducer,
    users: UsersReducer,
  },
});
