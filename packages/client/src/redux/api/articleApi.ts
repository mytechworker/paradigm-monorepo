import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import { getApiURL } from '@client/utils//checkEnvironment';
import config from '@client/config//default';

import { CreateArticle, UpdateArticle, Params } from '@client/types/article.types';
import { GenericResponse } from '@client/types/types';

const baseUrl = getApiURL().concat(config.API_VERSION);

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    headers.set('authorization', `Bearer ${localStorage.getItem('token')}`);
  },
});

const articleApi = createApi({
  baseQuery,
  reducerPath: 'articleApi',
  keepUnusedDataFor: 30,
  tagTypes: ['articles', 'articles_all', 'article'],
  endpoints: (build) => ({
    getArticles: build.query<any, { page: number; limit: number }>({
      query: (query) => `article/?page=${query.page}&limit=${query.limit}`,
    }),
    getAllArticles: build.query<unknown[], void>({
      query: () => `article/all`,
      transformResponse: (res: GenericResponse<unknown[]>) => (res.data ? res.data : []),
    }),
    getArticle: build.query<any, string>({
      query: (id) => `article/${id}`,
    }),
    createArticle: build.mutation<GenericResponse<any>, CreateArticle | FormData>({
      query: (data) => {
        return {
          url: 'article/',
          method: 'POST',
          body: data,
        };
      },
    }),
    updateArticle: build.mutation<GenericResponse<any>, Partial<(UpdateArticle | FormData) & Pick<Params, 'id'>>>({
      query: (data) => {
        return {
          url: `article/${data.id}`,
          method: 'PUT',
          body: data,
        };
      },
    }),
    deleteArticle: build.mutation<GenericResponse<any>, string>({
      query: (id) => {
        return {
          url: `article/${id}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  useGetArticleQuery,
  useGetArticlesQuery,
  useGetAllArticlesQuery,
  useCreateArticleMutation,
  useUpdateArticleMutation,
  useDeleteArticleMutation,

  // lazy queries
  useLazyGetArticleQuery,
  useLazyGetArticlesQuery,
  useLazyGetAllArticlesQuery,
} = articleApi;

export default articleApi;
