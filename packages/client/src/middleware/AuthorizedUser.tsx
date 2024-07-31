import { message } from 'antd';
import { useRouter } from 'next/router';
import React, { useEffect } from 'react';

import UnAuthorized from '@client/pages/UnAuthorized';

import { useReduxActions, useReduxState } from '@client/hooks/useReduxActions';

import { useGetMeQuery } from '@client/redux//api/authApi';

type AuthorizedUserFCProps = {
  children: React.ReactNode;
  allowedRoles: string[];
};

const AuthorizedUser = ({ allowedRoles, children }: AuthorizedUserFCProps) => {
  const router = useRouter();

  const { setProfile } = useReduxActions();

  const authProfile = useReduxState((state) => state.user.profile);

  const { isLoading, isError, data, error } = useGetMeQuery(undefined);

  useEffect(() => {
    if (!isLoading && error) {
      message.error((error as unknown as any).data.message);
      router.replace('/admin/auth/signin');
    }
    if (!isLoading && data) setProfile(data);
  }, [isLoading, error, data]);

  if (isLoading) {
    return <span>Loading...</span>;
  }

  if (isError) return null;

  if (authProfile && allowedRoles.includes(authProfile.role)) {
    return <div>{children}</div>;
  }

  return <UnAuthorized />;
};

export default AuthorizedUser;
