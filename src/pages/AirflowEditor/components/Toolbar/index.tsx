import { Button, Divider, Space, Tooltip } from 'antd';
import React, { useState, useEffect } from 'react';
import ToolbarButton from './ToolbarButton';
import CIcon from '../../components/CIcon';
import { useAirflowEditorManager } from '../../context/AirflowEditorManager';

interface ToolBarProps {}

const Toolbar = ({}: ToolBarProps) => {
  const { editorInstance } = useAirflowEditorManager();
  const [canUndo, setCanUndo] = useState(false);
  const [canRedo, setCanRedo] = useState(false);
  const [canDelete, setDelete] = useState(false);

  const handleUndo = () => {
    if (editorInstance?.canUndo()) {
      editorInstance.undo();
    }
    return false;
  };
  const handleRedo = () => {
    if (editorInstance?.canRedo()) {
      editorInstance.redo();
    }
    return false;
  };

  const handleDelete = () => {
    const cells = editorInstance?.getSelectedCells() ?? [];
    if (cells.length) {
      editorInstance?.removeCells(cells);
    }
  };

  useEffect(() => {
    if (editorInstance) {
      // undo redo
      editorInstance.bindKey(['meta+z', 'ctrl+z'], handleUndo);
      editorInstance.bindKey(['meta+shift+z', 'ctrl+shift+z'], handleRedo);
      // delete
      editorInstance.bindKey('backspace', handleDelete);
      // 监听历史记录变化
      editorInstance.on('history:change', () => {
        setCanUndo(editorInstance.canUndo());
        setCanRedo(editorInstance.canRedo());
      });
      // 监听选中元素变化
      editorInstance.on('selection:changed', ({ selected }) => {
        setDelete(selected.length > 0);
      });
    }
  }, [editorInstance]);

  return (
    <div className="tool-bar">
      <div className="tool-bar-left">
        <Space>
          <ToolbarButton title="Undo" icon={<CIcon type="icon-undo" />} onClick={handleUndo} disabled={!canUndo} />
          <ToolbarButton title="Redo" icon={<CIcon type="icon-redo" />} onClick={handleRedo} disabled={!canRedo} />
          <Divider type="vertical" />
          {/* <ToolbarButton title="Copy" icon={<CIcon type="icon-undo" />} />
          <ToolbarButton title="Paste" icon={<CIcon type="icon-undo" />} /> */}
          <ToolbarButton
            title="Delete"
            icon={<CIcon type="icon-delete" />}
            onClick={handleDelete}
            disabled={!canDelete}
          />
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
