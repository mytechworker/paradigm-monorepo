import { createSlice } from '@reduxjs/toolkit';

import type { Category } from '@client/types/category.types';

type CatgorySliceTypes = {
  category: Category | null;
  categories: Category[] | [];
};

const initialState: CatgorySliceTypes = {
  category: null,
  categories: [],
};

const CategorySlice = createSlice({
  name: 'category',
  initialState,
  reducers: {
    setCategory: (state, action) => {
      state.category = action.payload;
    },

    setCategories: (state, action) => {
      state.categories = action.payload;
    },

    resetCategories: (state) => {
      return {
        ...state,
        categories: [],
      };
    },

    resetCategory: (state) => {
      return {
        ...state,
        category: null,
      };
    },
  },
});

export const { setCategories, setCategory, resetCategories, resetCategory } = CategorySlice.actions;

export default CategorySlice;
