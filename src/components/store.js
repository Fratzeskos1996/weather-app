import { createSlice, configureStore } from "@reduxjs/toolkit";

const favoriteSlice = createSlice({
  name: "Favorites",
  initialState: { value: [] },
  reducers: {
    add(state, action) {
      state.value.push(action.payload);
    },
    remove(state, action) {
      state.value = state.value.filter(
        (city) => city.name !== action.payload.name
      );
    },
  },
});

const store = configureStore({
  reducer: {
    Favorites: favoriteSlice.reducer,
  },
});

export const { add, remove } = favoriteSlice.actions;

export default store;
