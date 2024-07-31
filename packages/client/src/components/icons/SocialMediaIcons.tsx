import React from 'react';
import { Tooltip } from 'antd';
import { TooltipPlacement } from 'antd/lib/tooltip';

interface SocialMediaIconsProps {
  Icon: any;
  onClick: () => void;
  title?: string;
  placement?: TooltipPlacement;
}

const SocialMediaIcons: React.FC<SocialMediaIconsProps> = ({ Icon, onClick, title, placement }) => {
  return (
    <div className="social-icons">
      <Tooltip title={title} placement={placement}>
        <a onClick={onClick}>{Icon}</a>
      </Tooltip>
    </div>
  );
};

export default SocialMediaIcons;
