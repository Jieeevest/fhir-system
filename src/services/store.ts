import { configureStore } from "@reduxjs/toolkit";
import { api } from "./api";
import { authApi } from "./authApi";
import { cdnApi } from "./cdnApi";

export const store = configureStore({
  reducer: {
    [api.reducerPath]: api.reducer,
    [authApi.reducerPath]: authApi.reducer,
    [cdnApi.reducerPath]: cdnApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      api.middleware,
      authApi.middleware,
      cdnApi.middleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
