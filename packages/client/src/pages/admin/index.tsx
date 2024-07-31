import { NextPageLayout } from '@client/types/page.types';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

import AdminLayout from '@client/layout/Admin';
import AuthorizedUser from '@client/middleware/AuthorizedUser';

const AdminDashboard: NextPageLayout = () => {
  const router = useRouter();

  useEffect(() => {
    localStorage.setItem('themeState', 'DAY');
    document.body.classList.remove('night-mode');
  }, []);

  return <div>AdminDashboard</div>;
};

export default AdminDashboard;

AdminDashboard.getLayout = (page) => (
  <AdminLayout>
    <AuthorizedUser allowedRoles={['admin']}>{page}</AuthorizedUser>
  </AdminLayout>
);
