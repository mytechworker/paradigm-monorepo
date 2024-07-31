import React, { useState } from 'react';
import Link from 'next/link';
import { Table, TableColumnsType, Button, message, Row } from 'antd';
import { Edit, Delete } from 'react-feather';

import FormCards from '@client/components/cards/FormCards';
import ImageFallback from '@client/components/image/ImageFallback';
import Input from '@client/components/input/Input';

import FormHeader from '@client/styles/styled/FormHeader';

import type { Category } from '@client/types/category.types';
import { formateDate } from '@client/lib//helpers';
import { getApiURL } from '@client/utils//checkEnvironment';

import { useReduxState } from '@client/hooks/useReduxActions';

const API_ENDPOINT = getApiURL();

type ArticleListProps = {
  addBtnText: string;
  onDelete: (id: string) => void;
  onSearch: (event: React.SyntheticEvent<HTMLInputElement>) => void;
};

const ArticleList: React.FC<ArticleListProps> = ({ addBtnText, onDelete, onSearch }) => {
  const articleSelector: any = useReduxState((state) => state.article.articles);

  const [columns] = useState<TableColumnsType<any>>(() => [
    {
      title: 'Title',
      dataIndex: 'title',
      key: 'title',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (e) => (
        <ImageFallback
          alt="category image"
          src={`${API_ENDPOINT}/uploads/category_images/${e}`}
          fallback="/images/no-image.png"
          height={160}
          width={200}
        />
      ),
    },
    {
      title: 'Company',
      dataIndex: '',
      key: 'company',
      render: (e: any) => <span>{e.company && e.company.name ? e.company.name : 'No Company'}</span>,
    },
    {
      title: 'Category',
      dataIndex: '',
      key: 'category',
      render: (e: any) => <span>{e.categories && e.categories.title ? e.categories.title : ''}</span>,
    },
    {
      title: 'Entry Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (e) => e && <p>{formateDate(e, 'DD/MM/YYYY')}</p>,
    },
    {
      title: 'Modified Date',
      dataIndex: 'updatedAt',
      key: 'updatedAt',
      render: (e) => e && <p>{formateDate(e, 'DD/MM/YYYY')}</p>,
    },
    {
      title: 'Action',
      dataIndex: '',
      key: 'x',
      ellipsis: true,
      render: (e: any) => (
        <Row style={{ gap: 4 }}>
          <Link href={`/admin/category/edit/${e._id}`} prefetch>
            <Button icon={<Edit />} size="middle" type="text">
              Edit
            </Button>
          </Link>

          <Button icon={<Delete />} size="middle" type="text" onClick={() => onDelete(e._id)}>
            Delete
          </Button>
        </Row>
      ),
    },
  ]);

  return (
    <>
      <FormCards>
        <FormHeader>
          <Input name="search" placeholder="Search" onChange={onSearch} />
          <Link href={'/admin/article/create'} prefetch>
            <Button type={'primary'}>{addBtnText}</Button>
          </Link>
        </FormHeader>
        <Table
          columns={columns}
          dataSource={articleSelector ?? []}
          rowKey={({ _id }) => _id}
          pagination={{ showSizeChanger: true }}
        />
      </FormCards>
    </>
  );
};

export default ArticleList;
