import { Button, Divider, Space, Tooltip } from 'antd';
import React, { useState } from 'react';

interface ToolbarButtonProps {
  title: string;
  icon: React.ReactNode;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  disabled?: boolean;
}

const ToolbarButton = ({ title, icon, onClick, disabled }: ToolbarButtonProps) => {
  return (
    <Tooltip title={title}>
      <Button shape="circle" icon={icon} onClick={onClick} disabled={disabled} />
    </Tooltip>
  );
};

export default ToolbarButton;
