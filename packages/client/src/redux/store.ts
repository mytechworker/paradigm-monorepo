import { configureStore } from '@reduxjs/toolkit';

// api imports
import { authApi, categoryApi, companyApi, articleApi } from '@client/redux//api/';

// features imports
import { category, user, article, company } from '@client/redux//features/';

const rootReducer = {
  [authApi.reducerPath]: authApi.reducer,
  [categoryApi.reducerPath]: categoryApi.reducer,
  [companyApi.reducerPath]: companyApi.reducer,
  [articleApi.reducerPath]: articleApi.reducer,
  [user.name]: user.reducer,
  [category.name]: category.reducer,
  [article.name]: article.reducer,
  [company.name]: company.reducer,
};

const createStore = () =>
  configureStore({
    reducer: rootReducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat([
        authApi.middleware,
        categoryApi.middleware,
        companyApi.middleware,
        articleApi.middleware,
      ]);
    },
  });

const store = createStore();

export type AppState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
