import { createApi, fetchBaseQuery, BaseQueryFn, FetchArgs, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';

import { getApiURL } from '@client/utils//checkEnvironment';
import config from '@client/config//default';

import { CreateCompany, UpdateCompany, Params } from '@client/types/company.types';
import { GenericResponse } from '@client/types/types';

const baseUrl = getApiURL().concat(config.API_VERSION);

const baseQuery: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = fetchBaseQuery({
  baseUrl,
  prepareHeaders: (headers) => {
    headers.set('authorization', `Bearer ${localStorage.getItem('token')}`);
  },
});

const companyApi = createApi({
  baseQuery,
  reducerPath: 'companyApi',
  keepUnusedDataFor: 30,
  tagTypes: ['companies', 'companies_all', 'company'],
  endpoints: (build) => ({
    getCompanies: build.query<any, { page: number; limit: number }>({
      query: (query) => `company/?page=${query.page}&limit=${query.limit}`,
    }),
    getAllCompanies: build.query<unknown[], void>({
      query: () => `company/all`,
      transformResponse: (res: GenericResponse<unknown[]>) => (res.data ? res.data : []),
    }),
    getCompany: build.query<any, string>({
      query: (id) => `company/${id}`,
    }),
    createCompany: build.mutation<GenericResponse<any>, CreateCompany | FormData>({
      query: (data) => {
        return {
          url: 'company/',
          method: 'POST',
          body: data,
        };
      },
    }),
    updateCompany: build.mutation<GenericResponse<any>, Partial<(UpdateCompany | FormData) & Pick<Params, 'id'>>>({
      query: (data) => {
        return {
          url: `company/${data.id}`,
          method: 'PUT',
          body: data,
        };
      },
    }),
    deleteCompany: build.mutation<GenericResponse<any>, string>({
      query: (id) => {
        return {
          url: `company/${id}`,
          method: 'DELETE',
        };
      },
    }),
  }),
});

export const {
  useGetCompanyQuery,
  useGetCompaniesQuery,
  useGetAllCompaniesQuery,
  useCreateCompanyMutation,
  useUpdateCompanyMutation,
  useDeleteCompanyMutation,

  // lazzy queries
  useLazyGetAllCompaniesQuery,
  useLazyGetCompaniesQuery,
  useLazyGetCompanyQuery,
} = companyApi;

export default companyApi;
