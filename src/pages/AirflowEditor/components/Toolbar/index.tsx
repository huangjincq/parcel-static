import { Button, Divider, Space, Tooltip } from 'antd';
import React, { useState } from 'react';
import { SearchOutlined } from '@ant-design/icons';
import ToolbarButton from './ToolbarButton';
import CIcon from '../../components/CIcon';

interface ToolBarProps {}

const Toolbar = ({}: ToolBarProps) => {
  return (
    <div className="tool-bar">
      <div className="tool-bar-left">
        <Space>
          <ToolbarButton title="Undo" icon={<CIcon type="icon-undo" />} />
          <ToolbarButton title="Redo" icon={<CIcon type="icon-redo" />} />
          <Divider type="vertical" />
          {/* <ToolbarButton title="Copy" icon={<CIcon type="icon-undo" />} />
          <ToolbarButton title="Paste" icon={<CIcon type="icon-undo" />} /> */}
          <ToolbarButton title="Delete" icon={<CIcon type="icon-delete" />} />
          <Divider type="vertical" />
          <ToolbarButton title="Zoom In" icon={<CIcon type="icon-zoom-in" />} />
          <ToolbarButton title="Zoom Out" icon={<CIcon type="icon-zoom-out" />} />
          <Divider type="vertical" />
          <ToolbarButton title="Re Center" icon={<CIcon type="icon-re-center" />} />
          <ToolbarButton title="Auto Layout" icon={<CIcon type="icon-auto-layout" />} />
          {/* <Divider type="vertical" />

          <ToolbarButton icon="iconjson" title="Json View" />
          <ToolbarButton icon="icondesign" title="Designer View" /> */}
        </Space>
      </div>
      <div className="tool-bar-right">
        <Space>
          <Button>Show Diff</Button>
          <Button type="primary">Save</Button>
        </Space>
      </div>
    </div>
  );
};

export default Toolbar;
