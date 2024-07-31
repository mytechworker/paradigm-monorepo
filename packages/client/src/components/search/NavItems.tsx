import React from 'react';

import Category from '@client/components/buttons/Category';
import Notification from '@client/components/buttons/Notification';
import Profile from '@client/components/buttons/Profile';
import Setting from '@client/components/buttons/Setting';

const encodedURL = (url: string) => encodeURIComponent(url);

const NavItems: React.FC = () => {
  return (
    <div className="serach-social">
      <div style={{ display: 'flex' }}>
        <Category href={encodedURL('categories&companies')} />
        <Notification />
        <Profile redirectTo="/profile" />
        <Setting />
      </div>
    </div>
  );
};

export default NavItems;
