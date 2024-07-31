import { Button, Divider, Form, FormInstance, Input, message } from 'antd';
import { useRouter } from 'next/router';
import { useEffect, useMemo, useState } from 'react';
import styled from 'styled-components';

import { useLoginMutation } from '@client/redux/api/authApi';
import getErrorMessage from '@client/utils/getErrorMessage';

interface SubmitButtonProps {
  form: FormInstance;
}

const signin = () => {
  const router = useRouter();
  // const [auth_token, setAuthToken] = useCookies(['auth_token']);
  const [token, setToken] = useState<String | null>(null);

  // const cookieOptions: ReactCookieProps['defaultSetOptions'] = {
  //   secure: process.env.NODE_ENV === 'production',
  // };

  const [form] = Form.useForm();

  const [login, { isLoading, error, data }] = useLoginMutation();

  const onFinish = (values) => {
    const { email, password } = values;

    const loginInfo = {
      email,
      password,
    };
    console.log('🚀 ~ onFinish ~ loginInfo:', loginInfo);

    login(loginInfo);
  };

  useEffect(() => {
    if (!isLoading && error) {
      message.error(getErrorMessage(error));
    }

    if (!isLoading && data) {
      // set token & redirect
      localStorage.setItem('token', data.token);
      setToken(data.token);
      message.success(data.message);
      router.replace('/admin/category');
    }
  }, [isLoading, error, data]);

  if (isLoading) return <span>Loading...</span>;

  return (
    <LoginContainerDiv>
      <div className="admin_signin_page">
        <div className="container">
          <div className="card">
            <h2>Login</h2>
            <Form form={form} name="validateOnly" layout="vertical" autoComplete="off" onFinish={onFinish}>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true, message: 'Please enter email address!' }]}
              >
                <Input data-cy="input-email" />
              </Form.Item>
              <Form.Item
                name="password"
                label="Password"
                rules={[{ required: true, message: 'Please enter password!' }]}
              >
                <Input.Password data-cy="input-password" />
              </Form.Item>
              <Divider style={{ color: 'white' }} />
              <SubmitButton form={form}>Submit</SubmitButton>
            </Form>
          </div>
        </div>
      </div>
    </LoginContainerDiv>
  );
};

export default signin;

const SubmitButton: React.FC<React.PropsWithChildren<SubmitButtonProps>> = ({ form, children }) => {
  const [submittable, setSubmittable] = useState<boolean>(false);

  // Watch all values
  const values = Form.useWatch([], form);

  const isValidFormValues = useMemo(() => {
    const { email, password } = values || {};
    // console.log('🚀 ~ isValidFormValues ~ values:', values);

    if (email && password) {
      const hasUpper = password.match(/[A-Z]/);
      const hasLower = password.match(/[a-z]/g);
      const hasNumber = password.match(/[0-9]/g);

      // regex email check
      const emailRegex =
        /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

      const isValidEmail = emailRegex.test(email);

      if (isValidEmail && hasLower && hasUpper && hasNumber) return true;
    }

    return false;
  }, [values]);

  useEffect(() => {
    if (isValidFormValues) {
      setSubmittable(true);
    } else {
      setSubmittable(false);
    }
  }, [form, isValidFormValues]);

  return (
    <Button data-cy="submit-btn" type="primary" htmlType="submit" disabled={!submittable} block>
      {children}
    </Button>
  );
};

export const LoginContainerDiv = styled.div`
  .admin_signin_page {
    width: 100%;
    height: 100%;
    font-family: 'Roboto', sans-serif;
    margin: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 100vh;
    background-color: #282c37 !important;
    color: #fff !important;
  }

  .container {
    width: 100%;
    max-width: 400px;
  }

  .card {
    background-color: #373d4b;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  }

  h2 {
    text-align: center;
    color: #61dafb;
    font-size: 24px;
  }

  form {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 6px;
  }

  input {
    padding: 10px;
    margin-bottom: 12px;
    border: 1px solid #61dafb;
    border-radius: 4px;
    transition: border-color 0.3s ease-in-out;
    outline: none;
    color: #282c37;
  }

  input:focus {
    border-color: #90caf9;
  }

  .ant-btn {
    background-color: #61dafb !important;
    color: #282c37 !important;
    padding: 10px !important;
    border: none !important;
    border-radius: 4px !important;
    // cursor: pointer !important;
    transition: background-color 0.3s ease-in-out !important;
    height: 42px !important;
    // margin-top: 24px !important;
  }

  .ant-btn:hover {
    background-color: #90caf9 !important;
  }

  .ant-form-item .ant-form-item-label > label {
    color: #fff !important;
  }
`;
