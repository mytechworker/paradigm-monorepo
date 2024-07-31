import React from 'react';

type NotificationProps = {
  isNotificationRead: boolean;
  width: string | number;
  height: string | number;
  fill: string;
};

const NotificationIcon: React.FC<Partial<NotificationProps>> = ({
  isNotificationRead,
  height = '23',
  width = '24',
  fill = 'none',
}) => {
  return (
    <svg width={width} height={height} viewBox="0 0 23 24" fill={fill} xmlns="http://www.w3.org/2000/svg">
      <path
        d="M17.2791 17.5507H3.42078V9.563C3.42078 5.73579 6.51946 2.62555 10.355 2.62555C14.1804 2.62555 17.2891 5.72569 17.2891 9.563V17.5507H17.2791Z"
        stroke="#2E323F"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M1.19995 17.5504H19.4993"
        stroke="#2E323F"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M12.3834 20.5603C12.3834 21.6807 11.475 22.5992 10.3445 22.5992C9.21407 22.5992 8.30566 21.6908 8.30566 20.5603"
        stroke="#2E323F"
        strokeWidth="2"
        strokeMiterlimit="10"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      {!isNotificationRead && (
        <path
          d="M21.8 5.04909C21.8 7.28579 19.9878 9.09818 17.7533 9.09818C15.5188 9.09818 13.7065 7.28579 13.7065 5.04909C13.7065 2.8124 15.5188 1 17.7533 1C19.9878 1 21.8 2.8124 21.8 5.04909Z"
          fill="red"
          stroke="white"
          strokeWidth="2"
        />
      )}
    </svg>
  );
};

export default NotificationIcon;
