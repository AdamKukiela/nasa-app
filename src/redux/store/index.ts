import { configureStore } from "@reduxjs/toolkit";
import favouritesReducer from "../favouriteSlice";

export const store = configureStore({
  reducer: {
    favourites: favouritesReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
