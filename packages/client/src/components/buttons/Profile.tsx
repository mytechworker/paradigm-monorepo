import Link from 'next/link';
import React from 'react';

import UserIcon from '../icons/UserIcon';

type ProfileBtnProps = {
  redirectTo: string;
};

const Profile: React.FC<ProfileBtnProps> = ({ redirectTo }) => {
  return (
    <>
      <Link href={redirectTo}>
        <UserIcon />
      </Link>
    </>
  );
};

export default Profile;
