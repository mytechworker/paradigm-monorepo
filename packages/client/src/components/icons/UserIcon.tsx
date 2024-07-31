import React from 'react';

type UserIconProps = {
  width: string | number;
  height: string | number;
  fill: string;
};

const UserIcon: React.FC<Partial<UserIconProps>> = ({ width = '24', height = '24', fill = 'none' }) => {
  return (
    <>
      <svg
        viewBox="0 0 24 24"
        fill={fill}
        width={width}
        height={height}
        className="sub-profile"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_50_2469)">
          <circle cx="12" cy="7" r="4" stroke="#2E323F" strokeWidth="2" />
          <path
            d="M3 21C3 18.6131 3.94821 16.3239 5.63604 14.636C7.32387 12.9482 9.61305 12 12 12C14.3869 12 16.6761 12.9482 18.364 14.636C20.0518 16.3239 21 18.6131 21 21"
            stroke="#2E323F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </g>
        <defs>
          <clipPath id="clip0_50_2469">
            <rect width="24" height="24" fill="white" />
          </clipPath>
        </defs>
      </svg>
    </>
  );
};

export default UserIcon;
