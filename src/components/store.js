import { createSlice, configureStore } from "@reduxjs/toolkit";

const savedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];

const favoriteSlice = createSlice({
  name: "Favorites",
  initialState: { value: savedFavorites },
  reducers: {
    add(state, action) {
      state.value.push(action.payload);
      localStorage.setItem("favorites", JSON.stringify(state.value));
    },
    remove(state, action) {
      state.value = state.value.filter(
        (city) => city.name !== action.payload.name
      );
      localStorage.setItem("favorites", JSON.stringify(state.value));
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
