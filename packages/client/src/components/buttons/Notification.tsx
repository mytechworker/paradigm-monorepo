import React from 'react';

import NotificationIcon from '../icons/NotificationIcon';

const Notification: React.FC = () => {
  return (
    <a className="notification-drop ant-dropdown-link" onClick={(e) => e.preventDefault()}>
      <NotificationIcon />
    </a>
  );
};

export default Notification;
