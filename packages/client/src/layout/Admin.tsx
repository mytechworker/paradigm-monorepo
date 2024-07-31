import React, { Fragment } from 'react';
// import dynamic from 'next/dynamic';
import { Layout } from 'antd';
import { useRouter } from 'next/router';

import { GlobalStyles } from '@client/styles/styled/AdminTheme';
import { Container, Inner } from '@client/styles/styled/Page';

import { useAppContext } from '@client/context//AppContext';

import Header from '@client/components/header/Header';
import Sidebar from '@client/components/sidebar/Sidebar';

// const Header = dynamic(import('@client/components/header/Header'), { ssr: false });
// const Sidebar = dynamic(import('@client/components/sidebar/Sidebar'), { ssr: false });

const Admin = ({ children }) => {
  const { Content } = Layout;
  const [state, _] = useAppContext();
  const router = useRouter();

  const NonAdminDashboards = ['login', '_error', '404'];

  const subPaths = router.pathname.split('/');

  const isPreview = !NonAdminDashboards.filter((x) => subPaths.includes(x))[0];

  return (
    <Fragment>
      <GlobalStyles />
      <Container className={`${state.weakColor ? 'weakColor' : ''} ${state.boxed ? 'boxed shadow-sm' : ''}`}>
        {isPreview && <Header />}

        <Layout className="workspace">
          {isPreview && (
            <Sidebar
              sidebarTheme={state.darkSidebar ? 'dark' : 'light'}
              sidebarMode={state.sidebarPopup ? 'vertical' : 'inline'}
              sidebarIcons={state.sidebarIcons}
              collapsed={state.collapsed}
            />
          )}
          <Layout>
            <Content>{isPreview ? <Inner>{children}</Inner> : children}</Content>
          </Layout>
        </Layout>
      </Container>
    </Fragment>
  );
};

export default Admin;
