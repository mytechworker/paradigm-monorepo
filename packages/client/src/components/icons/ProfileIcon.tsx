import React, { FC } from 'react';
import { Dropdown } from 'antd';

// icons
import UserIcon from './UserIcon';

interface Props {
  menu?: any;
  isAuthenticated?: any;
  handleModal?: any;
}

const ProfileIcon: FC<Props> = ({ menu, isAuthenticated, handleModal }: Props) => {
  return (
    <>
      <Dropdown overlay={isAuthenticated ? menu : <></>} placement="bottomCenter" trigger={['click']}>
        <a onClick={!isAuthenticated && handleModal}>
          <UserIcon width="24" height="24" />
        </a>
      </Dropdown>
    </>
  );
};

export default ProfileIcon;
