import { createSlice } from '@reduxjs/toolkit';

type ArticleSliceTypes = {
  article: unknown | null;
  articles: unknown[];
};

const initialState: ArticleSliceTypes = {
  article: null,
  articles: [],
};

const articleSlice = createSlice({
  name: 'article',
  initialState,
  reducers: {
    setArticle: (state, action) => {
      state.article = action.payload;
    },
    setArticles: (state, action) => {
      state.articles = action.payload;
    },
    resetArticle: (state) => {
      return {
        ...state,
        article: null,
      };
    },
    resetArticles: (state) => {
      return {
        ...state,
        articles: [],
      };
    },
  },
});

export const { setArticle, setArticles, resetArticle, resetArticles } = articleSlice.actions;

export default articleSlice;
