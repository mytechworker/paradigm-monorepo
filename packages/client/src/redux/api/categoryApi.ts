import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import { getApiURL } from '@client/utils//checkEnvironment';
import config from '@client/config//default';

import type { Category, Params } from '@client/types/category.types';
import type { GenericResponse } from '@client/types/types';

const baseUrl = getApiURL().concat(config.API_VERSION);

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers, { getState }) => {
    headers.set('authorization', `Bearer ${localStorage.getItem('token')}`);

    return headers;
  },
});

const categoryApi = createApi({
  baseQuery,
  reducerPath: 'categoryApi',
  keepUnusedDataFor: 30,
  tagTypes: ['Category', 'Categories', 'Categories_All'],
  endpoints: (build) => ({
    getCategories: build.query<Category[], { page: number; limit: number }>({
      query: (query) => `category?page=${query.page}&limit=${query.limit}`,
      transformResponse: (result: { data: Category[] }) => result.data,
      providesTags: ['Categories'],
    }),
    getAllCategories: build.query<Category[], void>({
      query: () => `category/all`,
      transformResponse: (result: { data: Category[] }) => result.data,
      providesTags: ['Categories_All'],
    }),
    getCategory: build.query<Category, string>({
      query: (id) => `category/${id}`,
      providesTags: ['Category'],
      transformResponse: (result: GenericResponse<Category>) => result.data!,
    }),
    createCategory: build.mutation<Category, Partial<Category> | FormData>({
      query: (category) => ({
        url: 'category?dir=category_images',
        method: 'POST',
        body: category,
      }),
      invalidatesTags: ['Categories', 'Categories_All'],
    }),
    updateCategory: build.mutation<Category, Partial<(Category | FormData) & Pick<Params, 'id'>>>({
      query: (category) => ({
        url: `category/${category.id}`,
        method: 'PUT',
        body: category,
      }),
      invalidatesTags: ['Categories', 'Categories_All'],
    }),
    deleteCategory: build.mutation<GenericResponse, string>({
      query: (categoryId) => ({
        url: `category/${categoryId}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Categories', 'Categories_All'],
    }),
  }),
});

export const {
  useGetCategoryQuery,
  useGetCategoriesQuery,
  useGetAllCategoriesQuery,
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
} = categoryApi;

export default categoryApi;
