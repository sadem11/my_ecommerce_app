// src/store/slices/favouritesSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type FavsState = { ids: number[] };

// Load from localStorage if available
const storedFavourites = typeof window !== 'undefined'
  ? JSON.parse(localStorage.getItem('favourites') || '[]')
  : [];

const initialState: FavsState = { ids: storedFavourites };

const slice = createSlice({
  name: 'favourites',
  initialState,
  reducers: {
    toggleFavourite(state, action: PayloadAction<number>) {
      const id = action.payload;
      if (state.ids.includes(id)) {
        state.ids = state.ids.filter(x => x !== id);
      } else {
        state.ids.push(id);
      }
      localStorage.setItem('favourites', JSON.stringify(state.ids)); // persist
    },
    setFavourites(state, action: PayloadAction<number[]>) {
      state.ids = action.payload;
      localStorage.setItem('favourites', JSON.stringify(state.ids));
    },
    clearFavourites(state) {
      state.ids = [];
      localStorage.setItem('favourites', JSON.stringify([]));
    },
  },
});

export const { toggleFavourite, setFavourites, clearFavourites } = slice.actions;
export default slice.reducer;
