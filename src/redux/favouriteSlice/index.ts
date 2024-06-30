import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Favourite, FavouritesState } from "./types";

const initialState: FavouritesState = {
  items: [],
};

const savedMedia = localStorage.getItem("savedMedia");
if (savedMedia) {
  initialState.items = JSON.parse(savedMedia);
}

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addFavourite(state, action: PayloadAction<Favourite>) {
      state.items.push(action.payload);
      updateLocalStorage(state.items);
    },
    removeFavourite(state, action: PayloadAction<string>) {
      state.items = state.items.filter((item) => item.url !== action.payload);
      updateLocalStorage(state.items);
    },
  },
});

const updateLocalStorage = (items: Favourite[]) => {
  localStorage.setItem("savedMedia", JSON.stringify(items));
};

export const { addFavourite, removeFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;
