import { Button, Divider, Space, Tooltip } from 'antd';
import React, { useState } from 'react';

interface ToolbarButtonProps {
  title: string;
  icon: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ToolbarButton = ({ title, icon, onClick }: ToolbarButtonProps) => {
  return (
    <Tooltip title={title}>
      <Button shape="circle" icon={icon} onClick={onClick} />
    </Tooltip>
  );
};

export default ToolbarButton;
