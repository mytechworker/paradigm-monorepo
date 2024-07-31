import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/router';
import { Divider, Button, Form, message } from 'antd';

import FormCards from '@client/components/cards/FormCards';
import Input from '@client/components/input/Input';
import InputWrapper from '@client/components/input/InputWrapper';

import config from '@client/config//default';
import { lowercase } from '@client/lib//helpers';

import Admin from '@client/layout//Admin';
import AuthorizedUser from '@client/middleware//AuthorizedUser';

import { useCreateCategoryMutation, useUpdateCategoryMutation, useGetCategoryQuery } from '@client/redux//api/categoryApi';

import { NextPageLayout } from '@client/types/page.types';
import { Category } from '@client/types/category.types';

type CategoryPageTypeProps = {
  type?: string | string[];
};

const CategoryPageType: NextPageLayout<CategoryPageTypeProps> = ({ type }) => {
  const router = useRouter();
  const id = router.query && router.query.type && router.query.type[1]; //category Id

  const [categoryData, setCategoryData] = useState<Category | null>(null);

  const [createCategory, { isLoading, isSuccess, error }] = useCreateCategoryMutation();

  const {
    isLoading: _loading,
    error: _error,
    data: category,
  } = useGetCategoryQuery(id!, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

  const [updateCategory, { isLoading: editLoading, error: editError, isSuccess: editSuccess }] =
    useUpdateCategoryMutation();

  useEffect(() => {
    if (error || editError) {
      error
        ? message.error((error as unknown as any).data.message)
        : message.error((editError as unknown as any).data.message);
    }
    if (isSuccess || editSuccess) {
      message.success(`category ${isSuccess ? 'created' : 'updated'} successfully.`);
      router.back();
    }
  }, [isSuccess, error, editSuccess, editError]);

  useEffect(() => {
    if (category) {
      setCategoryData(category);
    }
  }, [category]);

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  const uploadEventHandler = (e) => {
    if (Array.isArray(e)) {
      return e;
    }
    return e?.fileList;
  };

  const onSubmit = (data) => {
    if (data) {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]: unknown | any) => {
        if (key === 'image') {
          formData.append(key, value[0].originFileObj);
        } else {
          formData.append(key, value);
        }
      });

      createCategory(formData);
    }
  };

  const onEdit = (data) => {
    if (data) {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]: unknown | any) => {
        if (key === 'image') {
          formData.append(key, value[0].originFileObj);
        } else {
          formData.append('id', id!);
          formData.append(key, value);
        }
      });

      updateCategory({ title: data.title, id });
    }
  };

  if (isLoading || _loading) {
    return <span>Loading...</span>;
  }

  return (
    <>
      <FormCards>
        <Divider> {lowercase(String(type)) === 'create' ? 'Create Category' : 'Update Category'}</Divider>
        <InputWrapper name="category-form" data={categoryData} onFinish={!id ? onSubmit : onEdit}>
          <Input
            componentType="text"
            name="title"
            label="Title"
            rules={[{ required: true, message: 'title field is required!' }]}
          />
          <Input
            componentType="file"
            name="image"
            label="Upload Category Image"
            rules={[{ required: true, message: 'image field is required!' }]}
            formItemProps={{
              initialValue: category
                ? [{ name: 'image', url: config.UPLOAD_DIR.concat('/category_images/' + category.image), uid: '0' }]
                : [],
              valuePropName: 'fileList',
              getValueFromEvent: uploadEventHandler,
            }}
            uploadProps={{
              action: '/api/noop',
              accept: '.png,.jpeg,.jpg,.svg',
              maxCount: 1,
            }}
          />
          <Form.Item {...tailLayout}>
            <Button type="primary" htmlType="submit" style={{ margin: '0px 12px auto' }}>
              Submit
            </Button>
            <Button htmlType="reset" onClick={() => router.back()}>
              Cancel
            </Button>
          </Form.Item>
        </InputWrapper>
      </FormCards>
    </>
  );
};

export default CategoryPageType;

CategoryPageType.getInitialProps = async (ctx) => {
  const { type } = ctx.query;

  return {
    type,
  };
};

CategoryPageType.getLayout = (page) => (
  <Admin>
    <AuthorizedUser allowedRoles={['admin']}>{page}</AuthorizedUser>
  </Admin>
);
