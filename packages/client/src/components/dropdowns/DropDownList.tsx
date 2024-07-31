import React from 'react';
import { Dropdown, DropdownProps, MenuProps } from 'antd';

interface DropDownListProps extends DropdownProps {
  className?: string;
  items: MenuProps['items'];
  element?: React.ReactElement;
}

const DropDownList: React.FC<DropDownListProps> = ({ className, items, placement, trigger, element, ...rest }) => {
  return (
    <Dropdown
      className={className}
      menu={{ items }}
      placement={placement ?? 'bottom'}
      trigger={trigger ?? ['click']}
      {...rest}
    >
      {element}
    </Dropdown>
  );
};

export default DropDownList;
