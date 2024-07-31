import React from 'react';
import Link from 'next/link';

const UnAuthorized = () => {
  return (
    <div>
      You're not authorized to access this route! Please try to signin with authorized user credentials{' '}
      <Link href={'/admin/auth/signin'}>Sign In</Link>
    </div>
  );
};

export default UnAuthorized;
