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
    toggleFormat(state) {
      state.tempFormat =
        state.tempFormat === "celsius" ? "fahrenheit" : "celsius";
    },
  },
});

const store = configureStore({
  reducer: {
    Favorites: favoriteSlice.reducer,
  },
});

export const { add, remove, toggleFormat } = favoriteSlice.actions;

export default store;
