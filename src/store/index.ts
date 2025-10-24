import { configureStore } from "@reduxjs/toolkit";
import tenantReducer from "./slices/tenantSlice";
import usersReducer from "./slices/usersSlice";

export const store = configureStore({
  reducer: {
    tenant: tenantReducer,
    users: usersReducer,
  }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;