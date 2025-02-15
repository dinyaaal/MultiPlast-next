import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface Product {
  id: number;
  title: string;
  text: string;
  user_id: number;
  type_price: string;
  type_of_product: string;
  price: number;
  created_at: string;
  updated_at: string;
  is_blocked: number;
  block_reason: string | null;
  deleted_at: string | null;
  expiration_date: string | null;
  volume: number | null;
  price_per_volume: number | null;
}

interface FavoritesState {
  items: Product[];
}

const initialState: FavoritesState = {
  items: [],
};

const favoritesSlice = createSlice({
  name: "favorites",
  initialState,
  reducers: {
    addFavorite: (state, action: PayloadAction<Product>) => {
      if (!state.items.find((item) => item.id === action.payload.id)) {
        state.items.push(action.payload);
      }
    },
    removeFavorite: (state, action: PayloadAction<number>) => {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setFavorites: (state, action: PayloadAction<Product[]>) => {
      state.items = action.payload; 
    },
  },
});

export const { addFavorite, removeFavorite, setFavorites } = favoritesSlice.actions;
export default favoritesSlice.reducer;
