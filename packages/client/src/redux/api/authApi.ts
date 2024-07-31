import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import { getApiURL } from '@client/utils//checkEnvironment';
import config from '@client/config//default';

import { GenericResponse } from '@client/types/types';
import { Login, Profile } from '@client/types/user.types';

const baseUrl = getApiURL().concat(config.API_VERSION);

const baseQuery = fetchBaseQuery({
  baseUrl,
  credentials: 'include',
  prepareHeaders: (headers, { getState }) => {
    headers.set('authorization', `Bearer ${localStorage.getItem('token')}`);

    return headers;
  },
});

const authApi = createApi({
  baseQuery,
  reducerPath: 'authApi',
  keepUnusedDataFor: 30,
  tagTypes: ['me'],
  endpoints: (build) => ({
    getMe: build.query<Profile | undefined, void>({
      query: () => `user/me`,
      transformResponse: (res: GenericResponse<Profile>) => res.data,
      providesTags: ['me'],
    }),
    login: build.mutation<GenericResponse & { token: string }, Login>({
      query: (data) => {
        return {
          url: 'auth/login',
          body: data,
          method: 'POST',
        };
      },
      invalidatesTags: ['me'],
    }),
  }),
});

export const { useGetMeQuery, useLoginMutation } = authApi;

export default authApi;
