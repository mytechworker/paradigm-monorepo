import React, { useEffect, useState } from 'react';
import { message } from 'antd';

import Admin from '@client/layout//Admin';
import AuthorizedUser from '@client/middleware//AuthorizedUser';
import { useReduxActions } from '@client/hooks/useReduxActions';

import ArticleList from '@client/components/data-tables/article/ArticleList';

import { useGetAllArticlesQuery } from '@client/redux//api/articleApi';

import { NextPageLayout } from '@client/types/page.types';

const Index: NextPageLayout = () => {
  // instances
  const dispatch = useReduxActions();

  const [keyword, setKeyword] = useState<string | null>(null);
  const [articles, setArticles] = useState<Array<any>>([]);

  const { isLoading, isError, error, data } = useGetAllArticlesQuery(undefined);

  const onDeleteActionHandler = (id: string) => {
    if (window.confirm('please, confirm to remove this item.')) {
      // handle delete action
    }
  };

  const onSearchActionHandler = (event: React.SyntheticEvent<HTMLInputElement>) => {
    // console.log(event.currentTarget.value);
    setKeyword(event.currentTarget.value);
  };

  useEffect(() => {
    if (!isLoading && error) {
      message.error((error as unknown as any).data.message);
    }
    if (!isLoading && data) {
      setArticles(data);
    }
  }, [isLoading, error, data]);

  if (isError) return null;

  if (isLoading) return <span>Loading....</span>;

  return <ArticleList addBtnText="add article" onDelete={onDeleteActionHandler} onSearch={onSearchActionHandler} />;
};

export default Index;

Index.getLayout = (Page) => (
  <Admin>
    <AuthorizedUser allowedRoles={['admin']}>{Page}</AuthorizedUser>
  </Admin>
);
