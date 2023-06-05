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
import { Graph } from '@antv/x6';
import { AirflowEditorManagerProvider } from './context/AirflowEditorManager';

export const AirflowEditor = () => {
  const { data, loading, run } = useRequest(api.getJson);
  const [editorInstance, setEditorInstance] = useState<Graph>();

  const editorValue = useMemo(() => {
    return data ? createData(data) : [];
  }, [data]);

  const airflowEditorManagerValue = useMemo(
    () => ({
      editorInstance,
    }),
    [editorInstance]
  );

  return (
    <Spin spinning={loading}>
      <AirflowEditorManagerProvider value={airflowEditorManagerValue}>
        <div className="airflow-editor">
          <Toolbar />
          <div className="airflow-editor-main">
            <NodeList editorInstance={editorInstance} />
            <WorkSpace value={editorValue} setEditorInstance={setEditorInstance} />
            <div className="airflow-editor-main-right">
              <PropsForm />
              <MiniMap editorInstance={editorInstance} />
            </div>
          </div>
        </div>
      </AirflowEditorManagerProvider>
    </Spin>
  );
};
