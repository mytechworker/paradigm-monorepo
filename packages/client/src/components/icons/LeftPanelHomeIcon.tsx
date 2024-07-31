import React from 'react';
import Link from 'next/link';
import { Tooltip } from 'antd';

const LeftPanelHomeIcon = () => {
  return (
    <div className="icon_wrap" style={{ marginTop: '27px' }}>
      <Link href={`/`}>
        <Tooltip placement="rightTop" title="Home">
          <a href="" rel="">
            <svg
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              aria-label="Home"
              className="left_panel_home_icon"
            >
              <path
                d="M4.5 10.75v10.5c0 .14.11.25.25.25h5c.14 0 .25-.11.25-.25v-5.5c0-.14.11-.25.25-.25h3.5c.14 0 .25.11.25.25v5.5c0 .14.11.25.25.25h5c.14 0 .25-.11.25-.25v-10.5M22 9l-9.1-6.83a1.5 1.5 0 0 0-1.8 0L2 9"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
              ></path>
            </svg>
          </a>
        </Tooltip>
      </Link>
    </div>
  );
};

export default LeftPanelHomeIcon;
