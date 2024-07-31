import React, { useState } from 'react';
import Link from 'next/link';
import { Layout, Typography, Menu, MenuProps, Avatar, Space } from 'antd';
import { BarChart, Minimize, Maximize, LogOut } from 'react-feather';

import DropDownList from '@client/components/dropdowns/DropDownList';
import Logo from '@client/components/icons/Logo';

import DashHeader from '@client/styles/styled/DashHeader';

import { useAppContext, setMobileDrawer } from '@client/context//AppContext';

const { Header } = Layout;
const { Title, Text } = Typography;

type ElementType = HTMLElement | unknown | any;

const AdminHeader: React.FC = () => {
  const elem: ElementType = document.documentElement;

  const [state, dispatch] = useAppContext();

  const [isFullscreen, setIsFullscreen] = useState(false);

  const iconSettings = {
    size: 20,
    strokeWidth: 1,
  };

  // toggle admin panel scren to full screen
  function openFullScreen() {
    if (elem.requestFullscreen) {
      elem.requestFullscreen();
    } else if (elem.msRequestFullscreen) {
      elem.msRequestFullscreen();
    } else if (elem.mozRequestFullScreen) {
      elem.mozRequestFullScreen();
    } else if (elem.webkitRequestFullscreen) {
      elem.webkitRequestFullscreen();
    }
    setIsFullscreen(true);
  }

  // toggle admin panel scren to normal screen
  function closeFullScreen() {
    const document: any = window.document;
    if (document.cancelFullScreen) {
      document.cancelFullScreen();
    } else if (document.msExitFullscreen) {
      document.msExitFullscreen();
    } else if (document.mozCancelFullScreen) {
      document.mozCancelFullScreen();
    } else if (document.webkitCancelFullScreen) {
      document.webkitCancelFullScreen();
    }
    setIsFullscreen(false);
  }

  const onFullScreenHandler = (actionType: 'open' | 'close') => {
    const Action = {
      open: openFullScreen(),
      close: closeFullScreen(),
    };

    return Action[actionType];
  };

  const logOutActionHandler = () => {
    // [TODO]: clear cookies & localstorage related to project & redirect
  };

  const AvatarDropDownItems: MenuProps['items'] = [
    {
      label: (
        <Space align="center">
          <Text onClick={logOutActionHandler}>Log Out</Text>
          <LogOut {...iconSettings} />
        </Space>
      ),
      key: 0,
    },
    // {
    //     label: <Text>Profile</Text>,
    //     key: 0,
    // },
  ];

  const DashboardNavItems: MenuProps['items'] = [
    {
      label: isFullscreen ? (
        <Minimize {...iconSettings} onClick={() => onFullScreenHandler('close')} />
      ) : (
        <Maximize {...iconSettings} onClick={() => onFullScreenHandler('open')} />
      ),
      key: 0,
    },
    {
      label: (
        <DropDownList
          items={AvatarDropDownItems}
          trigger={['hover']}
          element={<Avatar src="/images/profile-img.png" alt="superuser avatar" />}
        />
      ),
      key: 1,
    },
  ];

  return (
    <DashHeader>
      <Header>
        {state.mobile && (
          <a onClick={() => setMobileDrawer(dispatch)}>
            <BarChart {...iconSettings} />
          </a>
        )}
        <div className="header-sec">
          <Link href={'/'} className="brand">
            <Logo />
          </Link>
          <Title level={4} style={{ color: '#007bff' }}>
            {state.name}
          </Title>
        </div>
        <span className="mr-auto" />
        <Menu items={DashboardNavItems} />
      </Header>
    </DashHeader>
  );
};

export default AdminHeader;
