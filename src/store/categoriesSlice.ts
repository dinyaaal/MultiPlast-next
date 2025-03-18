import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Category } from "@/types/types";

interface CategoriesState {
  categories: Category[];
}

const initialState: CategoriesState = {
  categories: [],
};

const categoriesSlice = createSlice({
  name: "categories",
  initialState,
  reducers: {
    setCategories(state, action: PayloadAction<Category[]>) {
      state.categories = action.payload;
    },
    addCategories(state, action: PayloadAction<Category[]>) {
      state.categories.push(...action.payload);
    },
  },
});

export const { setCategories, addCategories } = categoriesSlice.actions;
export default categoriesSlice.reducer;
