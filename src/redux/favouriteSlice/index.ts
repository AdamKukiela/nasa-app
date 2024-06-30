import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Favourite {
  url: string;
  title: string;
}

interface FavouritesState {
  items: Favourite[];
}

const initialState: FavouritesState = {
  items: [],
};

const favouritesSlice = createSlice({
  name: "favourites",
  initialState,
  reducers: {
    addFavourite(state, action: PayloadAction<Favourite>) {
      state.items.push(action.payload);
    },
  },
});

export const { addFavourite } = favouritesSlice.actions;
export default favouritesSlice.reducer;
