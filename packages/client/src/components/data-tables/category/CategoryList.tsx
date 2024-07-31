import React, { useState } from 'react';
import Link from 'next/link';
import { Table, TableColumnsType, Button, Row } from 'antd';
import { Edit, Delete } from 'react-feather';

import FormCards from '@client/components/cards/FormCards';
import ImageFallback from '@client/components/image/ImageFallback';
import Input from '@client/components/input/Input';

import FormHeader from '@client/styles/styled/FormHeader';

import type { Category } from '@client/types/category.types';
import { formateDate } from '@client/lib//helpers';
import { getApiURL } from '@client/utils//checkEnvironment';

const API_ENDPOINT = getApiURL();

type CategoryListProps = {
  data: Category[] | [];
  addBtnText: string;
  onDelete: (id: string) => void;
  onSearch: (event: React.SyntheticEvent<HTMLInputElement>) => void;
};

const CategoryList: React.FC<CategoryListProps> = ({ data, addBtnText, onDelete, onSearch }) => {
  const [columns] = useState<TableColumnsType<Category>>(() => [
    {
      title: 'Sort',
      dataIndex: 'sort',
      //   render: () => <DragHandle />,
    },
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
          <Link href={'/admin/category/create'} prefetch>
            <Button type={'primary'}>{addBtnText}</Button>
          </Link>
        </FormHeader>
        <Table columns={columns} dataSource={data} rowKey={({ _id }) => _id} pagination={{ showSizeChanger: true }} />
      </FormCards>
    </>
  );
};

export default React.memo(CategoryList);
