import React from 'react';
import { useRouter } from 'next/router';
import { ConfigProvider, theme } from 'antd';

import Footer from '@client/components/footer/Footer';

const { darkAlgorithm, defaultAlgorithm } = theme;

const Landing = ({ children }) => {
  const isDarkMode = JSON.parse(localStorage.getItem('settings') as string).theme === 'dark';

  const router = useRouter();

  const NotIncludes = ['/404'];

  return (
    <ConfigProvider
      theme={{
        algorithm: isDarkMode ? darkAlgorithm : defaultAlgorithm,
      }}
    >
      <main>{children}</main>
      {!router.pathname.startsWith('/admin') && !NotIncludes.includes(router.pathname) && <Footer />}
    </ConfigProvider>
  );
};

export default Landing;
