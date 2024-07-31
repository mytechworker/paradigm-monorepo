import React from 'react';

import { NextPageLayout } from '@client/types/page.types';

const withAuth = (Page: NextPageLayout) => {
  return class AuthPage extends React.Component<any, any> {
    render() {
      return Page;
    }
  };
};

export default withAuth;
