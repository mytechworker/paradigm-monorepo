import React, { useState } from 'react';
import Link from 'next/link';
import { Table, TableColumnsType, TableProps } from 'antd';

// import { useGetCompaniesQuery } from '@client/redux//api/companyApi';

import FormCards from '@client/components/cards/FormCards';

import type { Company } from '@client/types/company.types';
import { formateDate } from '@client/lib//helpers';

type CompanyListFCProps = {
  data: Company[] | [];
};

const CompanyList: React.FC<CompanyListFCProps> = ({ data }) => {
  const [columns] = useState<TableColumnsType<Company>>(() => [
    {
      title: 'Sort',
      dataIndex: 'sort',
      //   render: () => <DragHandle />,
    },
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Image',
      dataIndex: '',
      key: 'image',
      render: (e) => <>{JSON.stringify(e)}</>,
    },
    {
      title: 'Banner Image',
      dataIndex: 'bannerImage',
      key: 'bannerImage',
      render: (e) => <>BannerIMG:SRC</>,
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
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
      render: (e: any) => (
        <>
          <Link href={`/admin/article/edit/${e.id}`}>Edit</Link>
          <br />
          <a href="/">Delete</a>
        </>
      ),
    },
  ]);

  return (
    <>
      <FormCards>
        <Table columns={columns} dataSource={data} />
      </FormCards>
    </>
  );
};

export default React.memo(CompanyList);
