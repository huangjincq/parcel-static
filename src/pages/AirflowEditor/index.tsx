import React, { useState, useRef, useMemo } from 'react';
import Toolbar from './components/Toolbar';
import { Col, Row, Spin } from 'antd';
import NodeList from './components/NodeList';
import WorkSpace from './components/WorkSpace';
import PropsForm from './components/PropsForm';
import MiniMap from './components/MiniMap';
import { useRequest } from 'ahooks';
import { createData } from '../../createData';
import api from './api';

export const AirflowEditor = () => {
  const { data, loading, run } = useRequest(api.getJson);
  const [editorInstance, setEditorInstance] = useState();

  const editorValue = useMemo(() => {
    return data ? createData(data) : [];
  }, [data]);

  return (
    <Spin spinning={loading}>
      <div className="airflow-editor">
        <Toolbar />
        <div className="airflow-editor-main">
          <NodeList editorInstance={editorInstance} />
          <WorkSpace value={editorValue} setEditorInstance={setEditorInstance} />
          <div className="airflow-editor-main-right">
            <PropsForm />
            <MiniMap />
          </div>
        </div>
      </div>
    </Spin>
  );
};
