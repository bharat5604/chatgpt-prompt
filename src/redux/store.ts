// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
// import storage from "redux-persist/lib/storage";
import storage from "redux-persist/lib/storage/session";
import stepStateReducer from "./features/stepState";
import localizedContentReducer from "./features/localizedContent";
import personalInformationReducer from "./features/PersonalInformation";
import familyInformationReducer from "./features/FamilyInformation";
import situationReducer from "./features/SituationDescription";
import { strapiApiSlice } from "./service/strapiSlice";

const rootReducer = combineReducers({
  // <-- use sensible keys here that components expect
  stepState: stepStateReducer,
  personalInformation: personalInformationReducer,
  familyInformation: familyInformationReducer,
  situation: situationReducer,
  localizedContent: localizedContentReducer,
  [strapiApiSlice.reducerPath]: strapiApiSlice.reducer,
});

const persistConfig = {
  key: "root",
  storage,
  whitelist: ["stepState", "localizedContent", "personalInformation"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }).concat(
      strapiApiSlice.middleware
    ),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
