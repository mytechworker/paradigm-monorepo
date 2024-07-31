import { MenuProps, Space, Switch, SwitchProps, Typography } from 'antd';
import React, { useEffect, useState } from 'react';

import SettingIcon from '../icons/SettingIcon';

import SettingDropDown from '../dropdowns/Setting';

import { setTheme, useAppContext } from '@client/context//AppContext';
import Link from 'next/link';

type SettingBtnProps = {};

const { Text } = Typography;

const Setting: React.FC<SettingBtnProps> = () => {
  const [state, dispatch] = useAppContext();
  const [isDarkMode, setIsDarkMode] = useState(state.theme === 'dark');
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    if (isDarkMode) {
      setTheme(dispatch, 'dark');
      document.body.classList.add('night-mode');
    } else if (!isDarkMode) {
      setTheme(dispatch, 'light');
      document.body.classList.remove('night-mode');
    }
  }, [isDarkMode]);

  useEffect(() => {
    // setIsOpen to false on outside offset click event
    const handleClickOutside = (event: MouseEvent) => {
      if (isOpen) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const onChangeHandler = () => {
    setIsDarkMode(!isDarkMode);
    setIsOpen(false);
  };

  const VisibilityProps: SwitchProps = {
    defaultChecked: true,
    checkedChildren: 'ON',
    unCheckedChildren: 'OFF',
    size: 'default',
  };

  const NightModeProps: SwitchProps = {
    defaultChecked: isDarkMode,
    onChange: onChangeHandler,
    checkedChildren: 'ON',
    unCheckedChildren: 'OFF',
    size: 'default',
  };

  const items: MenuProps['items'] = [
    {
      label: (
        <Text style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Space>
            Night Mode
            <Switch {...NightModeProps} />
          </Space>
        </Text>
      ),
      key: 0,
    },
    {
      type: 'divider',
    },
    {
      label: (
        <Text style={{ display: 'flex', justifyContent: 'space-evenly' }}>
          <Space>
            Profile Visibility <Switch {...VisibilityProps} />
          </Space>
        </Text>
      ),
      key: 1,
    },
  ];

  return (
    <SettingDropDown menu={{ items }} placement="bottom" trigger={['click']} open={isOpen}>
      <Link
        href={'#'}
        onClick={(e) => {
          e.preventDefault();
          setIsOpen(!isOpen);
        }}
      >
        <SettingIcon />
      </Link>
    </SettingDropDown>
  );
};

export default React.memo(Setting);
