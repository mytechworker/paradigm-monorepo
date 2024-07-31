import React from 'react';
import { Dropdown, DropdownProps } from 'antd';

type SettingDropDownProps = {} & DropdownProps;

const SettingDropDown: React.FC<SettingDropDownProps> = (props) => {
  return <Dropdown {...props} />;
};

export default SettingDropDown;
