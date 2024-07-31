import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Layout, Menu, MenuProps, SiderProps, Space } from 'antd';
import { useRouter } from 'next/router';

import routes from '@client/lib//routes';
import { lowercase, capitalize } from '@client/lib//helpers';

import { SidebarTypes } from '@client/types/types';

type SidebarProps = {
  sidebarTheme: 'light' | 'dark';
  sidebarMode: MenuProps['mode'];
  sidebarIcons: boolean;
  collapsed: boolean;
};

const { Header, Sider } = Layout;
const Sidebar: React.FC<SidebarProps> = (props) => {
  const { collapsed, sidebarIcons, sidebarMode, sidebarTheme } = props;

  const [appRoutes] = useState<SidebarTypes[]>(routes);
  const [openKeys, setOpenKeys] = useState<string[]>([]);

  const router = useRouter();

  const getKey = (name: string, index: number) => {
    const string = `${name}-${index}`;
    let key = string.replace(' ', '-');
    return key.charAt(0).toLowerCase() + key.slice(1);
  };

  useEffect(() => {
    appRoutes.forEach((route, index) => {
      const isCurrentPath = router.asPath.includes(lowercase(route.name));
      const key = getKey(route.name, index);

      if (isCurrentPath) setOpenKeys([...openKeys, key]);
    });
  }, [appRoutes]);

  const SidebarMenuItems: MenuProps['items'] = [
    ...appRoutes.map((route, index) => ({
      label: (
        <>
          <Link href={route.path} prefetch>
            <Space>
              {sidebarIcons && route.icon}
              {capitalize(route.name)}
            </Space>
          </Link>
        </>
      ),
      key: getKey(route.name, index),
      className: router.pathname === route.path ? 'ant-menu-item-selected' : '',
    })),
  ];

  const settings: SiderProps = {
    width: 240,
    theme: sidebarTheme,
    className: `bg-${sidebarTheme}`,
    style: {
      height: '100%',
    },
  };

  const onOpenChange = (openKeys: string[]) => {
    console.log(`change evnt`);
  };

  const menuDefaults: MenuProps = {
    theme: sidebarTheme,
    className: 'border-0 scroll-y',
    style: {
      flex: 1,
      height: '100%',
    },
    mode: sidebarMode,
    items: SidebarMenuItems,
    openKeys,
    onOpenChange: (change) => onOpenChange(change),
  };

  return (
    <div>
      <Sider {...settings}>
        <Menu {...menuDefaults}></Menu>
      </Sider>
    </div>
  );
};

export default React.memo(Sidebar);
