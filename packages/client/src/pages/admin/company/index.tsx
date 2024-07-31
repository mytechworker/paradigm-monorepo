import React, { useEffect } from 'react';
import { message } from 'antd';

import AuthorizedUser from '@client/middleware//AuthorizedUser';
import Admin from '@client/layout//Admin';
import { useReduxActions, useReduxState } from '@client/hooks/useReduxActions';

import CompanyList from '@client/components/data-tables/company/CompanyList';

import { useGetAllCompaniesQuery } from '@client/redux//api/companyApi';

import { NextPageLayout } from '@client/types/page.types';

const Index: NextPageLayout = () => {
  const dispatch = useReduxActions();
  const companySelector = useReduxState((state) => state.company.companies);

  const { isLoading, isError, error, data } = useGetAllCompaniesQuery(undefined);

  useEffect(() => {
    if (!isLoading && error) message.error((error as unknown as any).data.message);
    if (!isLoading && data) {
      console.log('🚀 ~ file: index.tsx:23 ~ useEffect ~ data:', data);
      dispatch.setCompanies(data);
    }
  }, [dispatch, isLoading, error, data]);

  if (isLoading) return <span>Loading...</span>;

  if (isError) return null;

  return <CompanyList data={companySelector ?? []} />;
};

export default Index;

Index.getLayout = (page) => (
  <AuthorizedUser allowedRoles={['admin']}>
    <Admin>{page}</Admin>
  </AuthorizedUser>
);
