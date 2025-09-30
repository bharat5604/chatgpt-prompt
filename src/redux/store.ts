import { configureStore } from "@reduxjs/toolkit";
import stepStateReducer from "./features/stepState";
import localizedContentReducer from "./features/localizedContent";
import { strapiApiSlice } from "./service/strapiSlice";

export const store = configureStore({
  reducer: {
    stepStateReducer,
    localizedContent: localizedContentReducer,
    [strapiApiSlice.reducerPath]: strapiApiSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(strapiApiSlice.middleware),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
