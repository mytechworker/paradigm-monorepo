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

import { useGetArticleQuery, useCreateArticleMutation, useUpdateArticleMutation } from '@client/redux//api/articleApi';

import { NextPageLayout } from '@client/types/page.types';

interface ArticlePageTypeProps {
  type?: string | string[];
}

const ArticlePageType: NextPageLayout<ArticlePageTypeProps> = ({ type }) => {
  const router = useRouter();

  const id = router.query && router.query.type && router.query.type[1]; //article Id

  const options = ['---- Select ----', 'b', 'c'];

  const [articleData, setArticleData] = useState<Array<any>>([]);

  const {
    isLoading,
    error,
    data: article,
  } = useGetArticleQuery(id!, {
    skip: !id,
    refetchOnMountOrArgChange: true,
  });

  const [createArticle, { isLoading: _loading, error: _error, data: _data }] = useCreateArticleMutation();
  const [editArticle, { isLoading: editLoading, error: editError, data: editData }] = useUpdateArticleMutation();

  const tailLayout = {
    wrapperCol: { offset: 8, span: 16 },
  };

  useEffect(() => {
    if (article) {
      setArticleData(article);
    }
  }, [article]);

  const onSubmit = (data) => {
    if (data) {
      console.log('🚀 ~ file: [...type].tsx:53 ~ onSubmit ~ data:', data);
      // createArticle(data);
    }
  };

  const onEdit = (data) => {
    if (data) {
      console.log('🚀 ~ file: [...type].tsx:60 ~ onEdit ~ data:', data);
      // editArticle(data);
    }
  };

  if (isLoading || _loading) return <span>Loading...</span>;

  return (
    <>
      <FormCards>
        <Divider> {lowercase(String(type)) === 'create' ? 'Create Article' : 'Update Article'}</Divider>
        <InputWrapper name="article-form" data={articleData} onFinish={!id ? onSubmit : onEdit}>
          <Input
            componentType="text"
            name="title"
            label="Title"
            rules={[{ required: true, message: 'title field is required!' }]}
          />
          <Input componentType="textarea" name="description" label="Description" />
          <Input
            componentType="select"
            name="company"
            label="Select Company"
            placeholder="Select Company"
            selectOptions={options}
            formItemProps={{
              initialValue: options[0],
            }}
          />
          <Input
            componentType="file"
            name="image"
            label="Upload Article Image"
            rules={[{ required: true, message: 'image field is required!' }]}
            formItemProps={{
              initialValue: article
                ? [{ name: 'image', url: config.UPLOAD_DIR.concat('/articles/' + article.image), uid: '0' }]
                : [],
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

export default ArticlePageType;

ArticlePageType.getInitialProps = async (ctx) => {
  const { type } = ctx.query;

  return {
    type,
  };
};

ArticlePageType.getLayout = (page) => (
  <AuthorizedUser allowedRoles={['admin']}>
    <Admin>{page}</Admin>
  </AuthorizedUser>
);
