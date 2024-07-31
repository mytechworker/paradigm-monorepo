import React, { useEffect } from 'react';
import { Form, FormProps } from 'antd';
import { Category } from '@client/types/category.types';

interface InputWrapperProps {
  name: string;
  data: unknown | Category | null;
  children: React.ReactNode;
  onFinish: (data: unknown) => void;
}

const layout: FormProps = {
  labelCol: {
    xs: { span: 24 },
    sm: { span: 8 },
  },
  wrapperCol: {
    xs: { span: 24 },
    sm: { span: 16 },
  },
};

const InputWrapper: React.FC<InputWrapperProps> = ({ name, data, children, onFinish }) => {
  const [form] = Form.useForm();

  const excludedFields = ['image', 'banner_image'];

  useEffect(() => {
    if (data) {
      form.resetFields();

      // set edit user data
      Object.entries(data).map(([key, value]) => {
        form.setFieldsValue(
          !excludedFields.includes(key)
            ? {
                [key]: value,
              }
            : null,
        );
      });
    }
  }, [data]);

  const formSettings: FormProps = {
    form,
    name,
    onFinish,
    ...layout,
  };

  return <Form {...formSettings}>{children}</Form>;
};

export default InputWrapper;
