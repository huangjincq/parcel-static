import React, { useState } from 'react';
import Toolbar from './components/Toolbar';
import { Col, Row } from 'antd';
import ItemPanel from './components/ItemPanel';
import WorkSpace from './components/WorkSpace';
import PropsForm from './components/PropsForm';
import MiniMap from './components/MiniMap';

export const AirflowEditor = () => {
  return (
    <div className="airflow-editor">
      <Toolbar />
      <Row type="flex" className="airflow-editor-main">
        <Col span={19}>
          <WorkSpace />
        </Col>
        <Col span={5} className="airflow-editor-main-right">
          <PropsForm />
          <MiniMap />
        </Col>
      </Row>
    </div>
  );
};
