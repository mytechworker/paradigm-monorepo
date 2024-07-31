import React, { useState, useEffect } from 'react';
import { message } from 'antd';

import CategoryList from '@client/components/data-tables/category/CategoryList';

import { useGetAllCategoriesQuery, useDeleteCategoryMutation } from '@client/redux//api/categoryApi';
import { useReduxActions, useReduxState } from '@client/hooks/useReduxActions';
import { NextPageLayout } from '@client/types/page.types';

import Admin from '@client/layout//Admin';
import AuthorizedUser from '@client/middleware//AuthorizedUser';

const Index: NextPageLayout = () => {
  // instances
  const dispatch = useReduxActions();

  const categorySelector = useReduxState((state) => state.category.categories);

  const [keyword, setKeyword] = useState<string | null>(null);

  const { isLoading, isError, data, error } = useGetAllCategoriesQuery(undefined);
  const [removeCategory, { isLoading: _loading, error: _error, data: result }] = useDeleteCategoryMutation(undefined);

  const onDeleteActionHandler = (id: string) => {
    if (window.confirm('please, confirm to remove this item.')) {
      // handle delete action
      removeCategory(id);
    }
  };

  const onSearchActionHandler = (event: React.SyntheticEvent<HTMLInputElement>) => {
    // console.log(event.currentTarget.value);
    setKeyword(event.currentTarget.value);
  };

  //#region useEffect Hooks Call
  useEffect(() => {
    if (!isLoading && error) {
      const error_message = (error as unknown as any).error;
      console.log(`>>> category fetch error`, error_message);
      message.error(error_message);
    }

    if (!isLoading && data) {
      dispatch.setCategories(data);
    }
  }, [error, isLoading, data]);

  useEffect(() => {
    if (!_loading && _error) {
      const error_message = (_error as unknown as any).data.message;
      console.log(`>>> category fetch error`, error_message);
      message.error(error_message);
    }

    if (!_loading && result) {
      message.success(result.message);
    }
  }, [_error, _loading, result]);

  useEffect(() => {
    if (keyword) {
      setTimeout(() => {
        // console.log(`throttled keyword is :`, keyword);
      }, 5000);
    }
  }, [keyword]);
  //#endregion

  if (isLoading || _loading) return <span>Loading...</span>;

  if (isError) return null;

  return (
    <CategoryList
      data={categorySelector ?? []}
      addBtnText={'Add Category'}
      onDelete={onDeleteActionHandler}
      onSearch={onSearchActionHandler}
    />
  );
};

export default Index;

Index.getLayout = (page) => (
  <AuthorizedUser allowedRoles={['admin']}>
    <Admin>{page}</Admin>
  </AuthorizedUser>
);
